export interface CongratulatoryMoney {
  _id?: string;
  weddingId: string;
  groom?: Array<{
    _id?: string;
    name?: string;
    phone?: string;
    money?: number;
  }>;
  bride?: Array<{
    _id?: string;
    name?: string;
    phone?: string;
    money?: number;
  }>;
  groomMoney?: number;
  brideMoney?: number;
  totalMoney?: number;
}
