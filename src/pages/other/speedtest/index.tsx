import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';

const SpeedTest = () => {
  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <iframe
          src="https://woodbox.dualstack.speedtestcustom.com/"
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          width="100%"
          height="1200"
          frameBorder="0"
        />
      </Card>
    </PageContainer>
  );
};

export default SpeedTest;
