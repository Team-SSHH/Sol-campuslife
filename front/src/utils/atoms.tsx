import { atom } from "recoil";

export const checkFriend = atom<number[]>({
  key: "checkFriend",
  default: [],
});

export const loginuser = atom({
  key: "loginuser",
  default: [],
});

export const isRemittanceModalOpen = atom({
  key: "isRemittanceModalOpen",
  default: false,
});

export const selectedFriend = atom({
  key: "selectedFriend",
  default: { name: "", major: "", grade: "", number: 0 },
});
