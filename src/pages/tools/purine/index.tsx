import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useState } from 'react';
import Search from './components/Search';

import purineData from './data';

type PurineModel = {
  food: string;
  purine: string;
};

const Purine = () => {
  const [data, setData] = useState<PurineModel[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = (value: any) => {
    console.log(value);
    setLoading(true);
    const tempData: PurineModel[] = [];
    purineData
      .filter((item) => value.category === 'all' || item.category === value.category)
      .map((item) => {
        item.data.map((subItem) => {
          if (value.food) {
            if (subItem.food.indexOf(value.food) !== -1) {
              tempData.push({
                food: subItem.food,
                purine: subItem.purine,
              });
            }
          } else {
            tempData.push({
              food: subItem.food,
              purine: subItem.purine,
            });
          }

          return subItem;
        });
        return item;
      });

    setData(tempData);

    setLoading(false);
  };

  const columns: ColumnsType<PurineModel> = [
    { dataIndex: 'food', title: '食物' },
    { dataIndex: 'purine', title: '嘌呤' },
  ];

  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <Search data={purineData} onSearch={onSearch} />
        <Table<PurineModel>
          rowKey="food"
          dataSource={data}
          loading={loading}
          columns={columns}
          pagination={{
            pageSize: 50,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default Purine;
