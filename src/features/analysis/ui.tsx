import Upload from "../../shared/ui/UploadButton/Upload"
import Button from "../../shared/ui/Button/Button";
import styles from "./Analysis.module.css";
import { fetchAggregate } from "./api/fetchAggregate"
import { useEffect, useState } from "react";
import { useAnalysisStore, type Analysis } from './model/store';
import Highlights from "./Highlights";
import FileDropZone from './FileDrop';
import { useHistoryStore } from "../history/model/store";

export default () => {
    const [csvFile, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("или перетащите сюда")
    const analysis = useAnalysisStore();
    const fileReadyCallback = (file: File) => {
        setFile(file);
        setMessage('файл загружен!')
    }
    const sendFile = async () => {
        analysis.setStatus('parsing');
        setMessage('идет парсинг файла');
        fetchAggregate({
            file: csvFile!, rows: 10000, onChunk: (chunk) => {
                analysis.setResults(chunk as Analysis);
            }
        })
            .then(() => {
                useHistoryStore().addHistory({
                    filename: csvFile!.name,
                    results: analysis.results,
                    status: analysis.status,
                })
                setMessage('готово');
            })
            .catch((e) => {
                console.error(e);
                analysis.setStatus('failed')
                setMessage('сетевая ошибка, сервер недоступен')
            })

    };

    // Если пользователь перезагрузит страницу в процессе парсинга, он убьет соединение с сервером
    // и потеряет данные. Ему нужно об этом прямо сообщить
    useEffect(() => {
        if (analysis.status !== 'parsing') return;
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            alert("Вы потеряете текущие данные, если перезагрузите страницу или уйдете с нее");
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
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
                        : <Highlights analysis={analysis.results} />
                    }
                </div>
            </div>
        </div>
    )
}