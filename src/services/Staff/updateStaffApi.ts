import { StaffModel } from '../../models/staff';

import { http } from '../../utils/config';
export type PayloadAddViewStaff = Omit<StaffModel, 'id'>;
const addNewStaffs: (
  addPayload: PayloadAddViewStaff
) => Promise<StaffModel> = async addPayload => {
  try {
    const res = await http?.post(`/staffs`, addPayload);
    return res?.data;
  } catch (error: unknown) {
    // Assert the type of error to be an instance of Error
    if (error instanceof Error) {
      throw new Error(`Error calling API: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred: ${error}`);
    }
  }
};
export default addNewStaffs;
