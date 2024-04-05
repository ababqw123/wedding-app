import { HallInfo } from './hallInfo';

export interface CompanyInfo {
  _id: string;
  name: string;
  addr: string;
  phone: string;
  hallList: Array<HallInfo>;
  enabled: boolean;
}
