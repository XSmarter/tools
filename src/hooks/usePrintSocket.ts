import { notification, Modal, message } from 'antd';

import { useModel } from 'umi';

const isHttpsProtocol = document.location.protocol === 'https:';

/** 存放打印组件相关信息，例如：状态、打印机... */
// const printComponentMap = {
//   CN: { status: false, printersStatus: false, defaultPrinter: '', printers: [] },
//   PDD: { status: false, printersStatus: false, defaultPrinter: '', printers: [] },
// };

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

const usePrintSocket = () => {
  const {
    setPrintPreviewStatus,
    addPreviewImages,
    addPrintSuccessOrderKeys,
    setPrintPartErrorStatus,
    setOfflinePrintCompletedStatus,
    setPrintCompletedStatus,
  } = useModel('usePrint');

  let preventRepeatNotifyPrintResult = true;

  const lockReconnectObj = {
    PDD: undefined,
    CN: undefined,
    JD: undefined,
    DY: undefined,
    KS: undefined,
  };

  const ttObj = {
    PDD: undefined,
    CN: undefined,
    JD: undefined,
    DY: undefined,
    KS: undefined,
  };

  const {
    pddWebsocket,
    setPddWebsocket,
    cnWebsocket,
    setCnWebsocket,
    jdWebsocket,
    setJdWebsocket,
    dyWebsocket,
    setDyWebsocket,
    ksWebsocket,
    setKsWebsocket,
    websocketConnectCompleted,
    setWebsocketConnectCompleted,
    printComponentMap,
    setPrintComponentMap,
  } = useModel('usePrintComponentStatus');

  /**
   * 构造基础Websocket请求命令对象
   * @param cmd 命令名称
   */
  const getRequestObject = (cmd: string, pt?: string) => {
    let request;
    if (pt === 'JD') {
      request = {
        orderType: cmd,
      };
    } else {
      request = {
        requestID: getUUID(8, 16),
        version: '1.0',
        cmd,
      };
    }
    return request;
  };

  /**
   * 设置打印机相关配置
   * @param printer 打印机名称
   * @param width 纸张宽度
   * @param height 纸张高度
   * @param horizontalOffset 横向偏移量
   * @param verticalOffset 竖向偏移量
   * @param showLogo 是否打印快递公司logo
   */
  const setPrinterConfig = (
    printer: string,
    width: number,
    height: number,
    horizontalOffset: number,
    verticalOffset: number,
    showLogo: boolean,
  ) => {
    const request = getRequestObject('setPrinterConfig');
    const printerConfigRequest = {
      name: printer,
      needTopLogo: showLogo,
      needBottomLogo: showLogo,
      PrintTopLogo: showLogo,
      PrintBottomLogo: showLogo,
      horizontalOffset,
      verticalOffset,
      // autoOrientation: false,
      paperSize: {
        width,
        height,
      },
    };
    return { ...request, printer: printerConfigRequest };
  };

  /** 通过打印组件获取打印机列表信息 */
  const getPrinters = (ws: WebSocket, pt: string) => {
    let request;

    if (pt === 'JD') {
      request = getRequestObject('GET_Printers', pt);
    } else {
      request = getRequestObject('getPrinters', pt);
    }

    ws.send(JSON.stringify(request));
  };

  /** 设置打印任务失败时是否需要通知，当前状态为失败后不通知 */
  const setGlobalConfig = (ws: WebSocket, pt: string) => {
    const request = getRequestObject('setGlobalConfig');
    const taskFailure =
      pt === 'CN' || pt === 'KS' ? { notifyOnTaskFailure: false } : { TaskFailedNotify: false };
    ws.send(JSON.stringify({ ...request, ...taskFailure }));
  };

  /**
   * 初始化不同平台打印组件webSocket连接...
   * @param platform 平台
   */
  const initPrintComponentWebSocket = (platform: string, tempWsUrl?: string): WebSocket => {
    // 各个平台WebSocket属性定义
    const platformObj = {
      CN: {
        url: 'localhost',
        port: 13528,
        wssPort: 13529,
      },
      PDD: {
        url: 'localhost',
        port: 5000,
        wssPort: 18653,
      },
      JD: {
        url: 'localhost',
        port: 9113,
        wssPort: 9114,
      },
      DY: {
        url: 'localhost',
        port: 13888,
        wssPort: 13999,
      },
      KS: {
        url: 'localhost',
        port: 16888,
      },
    };

    /**
     * 集中处理WebSocket接收到的消息
     * @param event WebSocket接收到的消息
     * @param platform 平台
     */
    const onWebSocketMessageHandle = (event: MessageEvent, pt: string): void => {
      const { data } = event;
      const cmdData = JSON.parse(data);

      console.log('socket onmessage');
      console.log(cmdData);

      if (pt === 'JD') {
        const { content } = cmdData;
        if (cmdData.code === '6') {
          preventRepeatNotifyPrintResult = true;

          const printNames = content.split(',');

          const printers: { name: string }[] = [];
          if (printNames && printNames.length) {
            printNames.map((item: string) => {
              printers.push({ name: item });
              return item;
            });
          }

          setPrintComponentMap((prevPrintComponentMap: any) => {
            return {
              ...prevPrintComponentMap,
              [pt]: {
                ...prevPrintComponentMap[platform],
                defaultPrinter: '',
                printers: printers || [],
                printersStatus: true,
              },
            };
          });
        } else if (cmdData.code === '8') {
          preventRepeatNotifyPrintResult = true;
          addPreviewImages([`data:image/png;base64, ${cmdData.content}`]);
          setTimeout(() => {
            Modal.destroyAll();
            setPrintPreviewStatus(true);
          }, 1000);
        } else if (cmdData.code === '2') {
          if (cmdData.success === 'false') {
            setTimeout(() => {
              Modal.destroyAll();
              notification.error({
                message: '打印失败',
                description: `失败原因：${cmdData.content}`,
              });
            }, 1000);
          } else {
            console.log(`接收打印任务完成时间戳：${new Date().getTime()}`);
            preventRepeatNotifyPrintResult = true;
            const progressArr = cmdData.key.split('_');
            // if (cmdData.key.indexOf('SHIP') !== -1 || cmdData.key.indexOf('PARTERROR') !== -1) {
            //   if (cmdData.printStatus.length) {
            //     const ids: string[] = [];
            //     const tids: string[] = [];
            //     let gid = '';
            //     let packageNum = 0;
            //     cmdData.printStatus.map((item: { documentID: string; status: string }) => {
            //       const { documentID, status } = item;
            //       if (documentID.indexOf('^') !== -1 && status === 'success') {
            //         const [tid, groupId, packageNumber, id] = documentID.split('^');
            //         if (id !== 'undefined') {
            //           ids.push(`${tid.split('#')[0]}-${id}`);
            //         }
            //         tids.push(tid);
            //         gid = groupId;
            //         packageNum = Number(packageNumber);
            //       }
            //       return item;
            //     });
            //     const printResultParams = {
            //       tids,
            //       gid,
            //       packageNum,
            //       preview: Boolean(cmdData.previewURL),
            //     };
            //     const newIds = new Set(ids);

            //     addPrintSuccessOrderKeys(Array.from(newIds));

            //     modifyPrintStatus(printResultParams);
            //   }
            // }

            if (
              cmdData.key.indexOf('PARTERROR') !== -1 ||
              cmdData.key.indexOf('PARTOFFLINEERROR') !== -1
            ) {
              setTimeout(() => {
                Modal.destroyAll();
                setPrintPartErrorStatus(true);
              }, 1000);
              return;
            }

            if (progressArr[1] === progressArr[2] && preventRepeatNotifyPrintResult) {
              setTimeout(() => {
                Modal.destroyAll();
                if (cmdData.key.indexOf('SHIP') !== -1 || cmdData.key.indexOf('SCAN') !== -1) {
                  setPrintCompletedStatus(true);
                } else if (cmdData.key.indexOf('OFFLINE-UNPRINT') !== -1) {
                  setOfflinePrintCompletedStatus(true);
                } else if (cmdData.key.indexOf('OFFLINE-PRINTED') !== -1) {
                  setOfflinePrintCompletedStatus(true);
                }
                if (cmdData.key.indexOf('SCAN') === -1) {
                  message.success('打印完成');
                }
              }, 1000);
              preventRepeatNotifyPrintResult = false;
            }
          }

          return;
        }
      }

      /** 打印组件接收到获取打印机列表命令时处理逻辑 */
      if (cmdData.cmd === 'getPrinters') {
        preventRepeatNotifyPrintResult = true;
        setPrintComponentMap((prevPrintComponentMap: any) => {
          return {
            ...prevPrintComponentMap,
            [pt]: {
              ...prevPrintComponentMap[platform],
              defaultPrinter: cmdData.defaultPrinter || '',
              printers: cmdData.printers || [],
              printersStatus: true,
            },
          };
        });
      } else if (cmdData.cmd === 'print') {
        preventRepeatNotifyPrintResult = true;
        if (cmdData.status === 'success') {
          if (cmdData.previewImage) {
            const progressArr = cmdData.taskID.split('_');

            addPreviewImages(cmdData.previewImage);
            if (progressArr.length && progressArr[progressArr.length - 1] === '1') {
              setTimeout(() => {
                Modal.destroyAll();
                setPrintPreviewStatus(true);
              }, 1000);
            }
          }
        } else if (cmdData.responses && cmdData.responses.length) {
          const progressArr = cmdData.taskID.split('_');

          const images: string[] = [];
          cmdData.responses.map((item: { urls: string[] }) => {
            images.push(...item.urls);
            return item;
          });

          addPreviewImages(images);
          if (progressArr.length && progressArr[progressArr.length - 1] === '1') {
            setTimeout(() => {
              Modal.destroyAll();
              setPrintPreviewStatus(true);
            }, 1000);
          }
        } else {
          setTimeout(() => {
            Modal.destroyAll();
            notification.error({ message: '打印失败', description: `失败原因：${cmdData.msg}` });
          }, 1000);
        }
      } else if (cmdData.cmd === 'PrintResultNotify') {
        if (cmdData.taskStatus === 'printed') {
          console.log(`接收打印任务完成时间戳：${new Date().getTime()}`);
          const progressArr = cmdData.taskID.split('_');
          if (cmdData.previewURL) {
            addPreviewImages([cmdData.previewURL]);
            if (progressArr.length && progressArr[progressArr.length - 1] === '1') {
              setTimeout(() => {
                Modal.destroyAll();
                setPrintPreviewStatus(true);
              }, 1000);
            }
            return;
          }

          if (cmdData.taskID.indexOf('SHIP') !== -1 || cmdData.taskID.indexOf('PARTERROR') !== -1) {
            if (cmdData.printStatus.length) {
              const ids: string[] = [];
              const tids: string[] = [];
              cmdData.printStatus.map((item: { documentID: string; status: string }) => {
                const { documentID, status } = item;
                if (documentID.indexOf('^') !== -1 && status === 'success') {
                  const [tid, id] = documentID.split('^');
                  if (id !== 'undefined') {
                    ids.push(`${tid.split('#')[0]}-${id}`);
                  }
                  tids.push(tid);
                }
                return item;
              });
              const newIds = new Set(ids);

              addPrintSuccessOrderKeys(Array.from(newIds));
            }
          }

          if (
            cmdData.taskID.indexOf('PARTERROR') !== -1 ||
            cmdData.taskID.indexOf('PARTOFFLINEERROR') !== -1
          ) {
            setTimeout(() => {
              Modal.destroyAll();
              setPrintPartErrorStatus(true);
            }, 1000);
            return;
          }

          if (progressArr[1] === progressArr[2] && preventRepeatNotifyPrintResult) {
            setTimeout(() => {
              Modal.destroyAll();
              if (cmdData.taskID.indexOf('SHIP') !== -1 || cmdData.taskID.indexOf('SCAN') !== -1) {
                setPrintCompletedStatus(true);
              } else if (cmdData.taskID.indexOf('OFFLINE-UNPRINT') !== -1) {
                setOfflinePrintCompletedStatus(true);
              } else if (cmdData.taskID.indexOf('OFFLINE-PRINTED') !== -1) {
                setOfflinePrintCompletedStatus(true);
              }
              if (cmdData.taskID.indexOf('SCAN') === -1) {
                message.success('打印完成');
              }
            }, 1000);
            preventRepeatNotifyPrintResult = false;
          }
          //  else if (cmdData.taskStatus === 'failed') {
          //   notification.error({ message: '打印失败' });
          // }
        }
      } else if (cmdData.cmd === 'notifyPrintResult') {
        //  || cmdData.taskStatus === 'printed'
        if (
          cmdData.taskStatus === 'rendered' ||
          (platform === 'DY' && cmdData.taskStatus === 'printed') ||
          (platform === 'KS' &&
            (cmdData.taskStatus === 'printed' || cmdData.taskStatus === 'partPrinted'))
        ) {
          console.log(`接收打印任务完成时间戳：${new Date().getTime()}`);

          if (platform === 'DY') {
            preventRepeatNotifyPrintResult = true;
          }

          const progressArr = cmdData.taskID.split('_');

          if (cmdData.taskID.indexOf('SHIP') !== -1 || cmdData.taskID.indexOf('PARTERROR') !== -1) {
            if (cmdData.printStatus.length) {
              const ids: string[] = [];
              const tids: string[] = [];
              cmdData.printStatus.map((item: { documentID: string; status: string }) => {
                const { documentID, status } = item;
                if (documentID.indexOf('^') !== -1 && status === 'success') {
                  const [tid, id] = documentID.split('^');
                  if (id !== 'undefined') {
                    ids.push(`${tid.split('#')[0]}-${id}`);
                  }

                  tids.push(tid);
                }
                return item;
              });
              const newIds = new Set(ids);

              addPrintSuccessOrderKeys(Array.from(newIds));
            }
          }

          if (
            cmdData.taskID.indexOf('PARTERROR') !== -1 ||
            cmdData.taskID.indexOf('PARTOFFLINEERROR') !== -1
          ) {
            setTimeout(() => {
              Modal.destroyAll();
              setPrintPartErrorStatus(true);
            }, 1000);
            return;
          }

          if (progressArr[1] === progressArr[2] && preventRepeatNotifyPrintResult) {
            setTimeout(() => {
              Modal.destroyAll();
              if (cmdData.taskID.indexOf('SHIP') !== -1 || cmdData.taskID.indexOf('SCAN') !== -1) {
                setPrintCompletedStatus(true);
              } else if (cmdData.taskID.indexOf('OFFLINE-UNPRINT') !== -1) {
                setOfflinePrintCompletedStatus(true);
              } else if (cmdData.taskID.indexOf('OFFLINE-PRINTED') !== -1) {
                setOfflinePrintCompletedStatus(true);
              }
              if (cmdData.taskID.indexOf('SCAN') === -1) {
                message.success('打印完成');
              }
            }, 1000);
            preventRepeatNotifyPrintResult = false;
          }
        } else if (cmdData.taskStatus === 'failed') {
          notification.error({ message: '打印失败' });
        }
      }
    };

    const extUrl = () => {
      if (platform === 'JD' && isHttpsProtocol) {
        return '/print';
      }

      if (platform === 'KS') {
        return '/ks/printer';
      }

      return '';
    };

    // 根据平台和端口组装WebSocket通讯地址
    const wsUrl = `${
      (isHttpsProtocol && platform !== 'KS' ? 'wss://' : 'ws://') + platformObj[platform].url
    }:${
      isHttpsProtocol && platform !== 'KS'
        ? platformObj[platform].wssPort
        : platformObj[platform].port
    }${extUrl()}`;

    // 创建WebSocket对象及相关实现属性
    const ws = new WebSocket(tempWsUrl || wsUrl);
    ws.onopen = () => {
      setPrintComponentMap((prevPrintComponentMap: any) => {
        return {
          ...prevPrintComponentMap,
          [platform]: { ...prevPrintComponentMap[platform], status: true },
        };
      });
      setWebsocketConnectCompleted((prevWebsocketConnectCompleted: any) => {
        return {
          ...prevWebsocketConnectCompleted,
          [platform]: { completed: true },
        };
      });
      setTimeout(() => {
        // 调用获取打印机列表的方法
        getPrinters(ws, platform);
      }, 200);
      // if (platform === 'PDD') {
      //   setTimeout(() => {
      //     // 调用获取打印机列表的方法
      //     getPrinters(ws, platform);
      //   }, 200);
      // } else if (platform === 'CN') {
      //   setTimeout(() => {
      //     // 调用获取打印机列表的方法
      //     getPrinters(ws, platform);
      //   }, 200);
      // } else if (platform === 'JD') {
      //   setTimeout(() => {
      //     // 调用获取打印机列表的方法
      //     getPrinters(ws, platform);
      //   }, 200);
      // } else {
      //   setTimeout(() => {
      //     // 调用获取打印机列表的方法
      //     getPrinters(ws, platform);
      //   }, 200);
      // }
      if (platform !== 'JD') {
        setGlobalConfig(ws, platform);
      }
    };
    ws.onmessage = (event: MessageEvent) => {
      onWebSocketMessageHandle(event, platform);
    };
    ws.onclose = () => {
      setPrintComponentMap((prevPrintComponentMap: any) => {
        return {
          ...prevPrintComponentMap,
          [platform]: { ...prevPrintComponentMap[platform], status: false },
        };
      });

      setWebsocketConnectCompleted((prevWebsocketConnectCompleted: any) => {
        return {
          ...prevWebsocketConnectCompleted,
          [platform]: { completed: true },
        };
      });

      /** socket错误/关闭后重连机制 */
      if (lockReconnectObj[platform]) {
        return;
      }
      lockReconnectObj[platform] = true;
      if (ttObj[platform]) {
        clearTimeout(ttObj[platform]);
      }
      ttObj[platform] = setTimeout(() => {
        setWebsocketConnectCompleted((prevWebsocketConnectCompleted: any) => {
          return {
            ...prevWebsocketConnectCompleted,
            [platform]: { completed: false },
          };
        });
        if (platform === 'PDD') {
          const tempPddWebsocket = initPrintComponentWebSocket('PDD');
          setPddWebsocket(tempPddWebsocket);
        }
        if (platform === 'CN') {
          const tempCnWebsocket = initPrintComponentWebSocket('CN');
          setCnWebsocket(tempCnWebsocket);
        }
        if (platform === 'JD') {
          const tempJdWebsocket = initPrintComponentWebSocket('JD');
          setJdWebsocket(tempJdWebsocket);
        }
        if (platform === 'DY') {
          const tempDyWebsocket = initPrintComponentWebSocket('DY');
          setDyWebsocket(tempDyWebsocket);
        }
        if (platform === 'KS') {
          const tempKsWebsocket = initPrintComponentWebSocket('KS');
          setKsWebsocket(tempKsWebsocket);
        }
        lockReconnectObj[platform] = false;
      }, 4000);
    };
    ws.onerror = () => {
      setPrintComponentMap((prevPrintComponentMap: any) => {
        return {
          ...prevPrintComponentMap,
          [platform]: { ...prevPrintComponentMap[platform], status: false },
        };
      });

      setWebsocketConnectCompleted((prevWebsocketConnectCompleted: any) => {
        return {
          ...prevWebsocketConnectCompleted,
          [platform]: { completed: true },
        };
      });

      /** socket错误/关闭后重连机制 */
      if (lockReconnectObj[platform]) {
        return;
      }
      lockReconnectObj[platform] = true;
      if (ttObj[platform]) {
        clearTimeout(ttObj[platform]);
      }
      ttObj[platform] = setTimeout(() => {
        setWebsocketConnectCompleted((prevWebsocketConnectCompleted: any) => {
          return {
            ...prevWebsocketConnectCompleted,
            [platform]: { completed: false },
          };
        });
        if (platform === 'PDD') {
          const tempPddWebsocket = initPrintComponentWebSocket('PDD');
          setPddWebsocket(tempPddWebsocket);
        }
        if (platform === 'CN') {
          const tempCnWebsocket = initPrintComponentWebSocket('CN');
          setCnWebsocket(tempCnWebsocket);
        }
        if (platform === 'JD') {
          const tempJdWebsocket = initPrintComponentWebSocket('JD');
          setJdWebsocket(tempJdWebsocket);
        }
        if (platform === 'DY') {
          const tempDyWebsocket = initPrintComponentWebSocket('DY');
          setDyWebsocket(tempDyWebsocket);
        }
        if (platform === 'KS') {
          const tempKsWebsocket = initPrintComponentWebSocket('KS');
          setKsWebsocket(tempKsWebsocket);
        }
        lockReconnectObj[platform] = false;
      }, 4000);
    };
    return ws;
  };

  /** websocket 连接 */
  const websocketConnect = (platCode: string, wsUrl?: string) => {
    setWebsocketConnectCompleted((prevWebsocketConnectCompleted: any) => {
      return {
        ...prevWebsocketConnectCompleted,
        [platCode]: { completed: false },
      };
    });
    if (platCode === 'PDD') {
      const tempPddWebsocket = initPrintComponentWebSocket('PDD', wsUrl);
      setPddWebsocket(tempPddWebsocket);
    }
    if (platCode === 'CN') {
      const tempCnWebsocket = initPrintComponentWebSocket('CN', wsUrl);
      setCnWebsocket(tempCnWebsocket);
    }
    if (platCode === 'JD') {
      const tempJdWebsocket = initPrintComponentWebSocket('JD', wsUrl);
      setJdWebsocket(tempJdWebsocket);
    }
    if (platCode === 'DY') {
      const tempDyWebsocket = initPrintComponentWebSocket('DY', wsUrl);
      setDyWebsocket(tempDyWebsocket);
    }
    if (platCode === 'KS') {
      const tempKsWebsocket = initPrintComponentWebSocket('KS', wsUrl);
      setKsWebsocket(tempKsWebsocket);
    }
  };

  const websocketSend = (
    platCode: string,
    data: string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView,
  ) => {
    console.log(`接受打印任务，平台：${platCode}`);
    console.log(data);
    if (platCode === 'CN' && cnWebsocket) {
      cnWebsocket.send(data);
    }
    if (platCode === 'PDD' && pddWebsocket) {
      pddWebsocket.send(data);
    }
    if (platCode === 'JD' && jdWebsocket) {
      jdWebsocket.send(data);
    }
    if (platCode === 'DY' && dyWebsocket) {
      dyWebsocket.send(data);
    }
    if (platCode === 'KS' && ksWebsocket) {
      ksWebsocket.send(data);
    }
  };

  return {
    websocketConnectCompleted,
    printComponentMap,
    getRequestObject,
    setPrinterConfig,
    getPrinters,
    setGlobalConfig,
    websocketConnect,
    websocketSend,
  };
};

export default usePrintSocket;
