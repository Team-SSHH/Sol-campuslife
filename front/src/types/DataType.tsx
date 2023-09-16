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
  userScore: string;
  address: string;
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
  categoryId: number;
  categoryName: string;
}

export interface placeType {
  content: string;
  imgUrl: string;
  userScore: string;
  address: string;
}

export interface ConsumeSummaryType {
  name: string;
  me: number;
  average: number;
}

export interface DutchType {
  dutchDetailId: number;
  dutchId: number;
  dutchAmount: number;
  remittanceState: boolean;
  remittanceTime: string | null;
  name: string;
  friendId: number;
}

export interface GetDutchType {
  dutchId: number;
  amount: number;
  dutchState: boolean;
  number: number;
  requestTime: string;
  details: DutchType[];
}

export interface BankLocationType {
  지점경도: string;
  지점명: string;
  지점위도: string;
  지점대표전화번호: string;
  지점주소: string;
}
