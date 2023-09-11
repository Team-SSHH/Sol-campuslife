import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const selectFriend = atom({
  key: "selectFriend",
  default: 100,
});

export const checkFriend = atom<number[]>({
  key: "checkFriend",
  default: [],
});

export const loginuser = atom({
  key: "loginuser",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const isRemittanceModalOpen = atom({
  key: "isRemittanceModalOpen",
  default: false,
});

export const selectedFriend = atom({
  key: "selectedFriend",
  default: {
    balance: 0,
    bankNumber: 0,
    gender: "",
    grade: 0,
    imageUrl: "",
    major: "",
    name: "",
    nationality: "",
    phoneId: "",
    studentId: 0,
    university: "",
  },
});
