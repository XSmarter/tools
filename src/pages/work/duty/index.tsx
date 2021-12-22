import { PageContainer } from '@ant-design/pro-layout';
import { Calendar, Card } from 'antd';
import type { Moment } from 'moment';
import React from 'react';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Duty = () => {
  const dateCellRender = (date: Moment) => {
    const arr: string[] = [
      '李冰',
      '王见见',
      '王理想',
      '张自香',
      '赵宝才',
      '韩飞',
      '赵运达',
      '刘尝鹏',
      '郑涛',
    ];
    const day = moment(moment(date).format('YYYY-MM-DD')).diff(moment('2021-12-21'), 'days');
    if (day >= 0) {
      console.log(day);
      const idx = day % arr.length;
      console.log(arr[idx]);
      return arr[idx];
    }
    return undefined;
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <Calendar dateCellRender={dateCellRender} />
      </Card>
    </PageContainer>
  );
};

export default Duty;
