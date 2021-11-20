import type { FC } from 'react';
import React from 'react';

interface WorkProps {
  children: React.ReactNode;
}

const Work: FC<WorkProps> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default Work;
