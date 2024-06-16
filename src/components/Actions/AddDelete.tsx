import { Flex, Tooltip } from 'antd';
import React from 'react';

type Props = {
  deleteSectionProps: React.ReactNode;
  AddSectionProps: React.ReactNode;
};

const AddDelete = ({ deleteSectionProps, AddSectionProps }: Props) => {
  return (
    <Flex
      justify={'flex-end'}
      align={'center'}
      gap={12}
    >
      <Tooltip title={'Delete'}>{deleteSectionProps}</Tooltip>
      <Tooltip title={'Add_new'}>{AddSectionProps}</Tooltip>
    </Flex>
  );
};

export default AddDelete;
