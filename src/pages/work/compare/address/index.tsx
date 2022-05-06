import { Card } from 'antd';
import React from 'react';
import AddressCompareForm from './components/AddressCompareForm';

const Address = () => {
  const [compareResult, setCompareResult] = React.useState<string[]>([]);
  const [isShowResult, setIsShowResult] = React.useState<boolean>(false);

  const onCompareFormFinish = (values: any) => {
    console.log(values);
    const { address, keywords } = values;

    const resultKeywords: string[] = [];

    const splitKeywords = keywords.split(/[,，\s+]/).filter((item: string) => !!item);

    if (splitKeywords && splitKeywords.length) {
      splitKeywords.map((item: string) => {
        const reg = new RegExp(item, 'i');
        console.log(address);
        console.log(item);
        const result = address.match(reg);
        console.log(result);
        if (result) {
          resultKeywords.push(item);
        }
        return item;
      });
    }

    setCompareResult(resultKeywords);

    setIsShowResult(true);
  };

  return (
    <>
      <Card>
        <AddressCompareForm onCompareFormFinish={onCompareFormFinish} />
      </Card>
      {compareResult.length || isShowResult ? (
        <Card title="对比结果">
          <div style={{ wordWrap: 'break-word' }}>
            被检测的地址中存在的关键词为：{compareResult.join(',')}
          </div>
        </Card>
      ) : undefined}
    </>
  );
};

export default Address;
