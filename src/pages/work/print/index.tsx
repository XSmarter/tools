import PrintComponentInstallModal from '@/components/PrintComponentInstallModal';
import usePrintSocket from '@/hooks/usePrintSocket';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 6 },
};
const textAreaLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
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
  const { printComponentMap, websocketConnect, websocketSend } = usePrintSocket();
  const [form] = Form.useForm();

  /** 控制菜鸟组件安装提醒显示/隐藏 */
  const [cnPrintComponentVisible, setCnPrintComponentVisible] = useState(false);

  /** 控制拼多多组件安装提醒显示/隐藏 */
  const [pddPrintComponentVisible, setPddPrintComponentVisible] = useState(false);

  /** 控制京东组件安装提醒显示/隐藏 */
  const [jdPrintComponentVisible, setJdPrintComponentVisible] = useState(false);

  const [dyPrintComponentVisible, setDyPrintComponentVisible] = useState(false);

  const [ksPrintComponentVisible, setKsPrintComponentVisible] = useState(false);

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
    const platCode = form.getFieldValue('platform');

    websocketConnect(platCode, form.getFieldValue('wsurl'));
  };

  /**
   * 获取请求的UUID，指定长度和进制
   * @example
   * getUUID(8, 2) => "01001010" | getUUID(8, 10) => "47473046" | getUUID(8, 16) => "098F4D35"
   * @param len 长度
   * @param radix 进制
   */
  const getUUID = (len: number, radix: number): string => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    const radixTemp = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i += 1) uuid[i] = chars[0 | (Math.random() * radixTemp)];
    } else {
      let r;
      // eslint-disable-next-line no-multi-assign
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i + 1) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  };

  const onFinish = (values: any) => {
    const platCode = form.getFieldValue('platform');

    if (!printComponentMap[platCode].status) {
      if (platCode === 'PDD') {
        setPddPrintComponentVisible(true);
        return;
      }
      if (platCode === 'JD') {
        setJdPrintComponentVisible(true);
        return;
      }
      if (platCode === 'DY') {
        setDyPrintComponentVisible(true);
        return;
      }
      if (platCode === 'KS') {
        setKsPrintComponentVisible(true);
        return;
      }
      setCnPrintComponentVisible(true);
    }

    const request = JSON.parse(values.content);

    request.task.taskID = getUUID(8, 16);

    if (values.printer) {
      request.task.printer = values.printer;
    }
    console.log(`发送打印任务时间戳：${new Date().getTime()}`);
    console.log(JSON.stringify(request));
    websocketSend(platCode, JSON.stringify(request));
  };

  /** 关闭提醒安装打印组件模态层 */
  const onPrintComponentInstallModalCancel = () => {
    setCnPrintComponentVisible(false);
    setPddPrintComponentVisible(false);
    setJdPrintComponentVisible(false);
    setDyPrintComponentVisible(false);
    setKsPrintComponentVisible(false);
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <PrintComponentInstallModal
        cnVisible={cnPrintComponentVisible}
        pddVisible={pddPrintComponentVisible}
        jdVisible={jdPrintComponentVisible}
        dyVisible={dyPrintComponentVisible}
        ksVisible={ksPrintComponentVisible}
        onCancel={onPrintComponentInstallModalCancel}
      />
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
          <Form.Item name="content" label="打印报文" {...textAreaLayout}>
            <Input.TextArea rows={12} />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.platform !== currentValues.platform
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('platform') ? (
                <Form.Item name="printer" label="选择打印机">
                  <Select placeholder="选择打印机" allowClear>
                    {printComponentMap[getFieldValue('platform')].printers.map((printer: any) => (
                      <Select.Option key={printer.name} value={printer.name}>
                        {printer.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : null
            }
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
