import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Fxrate.css";
import api1 from "../../utils/api1";

interface RateData {
  통화코드: string;
}
interface AllRateData {
  통화CODE: string;
  통화CODE_DISPLAY: string;
  대미환산환율: number;
  매매기준환율: number;
  전신환매입환율: number;
  전신환매도환율: number;
  지폐매입환율: number;
  지폐매도환율: number;
  TC매입환율: number;
  TC매도환율: number;
}
interface FxrateProps {
  selectedCurrency: string;
}
const Fxrate: React.FC<FxrateProps> = ({ selectedCurrency }) => {
  const [ratesData, setRatesData] = useState<AllRateData | null>(null);
  const [allratesData, setAllRatesData] = useState<AllRateData | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const alldata = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      조회일자: startDate ? startDate.toISOString().substring(0, 10) : "", // 선택한 날짜를 조회일자로 설정
    },
  };

  useEffect(() => {
    allfxrate(selectedCurrency);
  }, [selectedCurrency, startDate]);

  const allfxrate = async (currency: string) => {
    try {
      const response = await api1.post("/sshh/shinhan/fxrate/number", alldata);
      // console.log(response.data);
      setAllRatesData(response.data.dataBody.환율리스트);
      // console.log(response.data.dataBody.환율리스트);

      if (Array.isArray(response.data.dataBody.환율리스트)) {
        const foundItem = response.data.dataBody.환율리스트.find(
          (item: AllRateData) => item.통화CODE.includes(currency)
        );
        if (foundItem) {
          // console.log("찾은 항목:", foundItem);
          setRatesData(foundItem);
        } else {
          // console.log(`${currency}를 포함한 항목을 찾지 못했습니다.`);
          setRatesData(null);
        }
      } else {
        // console.log("dataBody.리스트가 배열이 아닙니다.");
        setRatesData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderRates = () => {
    if (!ratesData) return null;
    return (
      <div className="fxrateRender">
        <div className="fxrateRenderTitle">
          {ratesData.통화CODE_DISPLAY}({ratesData.통화CODE})
        </div>
        <div className="fxrateRenderContent">
          <p>
            <span>대미환산환율 </span>
            <span className="fxrateRenderResult">
              {ratesData.대미환산환율} $
            </span>
          </p>

          <p>
            <span>매매기준환율 </span>
            <span className="fxrateRenderResult">
              {ratesData.매매기준환율}
              <span> 원</span>
            </span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fxrateBox">
      날짜 선택
      <DatePicker
        dateFormat="yyyy.MM.dd"
        className="datepicker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      {renderRates()}
    </div>
  );
};

export default Fxrate;
