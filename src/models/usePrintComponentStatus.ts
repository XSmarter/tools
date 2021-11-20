import { useState } from 'react';

type ComponentPrinter = {
  name: string;
  status: string;
  type: string;
};

// 打印组件项
export type Printer = {
  status: boolean;
  defaultPrinter: string;
  printersStatus?: boolean;
  printers: ComponentPrinter[];
};

type PrintComponentMap = Record<string, Printer>;

const usePrintComponentStatus = () => {
  const [pddWebsocket, setPddWebsocket] = useState<WebSocket | undefined>(undefined);

  const [cnWebsocket, setCnWebsocket] = useState<WebSocket | undefined>(undefined);

  const [jdWebsocket, setJdWebsocket] = useState<WebSocket | undefined>(undefined);

  const [dyWebsocket, setDyWebsocket] = useState<WebSocket | undefined>(undefined);

  const [ksWebsocket, setKsWebsocket] = useState<WebSocket | undefined>(undefined);

  const [websocketConnectCompleted, setWebsocketConnectCompleted] = useState<any>({
    CN: { completed: false },
    PDD: { completed: false },
    JD: { completed: false },
    DY: { completed: false },
    KS: { completed: false },
  });

  const [printComponentMap, setPrintComponentMap] = useState<PrintComponentMap>({
    CN: { status: false, printersStatus: false, defaultPrinter: '', printers: [] },
    PDD: { status: false, printersStatus: false, defaultPrinter: '', printers: [] },
    JD: { status: false, printersStatus: false, defaultPrinter: '', printers: [] },
    DY: { status: false, printersStatus: false, defaultPrinter: '', printers: [] },
    KS: { status: false, printersStatus: false, defaultPrinter: '', printers: [] },
  });

  return {
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
  };
};

export default usePrintComponentStatus;
