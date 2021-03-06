import { PageContainer } from '@ant-design/pro-layout';
import { Card, DatePicker, Space, Statistic } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const { Countdown } = Statistic;

const CountDown = () => {
  const [date, setDate] = useState<string | undefined>(() => {
    return localStorage.getItem('countdown') || undefined;
  });

  const onDatePickerChange = (tempDate: any, dateString: string) => {
    setDate(dateString);
    localStorage.setItem('countdown', dateString);
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Card bordered={false}>
        <Space direction="vertical" size={'middle'}>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            value={moment(date)}
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            onChange={onDatePickerChange}
            placeholder="请输入时间"
          />
          <Countdown title="倒计时" value={date} format="D 天 H 时 m 分 s 秒" />
        </Space>
      </Card>
    </PageContainer>
  );
};

export default CountDown;
