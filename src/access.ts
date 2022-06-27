/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};

  const getSettingsData = () => {
    const settingsData = localStorage.getItem('settings');
    if (settingsData) {
      const tempData = JSON.parse(settingsData);
      return tempData;
    }
    return {};
  };

  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canWork: getSettingsData().name === 'work' || getSettingsData().name === '闲心',
  };
}
