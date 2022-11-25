import { getImagesData } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Image } from 'antd';
import { useState } from 'react';

const Images = () => {
  const [images, setImages] = useState<string[]>([]);

  const getImages = (string: string) => {
    const tempImages = [];
    const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
    let img;
    while ((img = imgRex.exec(string))) {
      tempImages.push(encodeURI(img[1]));
    }
    return tempImages;
  };

  const onPullClick = async () => {
    const randomMax = 500;

    const randomIndex = Math.floor(Math.random() * randomMax) + 1;

    const page = Math.ceil(randomIndex / 10);

    getImagesData(page).then(async (res) => {
      const index = randomIndex % 10;

      const content = res[index].content;

      const tempImages = getImages(content.rendered);

      console.log(tempImages);

      const buffers: string[] = [];
      // await (tempImages &&
      //   tempImages.map(async (item) => {
      //     const responseBuffer = await window.fetch(item, {
      //       headers: { 'referer:': 'https://www.ccy.moe/' },
      //     });

      //     const temp = await responseBuffer.arrayBuffer();
      //     const blob = new Blob([temp], { type: 'image/*' }); // 常用资源类型 1，image/* 2，video/* 3，audio/*
      //     buffers.push(URL.createObjectURL(blob));
      //   }));

      const responseBuffer = await window.fetch(tempImages[0], {
        headers: { 'referer:': 'https://www.ccy.moe/' },
      });

      const temp = await responseBuffer.arrayBuffer();
      const blob = new Blob([temp], { type: 'image/*' }); // 常用资源类型 1，image/* 2，video/* 3，audio/*
      buffers.push(URL.createObjectURL(blob));

      console.log(buffers);

      setImages(buffers);
    });
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Card>
        <Button onClick={onPullClick}>Pull</Button>

        <div style={{ marginTop: '15px' }}>
          <Image.PreviewGroup>
            {images && images.map((item) => <Image key={item} width={200} src={item} />)}
          </Image.PreviewGroup>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Images;
