import { http } from '../../utils/config';

export const deleteStaffsApi = async (id?: string | undefined) => {
  try {
    const res = await http?.delete(`/staffs/${id}`, {
      //   params: {
      //     id: id
      //   }
    });
    console.log(res);

    return res;
  } catch (error: unknown) {
    // Assert the type of error to be an instance of Error
    if (error instanceof Error) {
      throw new Error(`Error calling API: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred: ${error}`);
    }
  }
};
