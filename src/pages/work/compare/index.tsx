import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';
import CompareForm from './components/CompareForm';

const Compare = () => {
  const [compareResult1, setCompareResult1] = React.useState<string[]>([]);
  const [compareResult2, setCompareResult2] = React.useState<string[]>([]);
  const [isShowResult, setIsShowResult] = React.useState<boolean>(false);

  const isJSON = (str: string) => {
    if (typeof str == 'string') {
      try {
        const obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log('error：' + str + '!!!' + e);
        return false;
      }
    }
    console.log('It is not a string!');
  };

  const getTidsByJSON = (content: string) => {
    const str = JSON.stringify(content).toString().replace(new RegExp('\\\\"', 'gm'), '"');
    const tidsReg = /(?<=(\"tid\":\")).*?(?=(\"))/g;
    console.log(str);
    console.log(str.match(tidsReg));
    return str.match(tidsReg);
  };

  const getTidsByStr = (content: string) => {
    const tempOrderSearchVal = content.replace(/^\s+|\s+$/g, '');
    return tempOrderSearchVal.split(/[,，\s+]/).filter((item: string) => !!item);
  };

  // const compareHandle = (tids1: string[], tids2: string[]) => {
  //   // const result = tids1.filter((item: string) => !tids2.includes(item));
  //   return tids1.concat(tids2).filter(function (v, i, arr) {
  //     return arr.indexOf(v) === arr.lastIndexOf(v);
  //   });
  //   // return result;
  // };
  const compareSingleHandle = (tids1: string[], tids2: string[]) => {
    const result = tids1.filter((item: string) => !tids2.includes(item));
    return result;
  };

  const onCompareFormFinish = (values: any) => {
    const tids1 =
      (isJSON(values.content1) ? getTidsByJSON(values.content1) : getTidsByStr(values.content1)) ||
      [];
    const tids2 =
      (isJSON(values.content2) ? getTidsByJSON(values.content2) : getTidsByStr(values.content2)) ||
      [];
    console.log(tids1);
    console.log(tids2);
    // const result = compareHandle(Array.from(new Set(tids1)), Array.from(new Set(tids2)));
    const result1 = compareSingleHandle(Array.from(new Set(tids1)), Array.from(new Set(tids2)));
    const result2 = compareSingleHandle(Array.from(new Set(tids2)), Array.from(new Set(tids1)));
    // console.log(result);
    setCompareResult1(result1);
    setCompareResult2(result2);
    setIsShowResult(true);
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <CompareForm onCompareFormFinish={onCompareFormFinish} />
      </Card>
      {compareResult1.length || compareResult2.length || isShowResult ? (
        <Card title="对比结果">
          <div>文本内容1的差异订单号：{compareResult1.join(',')}</div>
          <div>文本内容2的差异订单号：{compareResult2.join(',')}</div>
        </Card>
      ) : undefined}
    </PageContainer>
  );
};

export default Compare;
