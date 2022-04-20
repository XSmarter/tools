import { Modal, Form, InputNumber, Input } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import React from 'react';

interface ShortcutFormProps {
  visible: boolean;
  editShortcut: any;
  onShortcutFormFinish: (values: any) => void;
  onModalCancel: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ShortcutForm: FC<ShortcutFormProps> = (props) => {
  const [form] = Form.useForm();

  const { visible, editShortcut, onShortcutFormFinish, onModalCancel } = props;

  useEffect(() => {
    if (visible) {
      if (editShortcut.id) {
        form.setFieldsValue({
          ...editShortcut,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible]);

  const onFinish = (values: any) => {
    if (editShortcut.id) {
      onShortcutFormFinish({
        ...editShortcut,
        ...values,
      });
    } else {
      onShortcutFormFinish(values);
    }
  };

  const onModalOk = async () => {
    try {
      const fieldsValue: any = await form.validateFields();
      onFinish({
        ...fieldsValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title="快捷链接" visible={visible} onOk={onModalOk} onCancel={onModalCancel}>
      <Form {...layout} form={form}>
        <Form.Item name="title" label="名称" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item name="url" label="链接" rules={[{ required: true }]}>
          <Input.TextArea autoComplete="off" />
        </Form.Item>

        <Form.Item name="sort" label="排序" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShortcutForm;
