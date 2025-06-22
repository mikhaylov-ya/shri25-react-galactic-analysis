export type CSVUploaderProps = {
  onFileReady: (file: File) => void;
  onClear?: () => void;
  onError: () => void;
  loading?: boolean;
  file: null | File;
};
