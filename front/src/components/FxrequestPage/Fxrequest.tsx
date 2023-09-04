import React, { useEffect, useState } from "react";
import api from "../../utils/api";

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

  const data = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0511",
      환전통화: selectedCurrency,
      거래자성명: "홍길동",
      환전금액: inputAmount,
      수령처: "인천국제공항",
      수령일자: "20230830",
      수령인성명: "홍길동",
      생년월일: "980415",
      휴대폰번호: "01012345678",
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
      const response = await api.post("/request/fx", data);
      console.log(response.data);
      setrequestresult("신청 완료");
    } catch (error) {
      console.log(error);
    }
  };

  const fxbranch = async () => {
    try {
      const response = await api.post("/search/branch/city", branchdata);
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
    <div>
      <button className="fxbtn" onClick={openModal}>
        수령처 선택
      </button>
      <p>{checkBranchData}</p>
      <button className="fxbtn" onClick={handleBtnClick}>
        환전신청하기
      </button>
      <p>{requestresult}</p>

      {isModalOpen && (
        <div className="fxrequest-modal">
          <div className="fxrequest-modal-content">
            <ul>
              {branchData.map((branch, index) => (
                <li
                  key={index}
                  onClick={() => handleBranchClick(branch.지역명)}
                  className={checkBranchData === branch ? "selected" : ""}
                >
                  {branch.지역명}
                </li>
              ))}
            </ul>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fxrequest;
