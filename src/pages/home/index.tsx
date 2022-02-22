import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Avatar, List } from 'antd';
import { getNews } from '@/services/news';
import NewsListContent from './components/NewsListContent';
import Message from './components/Message';

export default (): React.ReactNode => {
  const [newsLoading, setNewsLoading] = useState<boolean>(false);
  const [news, setNews] = useState<any[]>([]);

  const platformData = [
    {
      title: '淘宝',
      desc: '云工作台',
      avatar: 'https://img.alicdn.com/tps/i3/T1OjaVFl4dXXa.JOZB-114-114.png',
      href: 'https://console.cloud.tmall.com/member/login?sub=true&redirectURL=http%3A%2F%2Fconsole.cloud.tmall.com%2F',
    },
    {
      title: '拼多多',
      desc: '云工作台',
      avatar: 'https://open-static.pinduoduo.com/application/favicon.ico',
      href: 'https://open.pinduoduo.com/application/home',
    },
    {
      title: '抖音',
      desc: '云工作台',
      avatar:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU5ICg4NjEyNykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+57uEIDEzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPGNpcmNsZSBpZD0icGF0aC0xIiBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiPjwvY2lyY2xlPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTMiIHBvaW50cz0iMC40NDYzIDAuMDI1IDEwLjQ2MzMgMC4wMjUgMTAuNDYzMyAyMi41NTU5IDAuNDQ2MyAyMi41NTU5Ij48L3BvbHlnb24+CiAgICAgICAgPHBvbHlnb24gaWQ9InBhdGgtNSIgcG9pbnRzPSIwLjQ5MTcgMC4xOTY2IDIwLjgzNTcgMC4xOTY2IDIwLjgzNTcgMjAgMC40OTE3IDIwIj48L3BvbHlnb24+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLmiYvmnLrnmbvlvZXlpIfku70tMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExODguMDAwMDAwLCAtNDU0LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTQ4LjAwMDAwMCwgMTA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIuMDAwMDAwLCAzNDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xMSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnu4QtMTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC02Ij4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgaWQ9IuiSmeeJiCIgZmlsbD0iIzFEMEIxQSIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hCIgbWFzaz0idXJsKCNtYXNrLTIpIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4wMDAwMDAsIDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOS4yODEsMTEuNjIyMiBMOS4yODEsMTAuNTY5MiBDOC45MjEsMTAuNTE5MiA4LjU1MywxMC40ODkyIDguMTc5LDEwLjQ4OTIgQzMuNjY5LDEwLjQ4OTIgMCwxNC4xNTgyIDAsMTguNjY5MiBDMCwyMS40MzUyIDEuMzgzLDIzLjg4NTIgMy40OTIsMjUuMzY1MiBDMi4xMzEsMjMuOTA0MiAxLjI5NiwyMS45NDYyIDEuMjk2LDE5Ljc5NjIgQzEuMjk2LDE1LjM1MTIgNC44NiwxMS43MjUyIDkuMjgxLDExLjYyMjIiIGlkPSJGaWxsLTEiIGZpbGw9IiMzRkJBQkUiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDAuOTc1NDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stNCIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTMiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iQ2xpcC00Ij48L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTMuNDc0MywyMi41NTU5IEM1LjQ4NzMsMjIuNTU1OSA3LjEyNzMsMjAuOTU0OSA3LjIwMzMsMTguOTYwOSBMNy4yMDkzLDEuMTUyOSBMMTAuNDYzMywxLjE1MjkgQzEwLjM5NTMsMC43ODU5IDEwLjM1ODMsMC40MDk5IDEwLjM1ODMsMC4wMjQ5IEw1LjkxNDMsMC4wMjQ5IEw1LjkwODMsMTcuODMyOSBDNS44MzIzLDE5LjgyNzkgNC4xOTEzLDIxLjQyODkgMi4xNzkzLDIxLjQyODkgQzEuNTUzMywyMS40Mjg5IDAuOTY0MywyMS4yNzI5IDAuNDQ2MywyMC45OTg5IEMxLjEyNTMsMjEuOTQwOSAyLjIyODMsMjIuNTU1OSAzLjQ3NDMsMjIuNTU1OSIgaWQ9IkZpbGwtMyIgZmlsbD0iIzNGQkFCRSIgbWFzaz0idXJsKCNtYXNrLTQpIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjIuNTQwNyw4LjE3MiBMMjIuNTQwNyw3LjE4MyBDMjEuMjk5Nyw3LjE4MyAyMC4xNDM3LDYuODE0IDE5LjE3NDcsNi4xODEgQzIwLjAzNjcsNy4xNzMgMjEuMjA5Nyw3Ljg4OCAyMi41NDA3LDguMTcyIiBpZD0iRmlsbC01IiBmaWxsPSIjM0ZCQUJFIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTkuMTc0NSw2LjE4MDggQzE4LjIyODUsNS4wOTQ4IDE3LjY1MzUsMy42Nzc4IDE3LjY1MzUsMi4xMjc4IEwxNi40NjM1LDIuMTI3OCBDMTYuNzc3NSwzLjgyMDggMTcuNzgxNSw1LjI3MzggMTkuMTc0NSw2LjE4MDgiIGlkPSJGaWxsLTciIGZpbGw9IiNFNDAwNEUiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjE3OTQsMTQuOTMyNyBDNi4xMTk0LDE0LjkzMjcgNC40NDQ0LDE2LjYwODcgNC40NDQ0LDE4LjY2ODcgQzQuNDQ0NCwyMC4xMDI3IDUuMjU3NCwyMS4zNDg3IDYuNDQ2NCwyMS45NzQ3IEM2LjAwMzQsMjEuMzYwNyA1LjczOTQsMjAuNjA5NyA1LjczOTQsMTkuNzk1NyBDNS43Mzk0LDE3LjczNjcgNy40MTQ0LDE2LjA2MDcgOS40NzQ0LDE2LjA2MDcgQzkuODU5NCwxNi4wNjA3IDEwLjIyODQsMTYuMTIzNyAxMC41NzY0LDE2LjIzMzcgTDEwLjU3NjQsMTEuNjk2NyBDMTAuMjE1NCwxMS42NDc3IDkuODQ5NCwxMS42MTc3IDkuNDc0NCwxMS42MTc3IEM5LjQwOTQsMTEuNjE3NyA5LjM0NTQsMTEuNjE5NyA5LjI4MTQsMTEuNjIxNyBMOS4yODE0LDE1LjEwNTcgQzguOTMyNCwxNC45OTU3IDguNTY0NCwxNC45MzI3IDguMTc5NCwxNC45MzI3IiBpZD0iRmlsbC05IiBmaWxsPSIjRTQwMDRFIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCA3Ljk3NTQwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTYiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC01Ij48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hc2s+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkNsaXAtMTIiPjwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTkuNTQwNywwLjE5NjYgTDE5LjU0MDcsMy42NTA2IEMxNy4yMzY3LDMuNjUwNiAxNS4xMDE3LDIuOTEzNiAxMy4zNTc3LDEuNjYyNiBMMTMuMzU3NywxMC42OTM2IEMxMy4zNTc3LDE1LjIwMzYgOS42ODg3LDE4Ljg3MjYgNS4xNzk3LDE4Ljg3MjYgQzMuNDM2NywxOC44NzI2IDEuODE5NywxOC4zMjI2IDAuNDkxNywxNy4zODk2IEMxLjk4NTcsMTguOTk0NiA0LjExNDcsMjAuMDAwNiA2LjQ3NDcsMjAuMDAwNiBDMTAuOTg0NywyMC4wMDA2IDE0LjY1MzcsMTYuMzMxNiAxNC42NTM3LDExLjgyMDYgTDE0LjY1MzcsMi43OTA2IEMxNi4zOTU3LDQuMDQxNiAxOC41MzE3LDQuNzc4NiAyMC44MzU3LDQuNzc4NiBMMjAuODM1NywwLjMzNDYgQzIwLjM5MjcsMC4zMzQ2IDE5Ljk1ODcsMC4yODY2IDE5LjU0MDcsMC4xOTY2IiBpZD0iRmlsbC0xMSIgZmlsbD0iI0U0MDA0RSIgbWFzaz0idXJsKCNtYXNrLTYpIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTYuMzU4MSw5LjYzOCBDMTguMTAxMSwxMC44ODkgMjAuMjM3MSwxMS42MjYgMjIuNTQxMSwxMS42MjYgTDIyLjU0MTEsOC4xNzIgQzIxLjIxMDEsNy44ODggMjAuMDM3MSw3LjE3MyAxOS4xNzQxLDYuMTgxIEMxNy43ODIxLDUuMjczIDE2Ljc3NzEsMy44MiAxNi40NjMxLDIuMTI4IEwxMy4yMTAxLDIuMTI4IEwxMy4yMDMxLDE5LjkzNyBDMTMuMTI4MSwyMS45MzEgMTEuNDg3MSwyMy41MzEgOS40NzQxLDIzLjUzMSBDOC4yMjgxLDIzLjUzMSA3LjEyNjEsMjIuOTE2IDYuNDQ2MSwyMS45NzUgQzUuMjU3MSwyMS4zNDkgNC40NDQxLDIwLjEwMyA0LjQ0NDEsMTguNjY5IEM0LjQ0NDEsMTYuNjA4IDYuMTIwMSwxNC45MzMgOC4xNzkxLDE0LjkzMyBDOC41NjQxLDE0LjkzMyA4LjkzMjEsMTQuOTk2IDkuMjgxMSwxNS4xMDYgTDkuMjgxMSwxMS42MjIgQzQuODYwMSwxMS43MjUgMS4yOTUxLDE1LjM1MSAxLjI5NTEsMTkuNzk2IEMxLjI5NTEsMjEuOTQ2IDIuMTMwMSwyMy45MDQgMy40OTIxLDI1LjM2NSBDNC44MjAxLDI2LjI5OCA2LjQzNjEsMjYuODQ4IDguMTc5MSwyNi44NDggQzEyLjY4OTEsMjYuODQ4IDE2LjM1ODEsMjMuMTc5IDE2LjM1ODEsMTguNjY5IEwxNi4zNTgxLDkuNjM4IFoiIGlkPSJGaWxsLTEzIiBmaWxsPSIjRkVGRUZFIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
      href: 'https://opencloud.jinritemai.com/container/admin/index?pageNo=1&pageSize=20',
    },
    {
      title: '腾讯',
      desc: '云工作台',
      avatar: 'https://cloudcache.tencentcs.com/qcloud/app/resource/ac/favicon.ico',
      href: 'https://console.cloud.tencent.com',
    },
  ];

  const getNewsHandle = () => {
    setNewsLoading(true);
    getNews().then((res) => {
      if (res.code === 200) {
        setNews(res.newslist || []);
      } else {
        setNews([]);
      }
      setNewsLoading(false);
    });
  };

  useEffect(() => {
    getNewsHandle();
  }, []);

  return (
    <PageContainer>
      <Row gutter={24}>
        {platformData.map((item) => (
          <Col key={item.title} xs={24} sm={12} md={12} lg={12} xl={6} style={{ marginBottom: 24 }}>
            <a key="href" href={item.href} target={'_blank'} rel="noreferrer">
              <Card hoverable>
                <Card.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.title}
                  description={item.desc}
                />
              </Card>
            </a>
          </Col>
        ))}
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card title="今日头条">
            <List<any>
              size="large"
              loading={newsLoading}
              rowKey="id"
              itemLayout="vertical"
              dataSource={news}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    style={{ marginBottom: 0 }}
                    title={
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.title}
                      </a>
                    }
                  />
                  <NewsListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card title="留言区">
            <Message />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
