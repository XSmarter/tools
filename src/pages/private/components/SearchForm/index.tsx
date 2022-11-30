import { SearchOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Space } from 'antd';
import { InputNumber } from 'antd';
import { Button, Form, Radio } from 'antd';
import type { FC } from 'react';

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
      form.setFieldsValue({ category: '4725' });
      tempValues = { ...values, category: '4725' };
    }
    onSearch(tempValues);
  };

  const onCategoryChange = async (e: RadioChangeEvent) => {
    const values = await form.validateFields();
    onFinish({ ...values, category: e.target.value });
  };

  return (
    <Form form={form} layout="inline" initialValues={{ category: 4725 }} onFinish={onFinish}>
      <Form.Item name="index">
        <InputNumber placeholder="" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          PULL
        </Button>
      </Form.Item>
      <Form.Item
        name="category"
        style={{ display: 'flex', width: '100%', marginTop: 15, marginBottom: 15 }}
      >
        <Radio.Group onChange={onCategoryChange}>
          <Space wrap>
            {data.map((item) => (
              <Radio.Button key={item.cid} value={item.cid}>
                {item.category}{' '}
                <span style={{ color: '#cb0c0c', fontSize: '12px' }}>{item.max}</span>
              </Radio.Button>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default Search;
