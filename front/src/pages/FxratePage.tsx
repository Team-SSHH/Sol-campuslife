import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Fxrate from "../components/FxratePage/Fxrate";

interface RateData {
  통화코드: string;
}

interface DiscountData {
  통화: string;
  우대율: string;
}

const FxratePage: React.FC = () => {
  const [ratesData, setRatesData] = useState<RateData | null>(null);
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [checkData, setCheckData] = useState<DiscountData | null>(null);
  const fxlist = [
    {
      통화코드: "USD",
      통화코드명: "미국달러(USD)",
      단위: "10",
    },
    {
      통화코드: "JPY",
      통화코드명: "일본엔(JPY)",
      단위: "1000",
    },
    {
      통화코드: "EUR",
      통화코드명: "유럽유로(EUR)",
      단위: "10",
    },
    {
      통화코드: "CNY",
      통화코드명: "중국위안(CNY)",
      단위: "100",
    },
    {
      통화코드: "HKD",
      통화코드명: "홍콩달러(HKD)",
      단위: "100",
    },
    {
      통화코드: "THB",
      통화코드명: "태국바트(THB)",
      단위: "100",
    },
    {
      통화코드: "AUD",
      통화코드명: "호주달러(AUD)",
      단위: "20",
    },
    {
      통화코드: "CAD",
      통화코드명: "캐나다달러(CAD)",
      단위: "20",
    },
    {
      통화코드: "GBP",
      통화코드명: "영국파운드(GBP)",
      단위: "20",
    },
    {
      통화코드: "SGD",
      통화코드명: "싱가폴달러(SGD)",
      단위: "50",
    },
    {
      통화코드: "TWD",
      통화코드명: "대만달러(TWD)",
      단위: "1000",
    },
    {
      통화코드: "CHF",
      통화코드명: "스위스프랑(CHF)",
      단위: "100",
    },
    {
      통화코드: "MYR",
      통화코드명: "말레이시아링기트(MYR)",
      단위: "50",
    },
    {
      통화코드: "PHP",
      통화코드명: "필리핀페소(PHP)",
      단위: "50",
    },
    {
      통화코드: "VND",
      통화코드명: "베트남동(VND)",
      단위: "100000",
    },
    {
      통화코드: "NZD",
      통화코드명: "뉴질랜드달러(NZD)",
      단위: "20",
    },
    {
      통화코드: "IDR",
      통화코드명: "인도네시아루피아(IDR)",
      단위: "50000",
    },
    {
      통화코드: "INR",
      통화코드명: "인도루피(INR)",
      단위: "100",
    },
    {
      통화코드: "AED",
      통화코드명: "아랍에밀리트 디르함(AED)",
      단위: "100",
    },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };

  useEffect(() => {
    // fxrate();
    discountRate(selectedCurrency);
  }, [selectedCurrency]);

  const data = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      조회일자: "20230830",
      통화코드: selectedCurrency,
    },
  };

  const disdata = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0501",
    },
  };

  const discountRate = async (currency: string) => {
    try {
      const response = await api.post("/search/fx/discount-rate", disdata);
      console.log(response.data.dataBody.리스트);

      if (Array.isArray(response.data.dataBody.리스트)) {
        const foundItem = response.data.dataBody.리스트.find(
          (item: DiscountData) => item.통화.includes(currency)
        );
        if (foundItem) {
          console.log("찾은 S항목:", foundItem);
          setCheckData(foundItem);
        } else {
          console.log(`${currency}를 포함한 항목을 찾지 못했습니다.`);
          setCheckData(null);
        }
      } else {
        console.log("dataBody.리스트가 배열이 아닙니다.");
        setCheckData(null);
      }
    } catch (error) {
      console.log(error);
      setCheckData(null);
    }
  };

  // const fxrate = async () => {
  //   try {
  //     const response = await api.post("/search/fxrate/day", data);
  //     console.log(response);
  //     // setRatesData(response.data.dataBody);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      FxratePage
      <div>통화별환전조회</div>
      <Fxrate selectedCurrency={selectedCurrency} />
      <div>
        <label htmlFor="currencySelect">통화 선택:</label>
        <select
          id="currencySelect"
          name="currencySelect"
          onChange={handleCurrencyChange}
          value={selectedCurrency}
        >
          {fxlist.map((currency) => (
            <option key={currency.통화코드} value={currency.통화코드}>
              {currency.통화코드명}
            </option>
          ))}
        </select>
      </div>
      {/* 선택한 통화 코드에 대한 우대율 표시 */}
      <div>
        {checkData
          ? `${selectedCurrency} 우대율: ${checkData.우대율}`
          : "우대율이 없습니다"}
      </div>
    </div>
  );
};

export default FxratePage;
