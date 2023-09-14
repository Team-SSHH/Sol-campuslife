import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import api1 from "../../utils/api1";

interface DiscountData {
  통화: string;
  우대율: string;
}

interface DiscountRateProps {
  selectedCurrency: string;
}
const DiscountRate: React.FC<DiscountRateProps> = ({ selectedCurrency }) => {
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [checkData, setCheckData] = useState<DiscountData | null>(null);

  const disdata = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0501",
    },
  };

  useEffect(() => {
    discountRate(selectedCurrency);
  }, [selectedCurrency]);

  const discountRate = async (currency: string) => {
    try {
      const response = await api1.post("/sshh/fx/discount-rate", disdata);
      // console.log(response.data.dataBody.리스트);

      if (Array.isArray(response.data.dataBody.리스트)) {
        const foundItem = response.data.dataBody.리스트.find(
          (item: DiscountData) => item.통화.includes(currency)
        );
        if (foundItem) {
          // console.log("찾은 S항목:", foundItem);
          setCheckData(foundItem);
        } else {
          // console.log(`${currency}를 포함한 항목을 찾지 못했습니다.`);
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

  return (
    <div>
      {checkData
        ? `${selectedCurrency} 우대율: ${checkData.우대율}`
        : "우대율이 없습니다"}
    </div>
  );
};

export default DiscountRate;
