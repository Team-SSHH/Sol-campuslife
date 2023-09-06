import { atom } from "recoil";

export const selectFriend = atom({
  key: "selectFriend",
  default: 100,
});

export const checkFriend = atom<number[]>({
  key: "checkFriend",
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
