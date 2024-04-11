export interface CongratulatoryMoney {
  _id?: string;
  weddingId: string;
  groom?: Array<{
    _id?: string;
    name?: string;
    phone?: string;
    money?: number;
    ticket?: number;
  }>;
  bride?: Array<{
    _id?: string;
    name?: string;
    phone?: string;
    money?: number;
    ticket?: number;
  }>;
  groomMoney?: number;
  brideMoney?: number;
  totalMoney?: number;
}
