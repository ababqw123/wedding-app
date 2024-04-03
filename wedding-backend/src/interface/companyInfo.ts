export interface CompanyInfo {
  id: string,
  name: string,
  phone: string,
  hallList: Array<{
    id: string
    name: string,
    floor: number,
    size: string
  }>
}