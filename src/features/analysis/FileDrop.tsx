import React, { useEffect, useState, type DragEvent, type ReactNode } from 'react';

type FileDropZoneProps = {
    children?: ReactNode;
    onFileReady: (file: File) => void;
    onError: () => void;
    file: File | null;
};

const FileDropZone: React.FC<FileDropZoneProps> = ({ children, onFileReady, onError, file }) => {
    const [fileState, setFileState] = useState<'absent' | 'error' | 'loaded'>('absent');

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        setFileState('loaded');
        if (!file.name.endsWith('.csv')) {
            setFileState('error');
            onError();
        }
        else onFileReady(file);
    };
    useEffect(() => {
        setFileState(file ? 'loaded' : 'absent');

    }, [file])

    const zoneColor = {
        absent: 'plum',
        loaded: 'lightgreen',
        error: 'transparent',
    }
    const zoneStyle: React.CSSProperties = {
        width: '80vw',
        height: '180px',
        border: '2px dashed #ccc',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: zoneColor[fileState],
        color: '#333',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
        margin: '20px auto',
        textAlign: 'center',
        padding: '12px',
    };

    return (
        <div
            style={zoneStyle}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children && <div style={{ marginTop: '12px' }}>{children}</div>}
        </div>
    );
};

export default FileDropZone;
