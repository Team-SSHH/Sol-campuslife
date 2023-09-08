import React from "react";
import SquareBox2 from "../components/AlertPage/SquareBox2";
import { useRecoilState } from "recoil";
import { isRemittanceModalOpen } from "../utils/atoms";
import "./styles/AlertPage.css";
import RemittanceModal from "../components/StudentIdPage/RemittanceModal";

const Alarm = [
  {
    title: "더치페이",
    date: "2023.09.05 17:05",
    name: "최상익",
    money: 5000,
    complete: false,
  },
  {
    title: "더치페이",
    date: "2023.09.05 17:05",
    name: "윤자현",
    money: 50000,
    complete: true,
  },
  {
    title: "송금",
    date: "2023.09.05 17:05",
    name: "김동현",
    money: 2000,
    complete: true,
  },
  {
    title: "입금",
    date: "2023.09.05 17:05",
    name: "최상익",
    money: 2000,
    complete: true,
  },
  {
    title: "더치페이",
    date: "2023.09.05 17:05",
    name: "최상익",
    money: 2000,
    complete: true,
  },
  {
    title: "더치페이",
    date: "2023.09.05 17:05",
    name: "최상익",
    money: 1,
    complete: true,
  },
];

const AlertPage = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);

  return (
    <div className="alertWrapper">
      {Alarm.map((alarm, index) => (
        <SquareBox2 key={index} id={index} alarmData={alarm} />
      ))}
      {isModalOpen && <RemittanceModal />}
    </div>
  );
};

export default AlertPage;
