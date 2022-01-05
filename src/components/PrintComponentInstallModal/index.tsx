import React from 'react';
import { DisconnectOutlined, DownloadOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { useAccess } from 'umi';

import cnIcon from '@/assets/images/icons/cn.png';
import pddIcon from '@/assets/images/icons/pdd.png';
import jdIcon from '@/assets/images/icons/jd.png';
import dyIcon from '@/assets/images/icons/dy.png';
import ksIcon from '@/assets/images/icons/ks.png';
import styles from './index.less';

export type PrintComponentInstallModalProps = {
  /** 控制打印组件安装Modal层显示隐藏 */
  cnVisible: boolean;
  pddVisible?: boolean;
  jdVisible?: boolean;
  dyVisible?: boolean;
  ksVisible?: boolean;
  /** modal层关闭时触发函数 */
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

/**
 * 打印组件弹层组件
 * @param platform 平台
 * @param visible 控制打印组件安装Modal层显示隐藏
 * @param onCancel modal层关闭时触发函数
 */
const PrintComponentInstallModal = ({
  cnVisible,
  pddVisible,
  jdVisible,
  dyVisible,
  ksVisible,
  onCancel,
}: PrintComponentInstallModalProps) => {
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  const { canQN } = useAccess();

  const platformMap = {
    CN: {
      name: '菜鸟',
      visible: cnVisible,
      componentIcon: cnIcon,
      downloadUrl: isMac
        ? 'https://cainiao-oss-sh-read.oss-cn-shanghai.aliyuncs.com/waybill-print/multiplatform-client/cainiao-x-print.dmg?spm=a219a.7386653.0.0.7697669aoaEa3n&file=cainiao-x-print.dmg'
        : 'https://cdn-cloudprint.cainiao.com/waybill-print/client/CNPrintSetup.exe?spm=a21da.8131346.400276.1.79d94e46r6Owtn&file=CNPrintSetup.exe',
      qnDownloadUrl: 'https://jiaocheng.fengsutb.com/printComponentsDownload?type=cainiao',
    },
    PDD: {
      name: '拼多多',
      visible: pddVisible,
      componentIcon: pddIcon,
      downloadUrl:
        'https://meta.pinduoduo.com/api/one/app/v1/lateststable?appId=com.xunmeng.pddprint&platform=windows&subType=main',
    },
    JD: {
      name: '京东',
      visible: jdVisible,
      componentIcon: jdIcon,
      downloadUrl:
        'https://storage.jd.com/wms.jcloud.com/openJDprint/setupJD%E6%89%93%E5%8D%B0%E7%BB%84%E4%BB%B6.exe?Expires=3763281074&AccessKey=NMqm80PqBUbAykTu&Signature=KBkqWadutnxd4%2Bua0VXTQEaNSRc%3D',
    },
    DY: {
      name: '抖音',
      visible: dyVisible,
      componentIcon: dyIcon,
      downloadUrl: 'https://logistics.douyinec.com/davinci/CloudPrintClient',
    },
    KS: {
      name: '快手',
      visible: ksVisible,
      componentIcon: ksIcon,
      downloadUrl: 'https://s1-11586.kwimgs.com/kos/nlav11586/kuaishou-print-installer.exe',
    },
  };
  return (
    <>
      {Object.keys(platformMap).length &&
        Object.keys(platformMap).map((item) => (
          <Modal
            key={item}
            footer={null}
            visible={platformMap[item].visible}
            width={720}
            centered
            onCancel={onCancel}
            bodyStyle={{ padding: 15 }}
            maskClosable={false}
            destroyOnClose
            zIndex={9999}
          >
            <div className={styles['install-component-title']}>
              <DisconnectOutlined style={{ marginRight: 10 }} />
              无法连接到{platformMap[item].name}打印组件！
            </div>
            <div className={styles['install-component-tips']}>
              请您首先检查{platformMap[item].name}
              云打印组件是否已启动（电脑右下角是否显示打印组件图标
              <img
                alt="组件图标"
                style={{ width: '14px', marginTop: '-2px' }}
                src={platformMap[item].componentIcon}
              />
              ）
            </div>
            <div className={styles['install-component-box']}>
              <div className={styles['install-component-box-tag']}>未安装</div>
              <div className={styles['install-component-box-content']}>
                未安装{platformMap[item].name}
                云打印组件，请点击下方按钮下载打印组件。并在下载完成后安装并运行，再次刷新页面即可进行打印。
                <Button
                  type="primary"
                  onClick={() => {
                    if (canQN) {
                      window.open(platformMap[item].qnDownloadUrl);
                    } else {
                      window.location.href = platformMap[item].downloadUrl;
                    }
                  }}
                  shape="round"
                  style={{ marginTop: 10 }}
                  icon={<DownloadOutlined />}
                >
                  点此下载{platformMap[item].name}云打印组件
                </Button>
              </div>
            </div>
            <div className={styles['install-component-box']}>
              <div className={styles['install-component-box-tag']}>已安装</div>
              <div className={styles['install-component-box-content']}>
                {item === 'JD' ? (
                  <div className={styles['install-component-tips']} style={{ margin: '0 0 5px' }}>
                    <span>注意：安装完打印组件，请先访问后面的链接后再进行打印！！！</span>{' '}
                    <a href="https://localhost:9114/print" target="_blank">
                      点此访问
                    </a>
                  </div>
                ) : undefined}
                已安装{platformMap[item].name}云打印组件并正常运行，那么请尝试以下操作：
                <div className={styles['install-component-box-list']}>
                  &gt;&nbsp;&nbsp;&nbsp;重启{platformMap[item].name}云打印组件
                  <br />
                  &gt;&nbsp;&nbsp;&nbsp;关闭电脑系统防火墙
                  <br />
                  &gt;&nbsp;&nbsp;&nbsp;关闭电脑已经安装的安全软件
                  <br />
                  &gt;&nbsp;&nbsp;&nbsp;更换其他浏览器尝试打印
                  <br />
                </div>
              </div>
            </div>
            <div className={styles['install-component-footer']}>
              如果按照上述操作依旧解决不了该问题，请联系在线客服处理。
            </div>
          </Modal>
        ))}
    </>
  );
};

export default React.memo(PrintComponentInstallModal, (prevProps, nextProps) => {
  return (
    prevProps.cnVisible === nextProps.cnVisible &&
    prevProps.dyVisible === nextProps.dyVisible &&
    prevProps.jdVisible === nextProps.jdVisible &&
    prevProps.pddVisible === nextProps.pddVisible &&
    prevProps.ksVisible === nextProps.ksVisible
  );
});
