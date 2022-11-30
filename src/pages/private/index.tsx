import { PageContainer } from '@ant-design/pro-layout';
import { Card, Image } from 'antd';
import { useState } from 'react';
import Search from './components/SearchForm';
import categoryData from './data';

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

  const onPullClick = async (values: any) => {
    setImages([]);

    const tempidx = values.index || 0;

    const findCategory = categoryData.find((item) => item.cid == values.category);

    const randomMax = (findCategory && findCategory.max) || 500;

    const randomIndex = Math.floor(Math.random() * randomMax) + 1;

    const page = Math.ceil((tempidx || randomIndex) / 10);

    const data = await fetch(
      `https://www.ccy.moe/wp-json/wp/v2/posts?page=${page}&categories=${values.category}`,
    );

    const res = await data.json();

    if (res.code) {
      return;
    }

    // getImagesData(page).then(async (res) => {
    // const index = randomIndex % 10;
    const index = tempidx ? tempidx % 10 : randomIndex % 10;

    const content = res && res.length && res[index].content;

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
        <Search data={categoryData} onSearch={onPullClick} />

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
