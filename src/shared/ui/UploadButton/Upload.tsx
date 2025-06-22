import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import styles from "./Upload.module.css";
import type { CSVUploaderProps } from '.';
import Spinner from '../../../shared/assets/spinner.svg'

export default ({ onFileReady, onClear, onError, loading, file }: CSVUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClear?.();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !file.name.endsWith('.csv')) {
      onError();
      return;
    }
    setSelectedFile(file);
    onFileReady(file);
  };
  useEffect(() => {
    if (file) setSelectedFile(file);
  }, [file]);
  return (
    <div className={styles["button-wrapper"]}>
      <button
        type="button"
        onClick={() => { fileInputRef.current?.click() }}
        className={styles.uploadButton}
        disabled={loading}
      >
        {loading
          ? <img className={styles['loading-spinner']} src={Spinner} alt="Spinner" />
          : <span>{selectedFile ? selectedFile.name : 'Загрузите файл'}</span>}
      </button>

      {selectedFile && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.clearButton}
          disabled={loading}
          aria-label="Clear file"
        >
          &times;
        </button>
      )}

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        disabled={loading}
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />

    </div>
  );
};
