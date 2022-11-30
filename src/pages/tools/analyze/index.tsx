import { Card } from 'antd';
import React from 'react';
import AnalyzeForm from './components/AnalyzeForm';

const Address = () => {
  const [compareResult, setCompareResult] = React.useState<string>('');
  const [isShowResult, setIsShowResult] = React.useState<boolean>(false);

  const analyze = async (tempurl: string) => {
    const reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    let url = tempurl || '';
    try {
      const regresult = url.match(reg);
      if (regresult && regresult.length) {
        url = regresult[0];
      }
    } catch (error) {
      return '';
    }
    console.log('提取的url:', url);
    let videourl = '';
    // 尝试解析短视频
    try {
      const res = await (await fetch(`https://api.xcboke.cn/api/juhe?url=${url}`)).json();
      console.log('短视频解析结果：', res);
      // if (res.code != 200) return false
      if (res.code == 200 && res.data.url != null) {
        videourl = res.data.url;
        if (videourl.indexOf('http') == -1) {
          videourl = 'http:'.concat(videourl);
        }
      } else if (url.includes('v.kuaishou.com')) {
        console.log('解析失败，尝试独角兽接口：', `http://ovooa.com/kuai.api?url=${url}&type=json`);
        const djsres = await (await fetch(`http://ovooa.com/kuai.api?url=${url}&type=json`)).json();
        console.log(djsres);
        if (djsres.text != '获取成功' || djsres.code != 1) {
          console.log('独角兽解析失败，放行指令.....');
        } else {
          videourl = djsres.data.url;
        }
      } else {
        // 需要解析短链接的判断
        if (url.includes('b23.tv')) {
          const restoreres = await (
            await fetch(`https://xiaobai.klizi.cn/API/other/url_restore.php?url=${url}`)
          ).json();

          console.log(restoreres);

          if (
            restoreres.code == 302 &&
            restoreres.redirect_url &&
            restoreres.redirect_url.length &&
            restoreres.redirect_url[0].indexOf('https') != -1
          ) {
            url = restoreres.redirect_url[0].split('?')[0];
          }
          console.log(url);
        }

        const xbres = await (
          await fetch(`https://xiaobai.klizi.cn/API/video/video_jx.php?url=${url}`)
        ).json();
        console.log('短视频解析结果：', xbres);
        // if (res.code != 200) return false
        if (xbres.code == 200 && xbres.data.url != null) {
          videourl = xbres.data.url;
          if (videourl.indexOf('http') == -1) {
            videourl = 'http:'.concat(videourl);
          }
        } else {
          console.log('解析失败，放行指令......');
          videourl = '';
        }
      }
    } catch (error) {
      console.log('解析失败，放行指令......');
      videourl = '';
    }

    console.log('视频地址：', videourl);
    return videourl;
  };

  const onAnalyzeFormFinish = async (values: any) => {
    console.log(values);
    const { url } = values;

    const analyzeUrl = await analyze(url);

    setCompareResult(analyzeUrl);

    setIsShowResult(true);
  };

  return (
    <>
      <Card>
        <AnalyzeForm onAnalyzeFormFinish={onAnalyzeFormFinish} />
      </Card>
      {compareResult || isShowResult ? (
        <Card title="解析结果">
          <div style={{ wordWrap: 'break-word' }}>解析后的地址为：{compareResult}</div>
        </Card>
      ) : undefined}
    </>
  );
};

export default Address;
