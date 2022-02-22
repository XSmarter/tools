import { request } from 'umi';

export async function getNews() {
  return request<any>(
    'https://api.tianapi.com/topnews/index?key=b342d31a31eaf732ec37830ed2c290f1&page=' +
      Math.floor(Math.random() * 10),
    {
      method: 'get',
    },
  );
}
