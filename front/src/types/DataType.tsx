export interface TransactionHistoryType {
  balance: number;
  content: string;
  contentCategory: string;
  deposit: number;
  historyId: number;
  imgUrl: string;
  pay: number;
  studentId: number;
  transactionTime: string;
  day: string;
}
export interface FriendType {
  balance: number;
  bankNumber: number;
  gender: string;
  grade: number;
  imageUrl: string;
  major: string;
  name: string;
  nationality: string;
  phoneId: string;
  studentId: number;
  university: string;
}

export interface placeType {
  content: string;
  imgUrl: string;
}

export interface ConsumeSummary {
  name: string;
  me: number;
  average: number;
}
