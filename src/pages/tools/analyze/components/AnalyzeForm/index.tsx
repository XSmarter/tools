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

interface AnalyzeFormFormProps {
  onAnalyzeFormFinish: (values: any) => void;
}

const AnalyzeForm: FC<AnalyzeFormFormProps> = (props) => {
  const [form] = Form.useForm();
  const { onAnalyzeFormFinish } = props;

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form {...layout} form={form} onFinish={onAnalyzeFormFinish}>
        <Form.Item name="url" label="请输入需要解析的地址" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              解析
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

export default AnalyzeForm;
