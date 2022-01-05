import React from 'react';
import { DisconnectOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useAccess } from 'umi';

import { useAppinfo } from '@/hooks';

import styles from './index.less';

export type PrintComponentInstallModalProps = {
  /** 控制打印组件安装Modal层显示隐藏 */
  visible: boolean;
  /** modal层关闭时触发函数 */
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

/**
 * 打印组件弹层组件
 * @param visible 控制打印组件安装Modal层显示隐藏
 * @param onCancel modal层关闭时触发函数
 */
const PrintComponentInstallModal = ({ visible, onCancel }: PrintComponentInstallModalProps) => {
  const { appkeyInfo } = useAppinfo();
  const { canQN } = useAccess();
  const qnDownloadUrl = 'https://jiaocheng.fengsutb.com/printComponentsDownload?type=c-lodop';
  const agent = navigator.userAgent.toLowerCase();
  return (
    <Modal
      footer={null}
      visible={visible}
      width={720}
      centered
      onCancel={onCancel}
      bodyStyle={{ padding: 15 }}
      maskClosable={false}
      zIndex={9999}
    >
      <div className={styles['install-component-title']}>
        <DisconnectOutlined style={{ marginRight: 10 }} />
        无法连接到C-Lodop打印组件！
      </div>
      <div className={styles['install-component-tips']}>
        Web打印服务CLodop未安装启动，请点击下方按钮下载并安装
        <div style={{ display: 'flex', marginTop: 10 }}>
          {agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0 ? (
            <div style={{ flex: 1, textAlign: 'center' }}>
              <Button
                type="primary"
                href={
                  canQN ? `${qnDownloadUrl}` : `${appkeyInfo.clientUrl}/assets/install/CLodop64.exe`
                }
                icon={<DownloadOutlined />}
                size="large"
                target={canQN ? '_blank' : '_self'}
              >
                下载64位C-Lodop
              </Button>
            </div>
          ) : (
            <div style={{ flex: 1, textAlign: 'center' }}>
              <Button
                type="primary"
                href={
                  canQN ? `${qnDownloadUrl}` : `${appkeyInfo.clientUrl}/assets/install/CLodop.exe`
                }
                icon={<DownloadOutlined />}
                size="large"
                target={canQN ? '_blank' : '_self'}
              >
                下载32位C-Lodop
              </Button>
            </div>
          )}
        </div>
        {/* <a href={`${appkeyInfo.clientUrl}/assets/install/CLodop.exe`} target="_self">
          下载执行安装
        </a> */}
        <br />
        （若此前已安装过，可
        <a href="CLodop.protocol:setup" target="_self">
          点这里直接再次启动
        </a>
        ），成功后请刷新本页面。
      </div>
      <div className={styles['install-component-footer']}>
        如果按照上述操作依旧解决不了该问题，请联系在线客服处理。
      </div>
    </Modal>
  );
};

export default React.memo(PrintComponentInstallModal, (prevProps, nextProps) => {
  return prevProps.visible === nextProps.visible;
});
