import type { FC, PropsWithChildren } from 'react';

type Props = {
  classes?: string;
};

const Container: FC<PropsWithChildren<Props>> = ({
  children,
  classes = '',
}) => (
  <div className={'max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 '.concat(classes)}>
    {children}
  </div>
);

export default Container;
