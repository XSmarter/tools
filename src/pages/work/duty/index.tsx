import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Calendar, Card, ConfigProvider, Select, Tooltip } from 'antd';
import type { Moment } from 'moment';
import { useState } from 'react';

import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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

const Duty = () => {
  const [selectedName, setSelectedName] = useState<string>('');

  const onChange = (value: any) => {
    setSelectedName(value);
  };

  const dateCellRender = (date: Moment) => {
    // const nightArr: string[] = [
    //   '李冰',
    //   '王见见',
    //   '王理想',
    //   '张自香',
    //   '赵宝才',
    //   '韩飞',
    //   '赵运达',
    //   '刘尝鹏',
    //   '郑涛',
    //   '段昌富',
    // ];

    // 11-11 王理想

    const wcArr = [
      '王理想',
      '', // 杨镇源
      '郑涛',
      '王见见',
      '', // 岳国栋
      '赵运达',
      '', // 高帅
      '', // 吴涛
      '韩飞',
      '赵宝才',
      '', // 厉军
      '孙冰',
      '张自香',
      '', // 李杨
      '', // 张子麟
      '', // 刘全杰
      '许文超',
      '段昌富',
      '刘尝鹏',
      '', // 张飞龙
    ];

    const catArr = [
      '', // 何科碟
      '', // 刘全杰
      '', // 孙艳艳
      '', // 解方萍
      '', // 吴丹丹
      '李冰',
      '王见见',
      '许文超',
      '王理想',
      '赵宝才',
      '郑涛',
      '韩飞',
      '张自香',
      '赵运达',
      '刘尝鹏',
      '段昌富',
      '', // 张飞龙
      '', // 孙冰
      '', // 宋俊瑶
      '', // 吴涛
      '', // 陈琳
      '', // 马莉娟
      '', // 岳国栋
      '', // 杨镇源
      '', // 乔郭霞
      '', // 厉军
      '', // 李扬
      '', // 高帅
      '', // 张子麟
      '', // 巩鑫冉
      '', // 朱文艳
      '', // 张洁
      '', // 黄荣
      // '', // 童严秋
      '', // 叶婷婷
    ];

    const day = moment(moment(date).format('YYYY-MM-DD')).diff(moment('2022-04-27'), 'days');

    const wcDay = moment(moment(date).format('YYYY-MM-DD')).diff(moment('2022-11-11'), 'days');

    const catDay = moment(moment(date).format('YYYY-MM-DD')).diff(moment('2022-07-15'), 'days');

    if (day >= 0) {
      const idx = day % nightArr.length;

      const wcIdx = wcDay % wcArr.length;

      const catIdx = catDay % catArr.length;

      const loopTime = Math.floor(catDay / catArr.length) - 1;

      const catChangeShit = !((catDay - loopTime) % 7);

      // if (wcArr[wcIdx] && wcDay >= 0) {
      //   return (
      //     <div style={{ textAlign: 'right' }}>
      //       <Avatar.Group>
      //         <Tooltip title="晚上值班" placement="top">
      //           <Avatar size="large" style={{ backgroundColor: '#464646' }}>
      //             {nightArr[idx]}
      //           </Avatar>
      //         </Tooltip>
      //         <Tooltip title="打扫厕所" placement="top">
      //           <Avatar size="large" style={{ backgroundColor: '#ffc107' }}>
      //             {wcArr[wcIdx]}
      //           </Avatar>
      //         </Tooltip>
      //       </Avatar.Group>
      //     </div>
      //   );
      // }

      return (
        <div style={{ textAlign: 'right' }}>
          <Avatar.Group>
            {!selectedName || (selectedName && nightArr[idx] === selectedName) ? (
              <Tooltip title="晚上值班" placement="top">
                <Avatar size="large" style={{ backgroundColor: '#464646' }}>
                  {nightArr[idx]}
                </Avatar>
              </Tooltip>
            ) : undefined}

            {wcArr[wcIdx] &&
            wcDay >= 0 &&
            (!selectedName || (selectedName && wcArr[wcIdx] === selectedName)) ? (
              <Tooltip title="打扫厕所" placement="top">
                <Avatar size="large" style={{ backgroundColor: '#ffc107' }}>
                  {wcArr[wcIdx]}
                </Avatar>
              </Tooltip>
            ) : undefined}

            {catArr[catIdx] &&
            catDay >= 0 &&
            (!selectedName || (selectedName && catArr[catIdx] === selectedName)) ? (
              <Tooltip title={`照顾猫猫${catChangeShit ? '，换猫砂' : ''}`} placement="top">
                <Avatar size="large" style={{ backgroundColor: '#bbc933' }}>
                  {catArr[catIdx]}
                </Avatar>
              </Tooltip>
            ) : undefined}
          </Avatar.Group>
        </div>
      );
    }
    return undefined;
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <ConfigProvider locale={zhCN}>
        <Card>
          <Select
            showSearch
            placeholder="选择值班人员"
            optionFilterProp="children"
            style={{ width: '172px' }}
            onChange={onChange}
            filterOption={(input: any, option: any) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            <Select.Option value="">全部值班人员</Select.Option>
            {nightArr.map((item) => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
          <Calendar dateCellRender={dateCellRender} />
        </Card>
      </ConfigProvider>
    </PageContainer>
  );
};

export default Duty;
