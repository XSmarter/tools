import { getYSUpData } from '@/services/ant-design-pro/api';
import React, { useEffect } from 'react';

const YS = () => {
  const [upData, setUpData] = React.useState<any[]>([]);

  const getUpData = (page: number) => {
    getYSUpData(
      `?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=49763b105936b36e522abc232fb293b6c07654&timestamp=1653954782&lang=zh-cn&device_type=mobile&ext=%7b%22loc%22%3a%7b%22x%22%3a622.204345703125%2c%22y%22%3a201.72286987304688%2c%22z%22%3a209.27357482910157%7d%2c%22platform%22%3a%22Android%22%7d&game_version=CNRELAndroid2.7.0_R7169099_S7808520_D7808520&plat_type=android&region=cn_gf01&authkey=gji0G5DnH8Ccab%2fbIwtbpbwqZl8w6WmGuqtu3gS3bJDlkav%2bZbrB5b1za08e%2fsZnxZm0JY9AQGU%2fDDkKpDKHevJlVRrJG4NA16yb8JqAjoHLpjJBJut%2bfHtOqtbBKSV8ochJ0CDukyovcLAxTXFEujwOglVUNCQI%2fKOhU5r61JKvdRCVYOdbpmZoxIz8Ju81LpC2vH2gd2%2bZtZ0SBppf7HBd2VDpGbRaWlFpVcaT5vbDlP8UWHviG6ZVGje3EpDowQ51VmBCK0urbzLYyT3CZCJk0O7Was2u%2fMzsMQl%2bJIDIweuTagVpY6Y3xGf3g%2fL7YsKHTSI8mjeO2nfPcac9P1pENyKdLo14XlfR3kQ9yifHGbS%2f8PWQtS2afwO%2b2%2fr%2bEeKofwKg8SeIlseDbwjzwUAJ118eSdFoCDhsE6KKxDIgeKdrtfyg9o%2fFsMHbNrD9HL%2ffXS5R6W3te4R7KiwGfPzGOJH%2b%2briusT0k0gzLYHAaWyftRcupDgT4EEIbX71%2bQ8xNKuid8dTETK84P6zvWK35cEGJh18rtKHcz5urEmH53BIgT0HDNbmnBAvdyDlQZpySeeJhFSG0SwfEj4WuAtn%2fuJtCvqvTgBsULyT2R341wAVZllbgf2v2DxzeoHpgERww7uDdPNyqaLFL1jnWXgRzvNTgPRZqKYdyVtAacfEo12fun8OkexvwXPtTjUPSHP3KZR2%2bcj%2fCTdL7QnJTqjEKVv2Ev4%2b6fEXhY2KZ5qigtyhX%2bgoqo3E7UZ1BDz%2fSAWf1unyde3AaHsIoHj%2bWPQV3jyOSx8O8Qcri%2fXnxkMe8J%2ffUZ%2bXvrG3a0nx1CYidUTBoyEGCDqE3g1zY%2bhNLsMu4EEVLubVo1tll6N1DEn%2fIugegH0sfOaWM2OKjrqZe0yVh6LIcQZkxF4HYYLqfJufOx09N6%2b5WJs%2bG%2fhXFbzkk%2bTEb%2bWv%2b%2fzT7iyxITWpoMZFUtpGCRhFLiBPel9Kb0NPO6CPjP7u2%2bZl3sxF21ABXV1suSlV4kpxfAAcXQoc5Z6aDwrSrdeTH8DYSc%2buNkgsm2%2fwpYEZy%2bBCLXl0HGUdAFo0ZC40evVnzJsQ1NK6zQkcV2LYbUigqxoXMwUIjjRI864Y3BIWHnHl%2fMxW464s5hp0KID0qMnvvUmGbHp5qxqA1BPGOMD0gk4KGbgFCNgiNfaJT60794hy70IHLh3C201uHDVxjAiQVPKD79xKknhvrgXeZv2%2f4NAyR8rTGNGACh5%2bSrOQ0KCXpghp4hlOHooAPPFCI55K%2f76TyjDDYYAjiLUG9HUWLvUMNtZiKx1KUt8TIneA1%2bBr3z%2frrH7doNySG78ZE%2f2AFq2jR92amPmxavp5GxgT3i2HNe%2f2%2bTg%3d%3d&game_biz=hk4e_cn&gacha_type=301&page=${page}&size=10${
        page === 1 ? `&end_id=0` : `&begin_id=${upData[upData.length - 1].id}`
      }`,
    ).then((res) => {
      console.log(res);
      if (res.retcode === 0) {
        if (res.data.list && res.data.list.length) {
          setUpData((preData: any[]) => {
            return [...preData, ...res.data.list];
          });
          getUpData(page + 1);
        }
      }
    });
  };

  const getData = () => {
    getUpData(1);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div />;
};

export default YS;
