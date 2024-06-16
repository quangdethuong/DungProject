import { StaffModel } from '../../models/staff';

export interface Action {
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
}



export type StaffColumn = StaffModel & Action;




export type StaffTableData = StaffModel;
