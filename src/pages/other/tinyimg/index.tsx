import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Upload, Modal } from 'antd';
import type { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React from 'react';
import TinyimgSettingForm from './components/TinyimgSettingForm';

const Tinyimg = () => {
  const [fileList, setFileList] = React.useState<any[]>([]);

  const [fileSizeInfo, setFileSizeInfo] = React.useState<string>('');

  const [outputFileSizeInfo, setOutputFileSizeInfo] = React.useState<string>('');

  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  // const [uploadFile, setUploadFile] = React.useState<RcFile | undefined>(undefined);

  // const [outPutFile, setOutputFile] = React.useState<Blob | undefined>(undefined);

  const formatSize = (size: number, len?: number, units?: string[]) => {
    let unit;
    let tempSize = size;
    const tempUnits = units || ['B', 'K', 'M', 'G', 'TB'];
    while ((unit = tempUnits.shift()) && tempSize > 1024) {
      tempSize = tempSize / 1024;
    }
    return (unit === 'B' ? tempSize : tempSize.toFixed(len === undefined ? 2 : len)) + (unit || '');
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
    if (info.fileList && info.fileList.length && info.fileList[0].originFileObj) {
      console.log(info.fileList[0].originFileObj);

      setFileSizeInfo(formatSize(info.fileList[0].originFileObj.size));
    } else {
      setFileSizeInfo('');
    }
  };

  const handleBeforeUpload = (file: RcFile) => {
    // setUploadFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = document.querySelector('#img_input') as HTMLImageElement;
      image.src = reader.result as string;
      image.onload = () => {
        const w = image.width;
        const h = image.height;
        setWidth(w);
        setHeight(h);
        console.log('宽高：', w, h);
      };
    };
    return true;
  };

  const compress = (values: any) => {
    const inputImg = document.querySelector('#img_input') as HTMLImageElement;
    const w = parseInt(values.width);
    const h = parseInt(values.height);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.setAttribute('width', `${w}`);
    canvas.setAttribute('height', `${h}`);
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(inputImg, 0, 0, w, h);
    let quality = values.quality;
    if (quality) {
      quality = parseInt(quality) / 100;
    }
    const base64 = canvas.toDataURL('image/jpeg', quality);
    const bytes = window.atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    const blob = new Blob([ab], {
      type: 'image/jpeg',
    });
    return [base64, blob];
  };

  const onTinyimgSettingFormFinish = (values: any) => {
    if (!fileList.length) {
      Modal.error({
        title: '提示',
        content: '请先上传图片',
      });
      return;
    }

    new Promise(function (resolve) {
      setTimeout(function () {
        resolve(compress(values));
      }, 50);
    }).then(function (e: any) {
      const image = document.querySelector('#img_output') as HTMLImageElement;
      console.log(e[0]);
      image.src = e[0];
      // setOutputFile(e[1]);
      setOutputFileSizeInfo(formatSize(e[1].size));
    });
    // }

    console.log(fileList[0].originFileObj);
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Card title="选择图片上传" style={{ marginBottom: 10 }}>
        <Upload
          listType="picture-card"
          maxCount={1}
          fileList={fileList}
          beforeUpload={handleBeforeUpload}
          onChange={handleChange}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
        <div>文件大小：{fileSizeInfo}</div>
        <img style={{ display: 'none' }} id="img_input" />
      </Card>
      <Card title="调整参数" style={{ marginBottom: 10 }}>
        <TinyimgSettingForm
          width={width}
          height={height}
          onTinyimgSettingFormFinish={onTinyimgSettingFormFinish}
        />
      </Card>

      <Card title="预览">
        <img id="img_output" />
        <div>文件大小：{outputFileSizeInfo}</div>
      </Card>
    </PageContainer>
  );
};

export default Tinyimg;
