import { PageContainer } from '@ant-design/pro-layout';
import { Form } from 'antd';
import React from 'react';
import InputForm from './components/InputForm';

const standard = {
  A: '01',
  B: '1000',
  C: '1010',
  D: '100',
  E: '0',
  F: '0010',
  G: '110',
  H: '0000',
  I: '00',
  J: '0111',
  K: '101',
  L: '0100',
  M: '11',
  N: '10',
  O: '111',
  P: '0110',
  Q: '1101',
  R: '010',
  S: '000',
  T: '1',
  U: '001',
  V: '0001',
  W: '011',
  X: '1001',
  Y: '1011',
  Z: '1100',
  '0': '11111',
  '1': '01111',
  '2': '00111',
  '3': '00011',
  '4': '00001',
  '5': '00000',
  '6': '10000',
  '7': '11000',
  '8': '11100',
  '9': '11110',
  '.': '010101',
  ',': '110011',
  '?': '001100',
  "'": '011110',
  '!': '101011',
  '/': '10010',
  '(': '10110',
  ')': '101101',
  '&': '01000',
  ':': '111000',
  ';': '101010',
  '=': '10001',
  '+': '01010',
  '-': '100001',
  _: '001101',
  '"': '010010',
  $: '0001001',
  '@': '011010',
};

const Endecode = () => {
  const [form] = Form.useForm();

  /** 摩斯密码 start */
  const unicodeHexMorse = (ch: string) => {
    const r = [];
    for (let i = 0; i < ch.length; i++) r[i] = ('00' + ch.charCodeAt(i).toString(16)).slice(-4);
    let str = r.join('');
    str = parseInt(str, 16).toString(2);
    return str;
  };

  const _encode = (morse: string) => {
    const option = ['/', '.', '-'];
    const tempMorse = [];
    const morseArr = morse.replace(/\s+/g, '').toLocaleUpperCase().split('');
    let ch, r;
    for (let i = 0, l = morseArr.length; i < l; i++) {
      ch = morseArr[i];
      r = standard[ch];
      if (!r) r = unicodeHexMorse(ch);
      tempMorse.push(r.replace(/0/g, option[1]).replace(/1/g, option[2]));
    }
    return tempMorse.join(option[0]);
  };

  const morseHexUnicode = (mor: string) => {
    const tempMor = parseInt(mor, 2);
    if (isNaN(tempMor)) return '';
    return unescape('%u' + tempMor.toString(16));
  };
  const _decode = (morse: string) => {
    const standardReverse = {};
    for (const key in standard) {
      standardReverse[standard[key]] = key;
    }
    const option = ['/', '.', '-'];
    const msg = [];
    const morseArr = morse.split(option[0]);
    let mor, r;
    for (let i = 0, l = morseArr.length; i < l; i++) {
      mor = morseArr[i]
        .replace(/\s+/g, '')
        .replace(new RegExp('\\' + option[1], 'g'), '0')
        .replace(new RegExp('\\' + option[2], 'g'), '1');
      r = standardReverse[mor];
      if (!r) r = morseHexUnicode(mor);
      msg.push(r);
    }
    return msg.join('');
  };
  /** 摩斯密码 end */

  const onInputFormFinish = (values: any) => {
    if (values.type === 'morseEncode') {
      const output = _encode(values.inputValue);
      form.setFieldsValue({ outputValue: output });
      return;
    }
    if (values.type === 'urlEncode') {
      const output = encodeURI(values.inputValue);
      form.setFieldsValue({ outputValue: output });
      return;
    }

    if (values.type === 'unicodeEncode') {
      const res = [];
      for (let i = 0; i < values.inputValue.length; i++) {
        res[i] = ('00' + values.inputValue.charCodeAt(i).toString(16)).slice(-4);
      }
      form.setFieldsValue({ outputValue: '\\u' + res.join('\\u') });
      return;
    }

    if (values.type === 'morseDecode') {
      const output = _decode(values.inputValue);
      form.setFieldsValue({ outputValue: output });
      return;
    }
    if (values.type === 'urlDecode') {
      const output = decodeURI(values.inputValue);
      form.setFieldsValue({ outputValue: output });
      return;
    }
    if (values.type === 'unicodeDecode') {
      const output = unescape(values.inputValue.replace(/\\u/gi, '%u'));
      form.setFieldsValue({ outputValue: output });
      return;
    }
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <InputForm form={form} onInputFormFinish={onInputFormFinish} />
    </PageContainer>
  );
};

export default Endecode;
