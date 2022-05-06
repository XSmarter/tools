import { Button, Form, Input, Space } from 'antd';
import type { FC } from 'react';
import React from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 6 },
};

interface OrderCompareFormProps {
  onCompareFormFinish: (values: any) => void;
}

const OrderCompareForm: FC<OrderCompareFormProps> = (props) => {
  const [form] = Form.useForm();
  const { onCompareFormFinish } = props;

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form {...layout} form={form} onFinish={onCompareFormFinish}>
        <Form.Item name="content1" label="文本内容1" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item name="content2" label="文本内容2" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              对比
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderCompareForm;
