import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Calendar, Card, Tooltip } from 'antd';
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
      '段昌富',
    ];

    // 03 - 14 韩飞

    const wcArr = [
      '韩飞',
      '王见见',
      '许文超',
      '王理想',
      '赵宝才',
      '郑涛',
      '张自香',
      '孙冰',
      '赵运达',
      '刘尝鹏',
      '', // 张飞龙
      '', // 岳国栋
      '', // 杨镇源
      '', // 厉军
      '', // 李杨
      '', // 高帅
      '', // 张子麟
      '', // 段昌富
      '', // 吴涛
    ];

    const day = moment(moment(date).format('YYYY-MM-DD')).diff(moment('2022-04-27'), 'days');

    const wcDay = moment(moment(date).format('YYYY-MM-DD')).diff(moment('2022-03-14'), 'days');
    if (day >= 0) {
      const idx = day % nightArr.length;

      const wcIdx = wcDay % wcArr.length;

      if (wcArr[wcIdx] && wcDay >= 0) {
        return (
          <div style={{ textAlign: 'right' }}>
            <Avatar.Group>
              <Tooltip title="晚上值班" placement="top">
                <Avatar size="large" style={{ backgroundColor: '#464646' }}>
                  {nightArr[idx]}
                </Avatar>
              </Tooltip>
              <Tooltip title="打扫厕所" placement="top">
                <Avatar size="large" style={{ backgroundColor: '#ffc107' }}>
                  {wcArr[wcIdx]}
                </Avatar>
              </Tooltip>
            </Avatar.Group>
          </div>
        );
      }

      return (
        <div style={{ textAlign: 'right' }}>
          <Avatar.Group>
            <Tooltip title="晚上值班" placement="top">
              <Avatar size="large" style={{ backgroundColor: '#464646' }}>
                {nightArr[idx]}
              </Avatar>
            </Tooltip>
          </Avatar.Group>
        </div>
      );
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
