import { useState } from "react";
import Button from "../../shared/ui/Button/Button"
import { fetchReport } from "./api/fetchReport";
import type { GenPageState } from "./index";
import styles from "./Generator.module.css"

  const createDownloadableFile = (blob: Blob, filename = 'report.csv') => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };
const PROMPT = 'Сгенерируйте готовый csv-файл нажатием одной кнопки';

export default () => {
      const [state, changeState] = useState<GenPageState>('initial');
        const downloadReport = async () => {
            changeState('loading');
            try {
            createDownloadableFile(
                await fetchReport({ size: 1, withErrors: 'on' })
            );
            changeState('success');
            } catch (e) {
            changeState('error');
            alert((e as Error).message);
            }
        };
        const stateExplainerMap = {
            loading: 'идет процесс генерации',
            initial: '',
            error: 'упс, не то...',
            success: 'файл сгенерирован!',
        };

        const btnColorMap = {
            loading: 'purple',
            initial: 'green',
            error: 'orange',
            success: 'lightgreen',
        } as const;
        const btnLabelMap = {
            loading: '',
            initial: 'Начать генерацию',
            error: 'Ошибка',
            success: 'Done!',
        } as const;
        const stateExplainer = stateExplainerMap[state];

    return (
        <div className={styles['generator-wrapper']}>
            <p>{PROMPT}</p>
            <Button
                label={btnLabelMap[state]}
                color={btnColorMap[state]}
                disabled={state !== "initial"}
                loading={state === "loading"}
                onClick={downloadReport}
                { ...(["error", "success"].includes(state) && {revert: () => { changeState("initial") }})}
            />
            {stateExplainer && <div>{stateExplainer}</div>}
        </div>
    )
}