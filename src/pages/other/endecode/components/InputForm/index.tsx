import type { FormInstance } from 'antd';
import { Divider } from 'antd';
import { Button, Form, Input, Radio, Space } from 'antd';
import type { FC } from 'react';
import React from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 6 },
};

interface InputFormProps {
  form: FormInstance<any>;
  onInputFormFinish: (values: any) => void;
}

const InputForm: FC<InputFormProps> = (props) => {
  const { form, onInputFormFinish } = props;

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        initialValues={{ type: 'unicodeEncode' }}
        onFinish={onInputFormFinish}
      >
        <Form.Item name="inputValue" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item name="type" rules={[{ required: true }]}>
          <Radio.Group>
            <Space direction="vertical">
              <div>
                <Radio value={'unicodeEncode'}>Unicode编码</Radio>
                <Radio value={'urlEncode'}>URL编码</Radio>
                <Radio value={'base64Encode'}>Base64编码</Radio>
                <Radio value={'morseEncode'}>摩斯密码编码</Radio>
              </div>
              <Divider style={{ margin: '4px 0' }} />
              <div>
                <Radio value={'unicodeDecode'}>Unicode解码</Radio>
                <Radio value={'urlDecode'}>URL解码</Radio>
                <Radio value={'base64Decode'}>Base64解码</Radio>
                <Radio value={'morseDecode'}>摩斯密码解码</Radio>
              </div>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              转换
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
        <Form.Item name="outputValue">
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputForm;
