import api1 from "../utils/api1";

//####### get 요청
//전체 거래로그 조회
export const getAllConsumeData = () => api1.get("/sshh/history");
//단일 거래로그 조회
export const getMyConsumeData = (studentId: Number) =>
  api1.get(`/sshh/history/${studentId}`);
// 거래로그 통계
export const getTransactionLogStatics = () => api1.get("/sshh/history/data");
// 거래로그 총합,총수,평균
export const getTransactionLogSum = () => api1.get("/sshh/history/summary");
// 나와 전체 소비 평균 한달
export const getMyConsumeDataSummary = (studentId: Number) =>
  api1.get(`/sshh/history/${studentId}/summary`);
// 친구 학생증 목록 조회
export const getFriendList = (studentId: Number) =>
  api1.get(`/sshh/friends/${studentId}`);
//친구 추가 인증 알림푸쉬에 쓸거
export const getFriendAuth = (studentId: Number, friendId: Number) =>
  api1.get(`/sshh/friends/${studentId}/certify/${friendId}`);
//친구들 카테고리 조회
export const getFriendsCategoryList = (studentId: Number) =>
  api1.get(`/sshh/category/${studentId}`);

//####### post 요청
export const postLogin = (studentId: string, password: string) =>
  api1.post("/sshh/login", { studentId, password });

//####### put 요청
// 1원이체
export const putSendOneWon = (studentId: Number) =>
  api1.put(`/sshh/remittance/${studentId}/won1`);
// 송금
export const putRemittance = (
  studentId: Number,
  friendId: Number,
  amount: Number,
  content: String
) =>
  api1.put(`/sshh/remittance/${studentId}/send/${friendId}`, {
    amount,
    content,
  });

// 더치페이
export const putDutchPay = (
  studentId: Number,
  friendId: Number,
  dutchId: String,
  dutchAmount: String
) =>
  api1.put(`/sshh/remittance/${studentId}/dutch/${friendId}`, {
    dutchId,
    dutchAmount,
  });

// 친구 학생증 카테고리 변경
export const putFriendCategory = (
  studentId: Number,
  friendId: Number,
  categoryId: Number
) => api1.put(`/sshh/friends/${studentId}/update/${friendId}`, { categoryId });

// 카테고리 이름 변경
export const putCategoryName = (
  studentId: Number,
  categoryId: Number,
  category: String
) => api1.put(`/sshh/category/${studentId}`, { categoryId, category });
