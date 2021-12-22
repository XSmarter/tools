import { PageContainer } from '@ant-design/pro-layout';
import { Calendar, Card } from 'antd';
import type { Moment } from 'moment';
import React from 'react';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Duty = () => {
  const dateCellRender = (date: Moment) => {
    const nightArr: string[] = [
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

    // 11 - 27 韩飞

    const wcArr = [
      '韩飞',
      '王见见',
      '徐文超',
      '王理想',
      '赵宝才',
      '郑涛',
      '张自香',
      '孙冰',
      '赵运达',
      '刘尝鹏',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ];

    const day = moment(moment(date).format('YYYY-MM-DD')).diff(moment('2021-12-21'), 'days');

    const wcDay = moment(moment(date).format('YYYY-MM-DD')).diff(moment('2021-11-27'), 'days');
    if (day >= 0) {
      const idx = day % nightArr.length;

      const wcIdx = wcDay % wcArr.length;

      if (wcArr[wcIdx]) {
        return (
          <div>
            <div>{nightArr[idx]} - 晚上值班</div>
            <div>{wcArr[wcIdx]} - 打扫厕所</div>
          </div>
        );
      }

      return <div>{nightArr[idx]} - 晚上值班</div>;
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
