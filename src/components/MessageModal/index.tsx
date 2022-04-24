import { Card, Modal } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import React from 'react';
import Valine from 'valine';
import Message from './components/Message';

interface MessageModalProps {
  visible: boolean;
  onCancel: () => void;
}

const MessageModal: FC<MessageModalProps> = (props) => {
  const { visible, onCancel } = props;

  useEffect(() => {
    if (visible) {
      new Valine({
        el: '#vcomments',
        // other config
        appId: 'vsB5r15jmHR98cfwla4X1Pkg-gzGzoHsz',
        appKey: 'oJsbu5ACUik8fabHxo1pbRqa',
      });
    }
  }, [visible]);

  return (
    <Modal bodyStyle={{ padding: 0 }} footer={null} visible={visible} onCancel={onCancel}>
      <Card title="留言区">
        <Message />
      </Card>
    </Modal>
  );
};

export default MessageModal;
