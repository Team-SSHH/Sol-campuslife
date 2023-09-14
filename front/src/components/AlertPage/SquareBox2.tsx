import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isRemittanceModalOpen, selectedFriend } from "../../stores/atoms";
import { GetDutchType, DutchType } from "../../types/DataType";
import "./SquareBox2.css";
import { loginuser } from "../../stores/atoms";
import DetailModal from "./DetailModal";
import useGetDutchDetail from "../../hooks/useGetDutchDetail";
interface SquareBox2Props {}

interface Alarm2Props {
  alarmData: GetDutchType;
}

const SquareBox2Component = styled.div<SquareBox2Props>`
  width: 96%;
  height: 38%;
  padding-top: 3%;
  padding-bottom: 5%;
  margin-bottom: 5%;
  background-color: #fff;
  left: 2%;
  //   padding-left: 4%;
  //   padding-top: 2%;
  border-radius: 20px;
`;

const StyledButton = styled.button`
  position: relative;
  bottom: 10%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 2.25rem;
  width: 6rem;
  font-size: 1rem;
  background: #6e96ff;
`;

const SquareBox2: React.FC<Alarm2Props> = (props) => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const alarmData = props.alarmData;
  const [detailInfo, setDetailInfo] = useState<DutchType[]>();
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const { handleGetDutchDetail, getLoadDetail } = useGetDutchDetail();

  useEffect(() => {
    if (getLoadDetail) {
      setInfoOpen(true);
      setDetailInfo(getLoadDetail);
    }
  }, [getLoadDetail]);

  const getDetail = async () => {
    await handleGetDutchDetail(userData.studentId, alarmData.dutchId);
    setDetailInfo(getLoadDetail);
    // setInfoOpen(true);
  };

  return (
    <SquareBox2Component>
      <div className="squarebox2Wrapper">
        <div className="squarebox2Date">{alarmData.requestTime}</div>
        {/* <div className="squarebox22Date">{alarmData.dutchId}</div> */}
        <div className="squarebox2Title">
          <span>더치페이</span>
          <span className={alarmData.dutchState ? "" : `squarebox2NotDone`}>
            {alarmData.dutchState ? "완료" : "미완"}
          </span>
        </div>
        <div className="squarebox2Me">
          <span>{userData.name} </span>
          <span className="squarebox2Amount">
            {Math.ceil(alarmData.amount / alarmData.number)}
          </span>{" "}
          원
        </div>
        <div className="squarebox2detail">
          {alarmData.details &&
            alarmData.details.map((data, index) => (
              <div key={index}>
                <span>{data.name} </span>
                <span className="squarebox2Amount"> {data.dutchAmount}</span> 원
              </div>
            ))}
        </div>
        <hr />
        <div className="squarebox2Total">
          {alarmData.amount} <span>원</span>
        </div>
        <StyledButton onClick={() => getDetail()}>상세보기</StyledButton>
      </div>
      {infoOpen && detailInfo && (
        <DetailModal
          detailInfo={detailInfo}
          onClose={() => setInfoOpen(false)}
        />
      )}
    </SquareBox2Component>
  );
};

export default SquareBox2;
