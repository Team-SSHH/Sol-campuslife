import api1 from "../utils/api1";

// get 요청
export const getAllConsumeData = () => api1.get("/sshh/history");
export const getMyConsumeData = (studentId: string) =>
  api1.get(`/sshh/history/${studentId}`);
export const getMyConsumeDataSummary = (studentId: string) =>
  api1.get(`/sshh/history/${studentId}/summary`);

// post 요청
export const postLogin = (studentId: string, password: string) =>
  api1.post("/sshh/login", { studentId, password });

// put 요청

export const putSendOneWon = (studentId: Number) =>
  api1.put(`sshh/remittance/${studentId}/won1`);
