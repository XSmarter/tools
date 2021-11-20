import type { FC } from 'react';
import React from 'react';

interface OtherProps {
  children: React.ReactNode;
}

const Other: FC<OtherProps> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default Other;
