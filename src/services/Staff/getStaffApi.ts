import { AxiosInstance } from 'axios';

import { StaffModel } from '../../models/staff';

const fetchStaffs: (http: AxiosInstance) => Promise<StaffModel[]> = async http => {
  try {
    const res = await http?.get(`/staffs`);
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
export default fetchStaffs;
