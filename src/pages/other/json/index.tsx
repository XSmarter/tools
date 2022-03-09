import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { json } from '@codemirror/lang-json';
import { Button, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const JsonFormat = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleFormat = () => {
    const jsonFormatValue = JSON.stringify(JSON.parse(inputValue), null, 2);
    setInputValue(jsonFormatValue);
  };

  return (
    <PageContainer
      breadcrumb={undefined}
      extra={
        <Space style={{ marginBottom: 10 }}>
          <Button type="primary" onClick={handleFormat}>
            格式化JSON
          </Button>
          <Button htmlType="button" onClick={() => setInputValue('')}>
            清空
          </Button>
        </Space>
      }
    >
      <CodeMirror
        placeholder="在这里粘贴您需要格式化的JSON"
        value={inputValue}
        autoFocus
        theme="dark"
        extensions={[json()]}
        minHeight="456px"
        onChange={handleChange}
      />
    </PageContainer>
  );
};

export default JsonFormat;
