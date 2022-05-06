import { PageContainer } from '@ant-design/pro-layout';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { history } from 'umi';

type CompareProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const Compare: FC<CompareProps> = (props) => {
  const { match, location, children } = props;
  const url = match.path === '/' ? '' : match.path;

  const currentTabKey = useMemo(() => {
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'order';
  }, [location, url]);

  const tabList = [
    {
      key: 'order',
      tab: '订单对比',
    },
    {
      key: 'address',
      tab: '地址对比',
    },
    // {
    //   key: 'record',
    //   tab: '分配记录',
    // },
  ];

  const handleTabChange = (key: string) => {
    history.push(`${url}/${key}`);
  };

  return (
    <PageContainer
      title="软件内比较相关功能"
      subTitle="提供软件内的一些数据，进行快速对比"
      breadcrumb={undefined}
      tabActiveKey={currentTabKey}
      onTabChange={handleTabChange}
      tabList={tabList}
    >
      {children}
    </PageContainer>
  );
};

export default Compare;
