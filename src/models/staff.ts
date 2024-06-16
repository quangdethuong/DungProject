export type StaffModel = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  address: string;
  phone_number: string;
  onDelete?: () => void;
};
