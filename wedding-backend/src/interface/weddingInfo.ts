export interface WeddingInfo {
  id: string,
  date: string,
  people: {
    groomName: String,
    groomFather: String,
    groomMother: String,
    brideName: String,
    brideFather: String,
    brideMother: String,
  },
  company: string,
  hall: string
}