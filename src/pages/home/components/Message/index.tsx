import Valine from 'valine';

import React from 'react';

const Message = () => {
  new Valine({
    el: '#vcomments',
    // other config
    appId: 'vsB5r15jmHR98cfwla4X1Pkg-gzGzoHsz',
    appKey: 'oJsbu5ACUik8fabHxo1pbRqa',
  });
  return <div id="vcomments" />;
};

export default Message;
