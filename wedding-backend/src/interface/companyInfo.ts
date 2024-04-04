export interface CompanyInfo {
  _id: string;
  name: string;
  addr: string;
  phone: string;
  hallList: Array<{
    _id: string;
    name: string;
    floor: number;
    size: string;
  }>;
}
