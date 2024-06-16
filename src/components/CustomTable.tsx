// CustomTable.tsx
import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface CustomTableProps<T> extends TableProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
}

const CustomTable = <T extends Record<string, any>>({
  columns,
  data,
  ...rest
}: CustomTableProps<T>) => {
  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  // };

  return (
    <div>
      <Table
        // rowSelection={{
        //   ...rowSelection,
        // }}
        columns={columns}
        dataSource={data}
        {...rest}
      />
    </div>
  );
};

export default CustomTable;
