import React, { useEffect, useState } from "react";
import api1 from "../../utils/api1";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";

const StyledButton = styled.button`
  position: relative;

  left: 35%;
  outline: none;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  margin-top: 5%;
  width: 30%;
  background: #c6d5ff;
`;

interface FxrequestProps {
  selectedCurrency: string;
  inputAmount: string;
}

const Fxrequest: React.FC<FxrequestProps> = ({
  selectedCurrency,
  inputAmount,
}) => {
  const [requestresult, setrequestresult] = useState<string>("");
  const [branchData, setBranchData] = useState<any[]>([]);
  const [checkBranchData, setCheckBranchData] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userData] = useRecoilState(loginuser);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const data = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0511",
      환전통화: selectedCurrency,
      거래자성명: userData.name,
      환전금액: inputAmount,
      수령처: "인천국제공항 제 1 여객터미널",
      수령일자: startDate
        ? startDate.toISOString().substring(0, 10).replace(/-/g, "")
        : "",
      수령인성명: userData.name,
      생년월일: "980415",
      휴대폰번호: userData.phoneId,
      환전수령방법: "1",
    },
  };

  const branchdata = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0506",
      환전통화: selectedCurrency,
    },
  };

  const fxrequest = async () => {
    try {
      const response = await api1.post("/sshh/request/fx", data);
      console.log(response.data);
      setrequestresult("신청 완료");
    } catch (error) {
      console.log(error);
    }
  };

  const fxbranch = async () => {
    try {
      const response = await api1.post("/sshh/branch/city", branchdata);
      console.log(response.data.dataBody.리스트);
      setBranchData(response.data.dataBody.리스트);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBtnClick = () => {
    fxrequest();
  };

  const handleBranchClick = (branch: string) => {
    setCheckBranchData(branch);
    closeModal();
  };

  useEffect(() => {
    fxbranch();
  }, []);

  return (
    <div className="fxrequestWrppaer">
      <button className="fxbtn" onClick={openModal}>
        수령처 선택하기
      </button>
      <hr />
      <div className="fxrequestResult">{checkBranchData}</div>
      {isModalOpen && (
        <div className="fxrequestModal">
          <div className="fxrequestModalContent">
            {branchData.map((branch, index) => (
              <div
                key={index}
                onClick={() => handleBranchClick(branch.지역명)}
                className={checkBranchData === branch.지역명 ? "selected" : ""}
              >
                {branch.지역명}
              </div>
            ))}
          </div>
          <StyledButton onClick={closeModal}>닫기</StyledButton>
        </div>
      )}
      <hr />
      <hr />

      {requestresult ? (
        <div className="fxrequestResult">{requestresult}</div>
      ) : (
        <button className="fxbtn" onClick={handleBtnClick}>
          환전신청하기
        </button>
      )}
    </div>
  );
};

export default Fxrequest;
