import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

type CustomSearchProps = React.ComponentProps<typeof Input.Search>;

let CustomSearch: React.FC<CustomSearchProps> = ({ ...props }) => {
  return <Input.Search {...props} />;
};

CustomSearch = styled(Input.Search)`
  .ant-input-outlined {
    height: 40px !important;
    border-right: 0 !important;
  }
  .ant-input-search-button {
    border-left: 0 !important;
  }
`;

export default CustomSearch;
