import { useCallback, useState } from 'react';

const usePrint = () => {
  const [printPreviewStatus, setPrintPreviewStatus] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [printSuccessOrderKeys, setPrintSuccessOrderKeys] = useState<string[]>([]);

  const [printPartErrorStatus, setPrintPartErrorStatus] = useState<boolean>(false);

  const [printCompletedStatus, setPrintCompletedStatus] = useState<boolean>(false);

  const [offlinePrintCompletedStatus, setOfflinePrintCompletedStatus] = useState<boolean>(false);

  const addPreviewImages = useCallback((images: string[]) => {
    setPreviewImages((prevPreviewImages) => {
      return [...prevPreviewImages, ...images];
    });
  }, []);

  const addPrintSuccessOrderKeys = useCallback((keys: string[]) => {
    setPrintSuccessOrderKeys((prevPrintSuccessOrderKeys) => {
      return [...prevPrintSuccessOrderKeys, ...keys];
    });
  }, []);

  return {
    printPreviewStatus,
    setPrintPreviewStatus,
    previewImages,
    setPreviewImages,
    addPreviewImages,
    printSuccessOrderKeys,
    setPrintSuccessOrderKeys,
    addPrintSuccessOrderKeys,
    printPartErrorStatus,
    setPrintPartErrorStatus,
    printCompletedStatus,
    setPrintCompletedStatus,
    offlinePrintCompletedStatus,
    setOfflinePrintCompletedStatus,
  };
};

export default usePrint;
