import usePrintSocket from '@/hooks/usePrintSocket';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, Select, Space } from 'antd';
import React from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6 },
};

const platformObj = {
  CN: {
    url: 'localhost',
    port: 13528,
    wssPort: 13529,
  },
  PDD: {
    url: 'localhost',
    port: 5000,
    wssPort: 18653,
  },
  JD: {
    url: 'localhost',
    port: 9113,
    wssPort: 9114,
  },
  DY: {
    url: 'localhost',
    port: 13888,
    wssPort: 13999,
  },
  KS: {
    url: 'localhost',
    port: 16888,
  },
};

const WorkPrint = () => {
  const { websocketConnect, websocketSend } = usePrintSocket();
  const [form] = Form.useForm();

  const isHttpsProtocol = document.location.protocol === 'https:';

  const extUrl = (value: string) => {
    if (value === 'JD' && isHttpsProtocol) {
      return '/print';
    }

    if (value === 'KS') {
      return '/ks/printer';
    }

    return '';
  };

  const wsUrl = (platform: string) => {
    return `${
      (isHttpsProtocol && platform !== 'KS' ? 'wss://' : 'ws://') + platformObj[platform].url
    }:${
      isHttpsProtocol && platform !== 'KS'
        ? platformObj[platform].wssPort
        : platformObj[platform].port
    }${extUrl(platform)}`;
  };

  const onPlatformChange = (value: string) => {
    const wsurl = wsUrl(value);

    form.setFieldsValue({
      wsurl,
      content: '',
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onConnect = () => {
    websocketConnect(form.getFieldValue('platform'), form.getFieldValue('wsurl'));
  };

  const onFinish = (values: any) => {
    console.log(values);

    websocketSend(form.getFieldValue('platform'), values.content);
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item name="platform" label="打印组件" rules={[{ required: true }]}>
            <Select placeholder="选择打印组件" onChange={onPlatformChange} allowClear>
              <Select.Option value="CN">菜鸟打印组件</Select.Option>
              <Select.Option value="PDD">拼多多打印组件</Select.Option>
              <Select.Option value="DY">抖音打印组件</Select.Option>
              <Select.Option value="KS">快手打印组件</Select.Option>
              <Select.Option value="JD">京东打印组件</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="wsurl" label="WS地址" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="打印报文">
            <Input.TextArea />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" ghost onClick={onConnect}>
                连接
              </Button>
              <Button type="primary" htmlType="submit">
                打印
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default WorkPrint;
