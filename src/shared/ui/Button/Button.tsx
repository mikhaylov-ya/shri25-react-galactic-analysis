import type { ButtonProps } from '.';
import Spinner from '../../../shared/assets/spinner.svg'
import Cross from '../../../shared/assets/white-cross.svg'
import styles from './Button.module.css';
import cn from 'classnames';
const COLOR_MAP = {
  orange: '#FF5F00',
  black: '#201B10',
  green: '#2AE881',
  purple: '#CB81FF',
  lightgreen: '#D4FAE6',

};


export default (props: ButtonProps) => {

  const btnStyles = cn({
    [styles['action-button']]: true,
    [styles.disabled]: props.disabled,
  });


  const textColor = ['black', 'orange'].includes(props.color) ? 'white' : 'black';
  return (
    <div className={styles.wrapper}>
      <button
        style={{
          backgroundColor: COLOR_MAP[props.color],
          color: textColor,
        }}
        disabled={props.disabled}
        className={btnStyles}
        onClick={props.onClick}
      >
        {props.loading
          ? <img className={styles['loading-spinner']} src={Spinner} alt="Spinner" />
          : <span>{props.label}</span>}
      </button>

      {props.revert && <button
        onClick={props.revert}
        className={styles['revert-button']}
      >
        <img src={Cross} alt="Close cross" />
      </button>
      }
    </div>
  )
};
