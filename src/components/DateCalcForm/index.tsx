import { Button, DatePicker, Form, InputNumber, Space } from 'antd';
import moment from 'moment';
import React from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6 },
};

const DateCalcForm = () => {
  const [form] = Form.useForm();

  const [calcDate, setCalcDate] = React.useState('');

  const onReset = () => {
    form.resetFields();
  };

  const onFormFinish = (values: any) => {
    console.log(values);

    const tempCalcDate = moment(values.date).add(values.days, 'days').format('YYYY-MM-DD HH:mm:ss');
    setCalcDate(tempCalcDate);
  };

  return (
    <div>
      <Form {...layout} form={form} onFinish={onFormFinish}>
        <Form.Item name="date" label="日期" rules={[{ required: true }]}>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            placeholder="请输入时间"
          />
        </Form.Item>

        <Form.Item name="days" label="天数" rules={[{ required: true }]}>
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
      {calcDate ? <div>{calcDate}</div> : null}
    </div>
  );
};

export default DateCalcForm;
