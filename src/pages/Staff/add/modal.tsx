'use client';
import { ConfigProvider, Flex, Form, Input, InputNumber, Row, notification } from 'antd';

import { NotificationPlacement } from 'antd/es/notification/interface';

import { useEffect, useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import { StaffColumn } from '../column_type';
import addNewStaffs from '../../../services/Staff/addStaffApi';
import { PayloadAddViewStaff } from '../../../services/Staff/updateStaffApi';

const AddModal = ({
  params
}: {
  params: { visible: boolean; onCancel: () => void; fetchStaff?: () => void };
}) => {
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();

  const [loading, setLoading] = useState(false);

  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `${status}`,
      placement,
      duration: 2
    });
  };

  const handleForm = async (value: PayloadAddViewStaff) => {
    const res = await addNewStaffs(value);
    if (res) {
      setLoading(false);
      openNotification('top', `Add susses`, 'success');
      params.onCancel();
      form.resetFields();
      if (params.fetchStaff) {
        params.fetchStaff();
      }
      //  console.log('add site success', res.status);
    } else {
      openNotification('top', `Add error`, 'error');
      params.onCancel();
      form.resetFields();
      //  console.log('add site fail', res.status);
    }
  };

  return (
    <>
      {contextHolder}
      <CustomModal
        open={params.visible}
        title='Chi tiết'
        width='50%'
        style={{ top: 40, maxWidth: 1000 }}
        keyboard
        onOk={form.submit}
        onCancel={() => {
          params.onCancel();
          //openNotification('top', 'create process have been cancel!', 'error');
        }}
        loading={loading}
      >
        <hr style={{ border: '1px solid #eee' }}></hr>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 10,
                verticalLabelPadding: '0 0 0',
                labelFontSize: 12,
                labelColor: 'rgb(133, 133, 133)'
              }
            }
          }}
        >
          <Form
            layout='vertical'
            autoComplete='off'
            form={form}
            onFinish={handleForm}
          >
            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true },
                {
                  type: 'email',
                  message: 'Email is not valid'
                }
              ]}
            >
              <Input size='middle' />
            </Form.Item>

            <Flex gap={20}>
              <Form.Item
                name='first_name'
                label={'First Name'}
                rules={[{ required: true }]}
              >
                <Input size='middle' />
              </Form.Item>

              <Form.Item
                name='last_name'
                label={'Last Name'}
                rules={[{ required: true }]}
              >
                <Input size='middle' />
              </Form.Item>

              <Form.Item
                name='age'
                label={'Age'}
                rules={[{ required: true }]}
              >
                <InputNumber
                  width={30}
                  size='middle'
                  type='number'
                />
              </Form.Item>

              <Form.Item
                name='phone_number'
                label={'Phone Number'}
                rules={[{ required: true }]}
              >
                <Input size='middle' />
              </Form.Item>
            </Flex>

            <Form.Item
              name='address'
              label={'Address'}
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </CustomModal>
    </>
  );
};
export default AddModal;
