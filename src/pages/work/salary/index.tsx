import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, InputNumber, Space } from 'antd';
import React from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 6 },
};

const Salary = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item name="needDuty" label="技能金额" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item name="needDuty" label="绩效奖金" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item name="needDuty" label="工龄金额" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item name="needDuty" label="个税" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item name="needDuty" label="公积金" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item name="needDuty" label="社保" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item name="needDuty" label="应出勤天数" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item name="needDuty" label="请假天数" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                计算
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <div>
        技术部缺勤扣款规则：
        <div>1.扣全勤奖</div>
        <div>2.扣请假：底薪2500/当月应出勤天数*请假天数</div>
        <div>3.绩效奖/当月应出勤天数*请假天数</div>
        <div>4.请假天数每4天的扣技能四分之一，不满足4天的不扣。</div>
      </div>
    </PageContainer>
  );
};

export default Salary;
