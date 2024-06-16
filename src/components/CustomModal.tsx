import { ButtonProps, Modal, ModalProps } from 'antd';

import React from 'react';

type Props = {
  title?: React.ReactNode;
  width?: number | string; // An optional width prop of type number or string
  open: boolean; // A required boolean prop for controlling the modal's open state
  onOk?: () => void; // An optional function prop for handling the OK action
  onCancel?: () => void; // An optional function prop for handling the Cancel action
  footer?: React.ReactNode | ModalProps['footer']; // An optional React node prop for customizing the modal's footer
  children?: React.ReactNode;
  keyboard?: boolean;
  style?: React.CSSProperties;
  className?: string;
  closeIcon?: boolean | React.ReactNode;
  closable?: boolean;
  centered?: boolean;
  cancelText?: React.ReactNode;
  okText?: React.ReactNode;
  okButtonProps?: ButtonProps;
  loading?: boolean;
};

const ModalCustom = ({
  title,
  width,
  open,
  onCancel,
  onOk,
  footer,
  children,
  keyboard = true,
  style,
  className,
  closeIcon,
  closable,
  centered,
  cancelText,
  okText,
  okButtonProps,
  loading
}: Props) => {
  return (
    <Modal
      open={open}
      title={title}
      width={width}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      keyboard={keyboard}
      style={style}
      className={className}
      closeIcon={closeIcon}
      closable={closable}
      centered={centered}
      cancelText={cancelText}
      okText={okText}
      okButtonProps={okButtonProps}
      loading={loading}
    >
      {children}
    </Modal>
  );
};

export default React.memo(ModalCustom);
