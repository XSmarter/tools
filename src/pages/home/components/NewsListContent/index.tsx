import { Image } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

type NewsListContentProps = {
  data: {
    description: React.ReactNode;
    ctime: number;
    source: string;
    picUrl?: string;
  };
};

const NewsListContent: React.FC<NewsListContentProps> = ({
  data: { description, ctime, source, picUrl },
}) => (
  <div className={styles.listContent}>
    {picUrl && (
      <div style={{ marginBottom: 15 }}>
        <Image width={'100%'} src={picUrl} />
      </div>
    )}

    <div className={styles.description}>{description}</div>
    <div className={styles.extra}>
      {source}
      <em>{moment(ctime).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default NewsListContent;
