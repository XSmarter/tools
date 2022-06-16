import { Modal, Form, InputNumber, Input, DatePicker } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import React from 'react';
import moment from 'moment';

interface CountDownFormProps {
  visible: boolean;
  editShortcut: any;
  onCountDownFormFinish: (values: any) => void;
  onModalCancel: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CountDownForm: FC<CountDownFormProps> = (props) => {
  const [form] = Form.useForm();

  const { visible, editShortcut, onCountDownFormFinish, onModalCancel } = props;

  useEffect(() => {
    if (visible) {
      if (editShortcut.id) {
        form.setFieldsValue({
          ...editShortcut,
          date: moment(editShortcut.date),
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible]);

  const onFinish = (values: any) => {
    if (editShortcut.id) {
      onCountDownFormFinish({
        ...editShortcut,
        ...values,
      });
    } else {
      onCountDownFormFinish(values);
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
    <Modal title="倒计时" visible={visible} onOk={onModalOk} onCancel={onModalCancel}>
      <Form {...layout} form={form}>
        <Form.Item name="title" label="名称" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item name="date" label="日期" rules={[{ required: true }]}>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            placeholder="请输入时间"
          />
        </Form.Item>

        <Form.Item name="sort" label="排序" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CountDownForm;
