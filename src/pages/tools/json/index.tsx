import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import { json } from '@codemirror/lang-json';
import { Button, Modal, Space } from 'antd';

const JsonFormat = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleFormat = () => {
    try {
      const jsonstr = decodeURIComponent(
        encodeURIComponent(JSON.stringify(eval('(' + inputValue + ')'))),
      );
      const jsonFormatValue = JSON.stringify(JSON.parse(jsonstr), null, 2);
      // const jsonFormatValue = JSON.stringify(JSON.parse(inputValue), null, 2);
      setInputValue(jsonFormatValue);
    } catch (error) {
      Modal.error({
        title: '格式化失败',
        content: '请检查您输入的JSON格式是否正确',
      });
    }
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
