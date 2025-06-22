import type { HistoryItem } from "./model/store";
import styles from './History.module.css';

const formatUtcDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}.${month}.${year}`;
}

export default (props: HistoryItem & { onClick: () => void }) => {
  return (
    <div className={styles['history-item']} onClick={props.onClick}>
      <div>{props.filename}</div>
      <div>{formatUtcDate(props.date)}</div>
      <div className={props.status === 'failed' ? styles.opaque : ''}>Обработан успешно &#128512;</div>
      <div className={props.status === 'success' ? styles.opaque : ''}>Не удалось обработать &#128531;</div>
    </div>
  );
}
