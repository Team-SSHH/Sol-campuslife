import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const Fxresult: React.FC = ({}) => {
  const [resultData, setResultData] = useState<any[]>([]);
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
      console.log(response.data);
      setResultData(response.data.dataBody.리스트);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtnClick = () => {
    fxresult();
  };

  return (
    <div>
      <p>환전결과</p>
      <button className="fxbtn" onClick={handleBtnClick}>
        환전결과보기
      </button>
      <div>
        {resultData.map((item, index) => (
          <div key={index}>
            {/* 객체의 키와 값을 모두 출력 */}
            {Object.entries(item).map(([key, value]) => (
              <p key={key}>
                {key}: {value as string}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fxresult;
