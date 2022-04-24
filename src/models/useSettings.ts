import { useState } from 'react';

const useSettings = () => {
  const [settings, setSettings] = useState<any>(() => {
    const settingsData = localStorage.getItem('settings');
    if (settingsData) {
      const tempData = JSON.parse(settingsData);
      return tempData;
    }
    return {};
  });

  return {
    settings,
    setSettings,
  };
};

export default useSettings;
