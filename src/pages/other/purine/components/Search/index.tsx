import { SearchOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Button, Input } from 'antd';
import { Form, Radio } from 'antd';
import type { FC } from 'react';
import React from 'react';

interface SearchProps {
  data: any[];
  onSearch: (value: any) => void;
}

const Search: FC<SearchProps> = (props) => {
  const { data, onSearch } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    let tempValues = values;
    if (!values.category) {
      form.setFieldsValue({ category: 'all' });
      tempValues = { ...values, category: 'all' };
    }
    onSearch(tempValues);
  };

  const onCategoryChange = async (e: RadioChangeEvent) => {
    const values = await form.validateFields();
    onFinish({ ...values, category: e.target.value });
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item name="food">
        <Input placeholder="请输入食物" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          搜索
        </Button>
      </Form.Item>

      <Form.Item
        name="category"
        style={{ display: 'flex', width: '100%', marginTop: 15, marginBottom: 15 }}
      >
        <Radio.Group onChange={onCategoryChange}>
          <Radio.Button value="all">全部</Radio.Button>
          {data.map((item) => (
            <Radio.Button key={item.category} value={item.category}>
              {item.category}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default Search;
