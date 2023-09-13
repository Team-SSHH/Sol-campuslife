import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { FriendType } from "../types/DataType";
const { persistAtom } = recoilPersist();

export const selectFriend = atom({
  key: "selectFriend",
  default: 100,
});

export const checkFriend = atom<Array<FriendType>>({
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
export const isCategoryModalOpen = atom<boolean | object>({
  key: "isCategoryModalOpen",
  default: false,
});

export const selectedFriend = atom({
  key: "selectedFriend",
  default: [
    {
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
      categoryId: 0,
      categoryName: "",
    },
  ],
});

export const friendCategory = atom<{ categoryId: number; category: string }[]>({
  key: "friendCategoryState",
  default: [],
});
