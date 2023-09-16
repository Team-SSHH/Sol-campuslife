import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styled from "styled-components";

interface RequestResultType {
  상태구분: string;
  신청인명: string;
  신청인전화번호: string;
  신청인생년월일: string;
  신청일: string;
  수령일: string;
  수령점명: string;
  가상계좌입금일자: string;
  가상입금계좌번호: string;
  가상계좌입금금액: string;
  가상입금기한일자: string;
  가상입금기한시각: string;
  환전구분: string;
  환전통화: string;
  환전금액: string;
  우대적용환율: string;
  원화금액: string;
}

const ResultButton = styled.button`
  outline: none;
  border: none;
  border-radius: 15px;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: bold;
  width: 40%;
  height: 3rem;
  background: #fac109;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 50%;
`;

const FxresultContent = styled.div`
  position: absolute;
  width: 84%;
  height: 70%;
  // background-color: #f0f0f0;
  background-color: #fff;
  bottom: 10%;
  left: 3%;
  overflow-y: auto;
  padding: 20px;
  border-radius: 20px;
`;

const FxresultModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: #c6d5ff;
`;

const Fxresult: React.FC = ({}) => {
  const [resultData, setResultData] = useState<Array<RequestResultType>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const data = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0512",
      신청인명: "김신한",
      신청인휴대폰번호: "01011111111",
      신청인생년월일: "980415",
    },
  };

  const fxresult = async () => {
    try {
      const response = await api.post("/search/fx/request-list", data);
      console.log("요깃다", response.data.dataBody.리스트);
      setResultData(response.data.dataBody.리스트);
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtnClick = () => {
    fxresult();
  };

  return (
    <div className="fxresultWrapper">
      <ResultButton onClick={handleBtnClick}>환전결과보기</ResultButton>

      {modalOpen && (
        <FxresultModalWrapper>
          <FxresultContent>
            <CloseButton onClick={() => setModalOpen(false)}>X</CloseButton>
            {resultData && (
              <div className="fxresultBox">
                <div>
                  <span>현재상태 </span>
                  {resultData[0].상태구분}
                </div>
                <hr />
                <div>
                  <span>신청일 </span>
                  {resultData[0].신청일}
                </div>
                <hr />

                <div>
                  <span>수령일 </span>
                  {resultData[0].수령일}
                </div>
                <hr />

                <div>
                  <span>수령점명 </span>
                  {resultData[0].수령점명}
                </div>
                <hr />

                <div>
                  <span>가상계좌입금일자 </span>
                  {resultData[0].가상계좌입금일자}
                </div>
                <hr />
                <div>
                  <span>가상입금계좌번호 </span>
                  {resultData[0].가상입금계좌번호}
                </div>
                <hr />

                <div>
                  <span>가상계좌입금금액 </span>
                  {resultData[0].가상계좌입금금액}
                </div>
                <hr />

                <div>
                  <span>가상입금기한일자 </span>
                  {resultData[0].가상입금기한일자}
                </div>
                <hr />

                <div>
                  <span>가상입금기한시각 </span>
                  {resultData[0].가상입금기한시각}
                </div>
                <hr />

                <div>
                  <span>환전구분 </span>
                  {resultData[0].환전구분}
                </div>
                <hr />

                <div>
                  <span>환전통화 </span>
                  {resultData[0].환전통화}
                </div>
                <hr />

                <div>
                  <span>환전금액 </span>
                  {resultData[0].환전금액}
                </div>
                <hr />

                <div>
                  <span>우대적용환율 </span>
                  {resultData[0].우대적용환율}
                </div>
                <hr />

                <div>
                  <span>원화금액 </span>
                  {resultData[0].원화금액}
                </div>
                <hr />
              </div>
            )}
          </FxresultContent>
        </FxresultModalWrapper>
      )}
    </div>
  );
};

export default Fxresult;
