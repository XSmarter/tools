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

    const data = await fetch(
      `https://www.ccy.moe/wp-json/wp/v2/posts?page=${page}&categories=4725`,
    );

    const res = await data.json();

    // getImagesData(page).then(async (res) => {
    const index = randomIndex % 10;

    const content = res[index].content;

    const tempImages = getImages(content.rendered);

    // const buffers: string[] = [];

    for (let idx = 0; idx < tempImages.length; idx++) {
      const element = tempImages[idx];
      const responseBuffer = await fetch(`http://82.157.201.25:8081/img?url=${element}`);

      const temp = await responseBuffer.arrayBuffer();
      const blob = new Blob([temp], { type: 'image/*' }); // 常用资源类型 1，image/* 2，video/* 3，audio/*
      // buffers.push(URL.createObjectURL(blob));

      setImages((prevImages) => {
        return [...prevImages, URL.createObjectURL(blob)];
      });
    }

    // setImages(buffers);
    // });
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
