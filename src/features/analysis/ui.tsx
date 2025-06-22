import Upload from '../../shared/ui/UploadButton/Upload'
import Button from '../../shared/ui/Button/Button';
import styles from './Analysis.module.css';
import { fetchAggregate } from './api/fetchAggregate'
import { useEffect, useState } from 'react';
import { analysisStore, useAnalysisStore, type Analysis } from './model/store';
import Highlights from './Highlights';
import FileDropZone from './FileDrop';
import { historyStore } from '../history/model/store';

export default () => {
    const [csvFile, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('или перетащите сюда')
    const analysis = useAnalysisStore();
    const fileReadyCallback = (file: File) => {
        setFile(file);
        setMessage('файл загружен!')
    }
    const sendFile = async () => {
        analysis.setStatus('parsing');
        setMessage('идет парсинг файла');
        return fetchAggregate({
            file: csvFile!, rows: 10000, onChunk: (chunk) => {
                analysis.setResults(chunk as Analysis);
            }
        })
            .then(() => {
                setMessage('готово');
                analysis.setStatus('success');
            })
            .catch((e) => {
                console.error(e);
                analysis.setStatus('failed')
                setMessage('сетевая ошибка, сервер недоступен')
            })
            .finally(() => {
                const { status, results } = analysisStore.getState();
                historyStore.getState().addHistory({
                    filename: csvFile!.name,
                    date: new Date(Date.now()),
                    status,
                    results,
                })
            })

    };

    useEffect(() => {
        if (analysis.status === 'parsing') {
            const handleBeforeUnload = (e: Event) => {
            e.preventDefault();
            alert('Вы потеряете текущие данные, если перезагрузите страницу или уйдете с нее');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
        }
    }, [analysis.status]);

    return (
        <div className={styles.wrapper}>
            <div>
                Загрузите csv файл и получите <b>полную информацию</b> о нём за сверхнизкое время
            </div>
            <div className={styles.uploadSection}>
                <FileDropZone
                    onFileReady={fileReadyCallback}
                    onError={() => setMessage('упс, не то...')}
                    file={csvFile}
                >
                    <Upload
                        onFileReady={fileReadyCallback}
                        onClear={() => {
                            setFile(null);
                            setMessage('или перетащите сюда')
                        }}
                        
                        onError={() => setMessage('упс, не то...')}
                        loading={analysis.status === 'parsing'}
                        file={csvFile}
                    />
                    <div>{message}</div>
                </FileDropZone>
            </div>
            <div className={styles['highlights-section']}>
                <Button color="green" label="Отправить" onClick={sendFile} disabled={!csvFile || analysis.status === 'parsing'} />
                <div className={styles.highlights}>
                    {!analysis.results
                        ? <div className={styles['highlights-prompt']}>Здесь появятся хайлайты</div>
                        : <Highlights analysis={analysis.results} type='default' />
                    }
                </div>
            </div>
        </div>
    )
}
