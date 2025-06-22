import Button from "../../shared/ui/Button/Button"
import HistoryItem from "./HistoryItem";
import { useHistoryStore } from "./model/store"
import { useNavigate } from "react-router-dom";
import styles from './History.module.css';
import { useModal } from "../../shared/ui/Modal/ModalContext";
import Highlights from "../analysis/Highlights";

export default () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { clearHistory, history, removeHistoryItem  } = useHistoryStore();
  return (
    <>
      <div className={styles['history-wrapper']}>
        {history.map((item, index) => (
          <div key={index} className={styles['history-item-wrapper']}>
            <HistoryItem
              {...item}
              onClick={() => {
                openModal(
                  <div style={{ padding: '1rem' }}>
                    <Highlights analysis={item.results} type="modal" />
                  </div>
                );
              }}
            />
            <button className={styles['delete-button']} onClick={() => { removeHistoryItem(item.id) }}>&#128465;</button>
          </div>))
        }
      </div>
      <div className={styles['buttons-wrapper']}>
      <Button
        color="green"
        label="Сгенерировать больше"
        onClick={() => navigate('/csv-generator')}
      />
      <Button
        color="black"
        label="Очистить все"
        onClick={() => clearHistory()}
        disabled={history.length === 0}
      />
      </div>
    </>
  )
}
