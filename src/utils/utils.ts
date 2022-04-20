/**
 * 获取请求的UUID，指定长度和进制
 * @example
 * getUUID(8, 2) => "01001010" | getUUID(8, 10) => "47473046" | getUUID(8, 16) => "098F4D35"
 * @param len 长度
 * @param radix 进制
 */
const getUUID = (len: number, radix: number): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  const radixTemp = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i += 1) uuid[i] = chars[0 | (Math.random() * radixTemp)];
  } else {
    let r;
    // eslint-disable-next-line no-multi-assign
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i + 1) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

const randomColors = (): string[] => {
  const colorArr = [
    '#7f4ffe',
    '#cb2400',
    '#009fc7',
    '#006ed4',
    '#443eff',
    '#e7ab1f',
    '#3caa32',
    '#f54054',
  ];
  return colorArr.sort(() => Math.random() - 0.5);

  // const r = Math.floor(Math.random() * 256);
  // const g = Math.floor(Math.random() * 256);
  // const b = Math.floor(Math.random() * 256);
  // return `rgb(${r},${g},${b})`;
};

export { getUUID, randomColors };
