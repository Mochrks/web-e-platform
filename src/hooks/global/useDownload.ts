import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = useCallback(async (url: string, filename: string) => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      toast.success(`Downloading ${filename}...`);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download file');
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
    toast.success(`File ${filename} downloaded`);
  }, []);

  return { downloadFile, downloadBlob, isDownloading };
};
