import type { Analysis } from "./model/store";
import styles from "./Analysis.module.css";
import { dayNumberToDate } from "./lib/util";
import cn from "classnames";


const PROP_TITLE_MAP: Record<keyof Analysis, string> = {
    less_spent_value: "",
    total_spend_galactic: 'общие расходы в галактических кредитах',
    less_spent_civ: 'цивилизация с минимальными расходами',
    rows_affected: 'количество обработанных записей',
    big_spent_at: 'день года с максимальными расходами',
    less_spent_at: 'день года с минимальными расходами',
    big_spent_value: 'максимальная сумма расходов за день',
    big_spent_civ: 'цивилизация с максимальными расходами',
    average_spend_galactic: 'средние расходы в галактических кредитах',
};
export default ({ analysis, type }: { analysis: Analysis, type: 'modal' | 'default' }) => {
    const containerClass = cn(styles['highlights-container'], {
        [styles['highlights-container-modal']]: type === 'modal'
    });
    const itemClass = cn(styles['highlight-item'], {
        [styles['highlight-item-modal']]: type === 'modal'
    });

    const orderedKeys = ['total_spend_galactic', 'rows_affected', 'less_spent_at', 'big_spent_civ', 'less_spent_civ', 'big_spent_at', 'big_spent_value', 'average_spend_galactic'] as const;
    const handleValue = (value: number | string | null) => typeof value === 'number' ? Math.round(value) : value;
    const genCell = (key: keyof Analysis, i: number) => (
        <div className={itemClass} key={i}>
            <div className={styles['item-value']}>{key.includes('at')
                ? dayNumberToDate(analysis[key] as number)
                : handleValue(analysis[key])}</div>
            <div className={styles['item-subtitle']}>{PROP_TITLE_MAP[key]}</div>
        </div>
    );
    return (
        <div className={containerClass}>
            {orderedKeys.map(genCell)}
        </div>
    )
}
