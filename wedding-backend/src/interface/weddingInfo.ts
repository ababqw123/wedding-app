export interface WeddingInfo {
  _id: string;
  date: string;
  time: number;
  people: {
    groomName: String;
    groomFather: String;
    groomMother: String;
    brideName: String;
    brideFather: String;
    brideMother: String;
  };
  company: string;
  hall: string;
  enabled: boolean;
}
