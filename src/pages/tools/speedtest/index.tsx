import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

const SpeedTest = () => {
  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <iframe
          width="100%"
          height="650px"
          frameBorder="0"
          src="https://tools.speedtestcustom.com"
        />
      </Card>
    </PageContainer>
  );
};

export default SpeedTest;
