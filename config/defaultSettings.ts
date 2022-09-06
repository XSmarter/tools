import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#3f51b5',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Tools',
  pwa: false,
  logo: 'http://82.157.201.25//mco.svg',
  iconfontUrl: '',
  menu: {
    locale: false,
    type: 'group',
    collapsedShowTitle: true,
  },
};

export default Settings;
