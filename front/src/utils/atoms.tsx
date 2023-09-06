import { atom } from "recoil";

export const selectFriend = atom({
  key: "selectFriend",
  default: 100,
});

export const checkFriend = atom<number[]>({
  key: "checkFriend",
  default: [],
});
