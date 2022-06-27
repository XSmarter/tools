import { getUUID, sort } from '@/utils/utils';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, List, Popconfirm, Statistic, Tooltip } from 'antd';
import { useState } from 'react';

import moment from 'moment';
import CountDownForm from './components/CountDownForm';
import styles from './index.less';

const { Countdown } = Statistic;

interface CountDown {
  id: string;
  title: string;
  date: string;
  sort: number;
}

const CountDowns = () => {
  const [countDownData, setCountDownData] = useState<CountDown[]>(() => {
    const data = localStorage.getItem('countDownData');
    if (data) {
      const tempData = JSON.parse(data);
      const sortTempData = sort(tempData);

      return sortTempData;
    }
    return [];
  });

  const nullCountDownData: Partial<CountDown> = {};

  const [countDownFormVisible, setCountDownFormVisible] = useState(false);

  const [editCountDown, setEditCountDown] = useState<Partial<CountDown>>({});

  const addCountDown = () => {
    setEditCountDown({});
    setCountDownFormVisible(true);
  };

  const onCountDownFormFinish = (values: any) => {
    console.log(values);
    if (editCountDown.id) {
      const newShortcutData = countDownData.map((item) => {
        if (item.id === editCountDown.id) {
          return {
            ...item,
            ...values,
          };
        }
        return item;
      });

      const sortTempData = sort(newShortcutData);
      setCountDownData(sortTempData);
      localStorage.setItem('countDownData', JSON.stringify(sortTempData));
      setEditCountDown({});
    } else {
      const newShortcutData = [
        ...countDownData,
        {
          id: getUUID(8, 10),
          ...values,
        },
      ];
      console.log(newShortcutData);
      const sortTempData = sort(newShortcutData);
      setCountDownData(sortTempData);
      localStorage.setItem('countDownData', JSON.stringify(sortTempData));
    }
    setCountDownFormVisible(false);
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <CountDownForm
        visible={countDownFormVisible}
        editShortcut={editCountDown}
        onModalCancel={() => setCountDownFormVisible(false)}
        onCountDownFormFinish={onCountDownFormFinish}
      />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={[...countDownData, nullCountDownData]}
        renderItem={(item) => {
          if (item && item.id) {
            return (
              <List.Item className={styles.shortcutCard}>
                <div
                  className={styles.options}
                  style={{ position: 'absolute', top: 6, right: 15, zIndex: 100 }}
                >
                  <span className={styles.optionicon}>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditCountDown(item);
                        setCountDownFormVisible(true);
                      }}
                      style={{}}
                      className={styles.icon}
                    >
                      <EditOutlined key="edit" />
                    </span>
                  </span>
                  <span className={styles.optionicon}>
                    <Popconfirm
                      title="确定删除吗？"
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => {
                        const newShortcutData = countDownData.filter(
                          (tempItem) => tempItem.id !== item.id,
                        );
                        setCountDownData(newShortcutData);
                        localStorage.setItem('countDownData', JSON.stringify(newShortcutData));
                        setEditCountDown({});
                      }}
                    >
                      <span
                        style={{
                          marginLeft: 4,
                        }}
                        className={styles.icon}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <DeleteOutlined key="del" />
                      </span>
                    </Popconfirm>
                  </span>
                </div>

                <Card hoverable bordered={false} title={item.title}>
                  <Tooltip title={moment(item.date).format('YYYY-MM-DD HH:mm:ss')}>
                    <Countdown title="倒计时" value={item.date} format="D 天 H 时 m 分 s 秒" />
                  </Tooltip>
                </Card>
              </List.Item>
            );
          }

          return (
            <List.Item>
              <Button type="dashed" onClick={addCountDown} className={styles.newButton}>
                <PlusOutlined /> 添加
              </Button>
            </List.Item>
          );
        }}
      />
    </PageContainer>
  );
};

export default CountDowns;
