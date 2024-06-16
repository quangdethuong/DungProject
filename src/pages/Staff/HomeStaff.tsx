import { useCallback, useEffect, useState } from 'react';
import CustomTable from '../../components/CustomTable';
import { MinusOutlined, PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { StaffColumn } from './column_type';
import { StaffColumns } from './useGenerateColumn';
import UpdateModal from './update/modal';
import { StaffModel } from '../../models/staff';
import fetchStaffs from '../../services/Staff/getStaffApi';
import AddDelete from '../../components/Actions/AddDelete';
import AddModal from './add/modal';
import { Button, Flex, notification } from 'antd';
import CustomModal from '../../components/CustomModal';
import { deleteStaffsApi } from '../../services/Staff/deleteStaffApi';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { AxiosInstance } from 'axios';
import { http } from '../../utils/config';
import CustomSearch from '../../components/CustomSearch';
import Search from 'antd/es/input/Search';

type Props = {};

// mockup

const HomeStaff = (props: Props) => {
  const [formModal, setFormModal] = useState<StaffColumn>();
  const [updateState, setUpdateState] = useState<boolean>(false);
  const [createState, setCreateState] = useState<boolean>(false);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [staffs, setStaffs] = useState<StaffColumn[] | []>([]);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `Delete ${status}`,
      placement,
      duration: 2
    });
  };

  const fetchStaffsFunction = useCallback(async (http: AxiosInstance) => {
    try {
      const responseData = await fetchStaffs(http);
      setStaffs(responseData as StaffModel[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API Subscription:', error);
      setIsFetching(false);
    }
  }, []);
  useEffect(() => {
    fetchStaffsFunction(http);
  }, [fetchStaffsFunction, formModal]);

  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedStaffs, setDeleteStaffs] = useState<React.Key[]>([]);
  const handleDetails = async (record: StaffColumn) => {
    setFormModal(record);
    setUpdateState(true);
  };
  const handleDelete = (id: string) => {
    deleteStaff(id).then(res => {
      if (res) openNotification('top', `Delete Success`, 'success');
    });
  };
  const deleteStaff = async (id?: string) => {
    try {
      await deleteStaffsApi(id);

      fetchStaffsFunction(http);
      return true;
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
      return false;
      //openNotification('top', `Delete Success`, 'error');
    }
  };

  const deleteMultiple = async () => {
    const results = await Promise.all(
      deletedStaffs.map(item => deleteStaff(item.toString()))
    );
    const allSuccess = results.every(result => result);

    if (allSuccess) {
      openNotification('top', `All items deleted successfully`, 'success');
    } else {
      openNotification('top', `Some items failed to delete`, 'error');
    }
    setDeleteState(false);
    setDeleteBtnState(true);
  };

  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: StaffModel[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeleteStaffs(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  return (
    <>
      {contextHolder}
      <Flex
        align='center'
        justify='space-between'
        style={{ marginBottom: '1rem' }}
      >
        <Search
          placeholder={'Search here'}
          style={{ width: '30%' }}
          enterButton
          className={'search-btn-box'}
        />
        <AddDelete
          deleteSectionProps={
            <>
              <CustomModal
                title={
                  <div>
                    <WarningOutlined style={{ color: 'red', paddingRight: '4px' }} />
                    <span>Do you want to delete this?</span>
                  </div>
                }
                open={deleteState}
                onOk={deleteMultiple}
                onCancel={() => {
                  setDeleteState(false);
                }}
                centered={true}
                cancelText={'Cancel'}
                okText={'Yes'}
                okButtonProps={{ type: 'primary', danger: true }}
              />
              <Button
                type='primary'
                danger
                icon={<MinusOutlined />}
                disabled={deleteBtnState}
                onClick={() => {
                  setDeleteState(true);
                }}
              />
            </>
          }
          AddSectionProps={
            <>
              <Button
                className={'bg-btn'}
                icon={<PlusOutlined />}
                onClick={() => setCreateState(true)}
              />
            </>
          }
        />
      </Flex>

      <AddModal
        params={{
          visible: createState,
          onCancel: () => setCreateState(false),
          fetchStaff: () => fetchStaffsFunction(http)
        }}
      />
      <UpdateModal
        params={{
          visible: updateState,
          onCancel: () => setUpdateState(false),
          dataRow: formModal
        }}
      />
      <CustomTable
        rowSelection={{
          type: 'checkbox',
          ...checkRowSelection
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              const target = event.target as HTMLElement;
              const isWithinLink = target.tagName === 'A' || target.closest('a');

              const isWithinAction =
                target.closest('td')?.classList.contains('ant-table-cell') &&
                !target.closest('td')?.classList.contains('ant-table-selection-column') &&
                !target.closest('td')?.classList.contains('ant-table-cell-fix-right');

              if (isWithinAction && !isWithinLink) {
                handleDetails(record);
              }
            } // click row
          };
        }}
        rowKey={'id'}
        loading={isFetching}
        columns={StaffColumns()}
        data={staffs?.map(staffs => ({
          ...staffs,
          //onDetails: () => handleDetails(user.id!),
          onDelete: () => {
            handleDelete(staffs?.id);
          }
          // onUpdate: () => handleApproved(user.id!)
        }))}
      />
    </>
  );
};

export default HomeStaff;
