export interface CompanyInfo {
  _id: string,
  name: string,
  phone: string,
  hallList: Array<{
    _id: string
    name: string,
    floor: number,
    size: string
  }>
}