import { TableColumnsType, MenuProps, Space, Modal, Dropdown, Button } from 'antd';
import { StaffModel } from '../../models/staff';
import {
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { StaffColumn } from './column_type';

export function StaffColumns() {
  const staffColumns: TableColumnsType<StaffColumn> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return record.last_name + ' ' + record.first_name;
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number'
    },
    {
      // width: 'max-content',
      title: 'Actions',
      key: 'actions',

      align: 'center',
      render: (_, record) => {
        const handleDelete = () => {
          Modal.confirm({
            title: 'Do you really want to delete this opportunity?',
            centered: true,
            width: '500px',
            onOk: () => {
              record?.onDelete?.();
            },
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )
          });
        };

        return (
          <a onClick={() => handleDelete()}>
            <Space>
              <DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />
            </Space>
          </a>
        );
      }
    }
  ];

  return staffColumns;
}
