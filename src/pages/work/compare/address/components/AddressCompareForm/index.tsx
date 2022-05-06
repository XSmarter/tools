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

interface AddressCompareFormProps {
  onCompareFormFinish: (values: any) => void;
}

const AddressCompareForm: FC<AddressCompareFormProps> = (props) => {
  const [form] = Form.useForm();
  const { onCompareFormFinish } = props;

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form {...layout} form={form} onFinish={onCompareFormFinish}>
        <Form.Item name="address" label="请输入需要检测的地址" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item name="keywords" label="请输入地址关键词" rules={[{ required: true }]}>
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

export default AddressCompareForm;
