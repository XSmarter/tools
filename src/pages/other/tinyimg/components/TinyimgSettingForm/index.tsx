import { Button, Form, InputNumber, Space } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import React from 'react';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 6 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 6 },
};
interface TinyimgSettingFormProps {
  width: number;
  height: number;
  onTinyimgSettingFormFinish: (values: any) => void;
}

const TinyimgSettingForm: FC<TinyimgSettingFormProps> = (props) => {
  const [form] = Form.useForm();

  const { width, height, onTinyimgSettingFormFinish } = props;

  useEffect(() => {
    if (width && height) {
      form.setFieldsValue({
        width,
        height,
      });
    }
  }, [width, height]);

  const onFinish = (values: any) => {
    console.log(values);
    onTinyimgSettingFormFinish(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onWidthChange = (value: number) => {
    const ratio = width / height;
    form.setFieldsValue({
      height: Math.round(value / ratio),
    });
  };

  const onHeightChange = (value: number) => {
    const ratio = width / height;
    form.setFieldsValue({
      width: Math.round(value * ratio),
    });
  };

  return (
    <div>
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item name="width" label="宽" rules={[{ required: true }]}>
          <InputNumber onChange={onWidthChange} />
        </Form.Item>
        <Form.Item name="height" label="高" rules={[{ required: true }]}>
          <InputNumber onChange={onHeightChange} />
        </Form.Item>
        <Form.Item name="quality" label="质量" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              压缩
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

export default TinyimgSettingForm;
