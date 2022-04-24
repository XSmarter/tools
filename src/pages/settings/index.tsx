import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 6 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 6 },
};

const Settings = () => {
  const { settings, setSettings } = useModel('useSettings');

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(settings);
  }, [settings]);

  const onFormFinish = (values: any) => {
    localStorage.setItem('settings', JSON.stringify(values));
    setSettings(values);
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <Form {...layout} form={form} onFinish={onFormFinish}>
          <Form.Item name="name" label="用户名" rules={[{ required: true }]}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Settings;
