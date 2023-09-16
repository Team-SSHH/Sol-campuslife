import React, { useState, CSSProperties } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import useAllConsumeLogData from "../hooks/useAllConsumeLogData";
import useMyConsumeLogData from "../hooks/useMyConsumeLogData";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import MyCalendar from "../components/MyCalendar/MyCalendar";
import "./styles/ConsumeLogPage.css";
import { formatCurrency } from "../components/common/formatCurrency";

// 각 섹션별 색상 정의
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#FF88A9",
];

const ConsumeLogPage = () => {
  const [userData, setUserData] = useRecoilState(loginuser);

  const {
    AllDataConsumeLog,
    AllcategorySum,
    categoryAverages,
    getContentWithImgSortedByFrequency,
  } = useAllConsumeLogData();

  const {
    MyDataConsumeLog,
    MycategorySum,
    ConsumeSummary,
    dateWiseConsumption,
  } = useMyConsumeLogData();

  //나의 데이터
  const data1 = [
    { name: "음식", value: MycategorySum.음식 },
    { name: "카페", value: MycategorySum.카페 },
    { name: "문화", value: MycategorySum.문화 },
    { name: "학습", value: MycategorySum.학습 },
    { name: "교통", value: MycategorySum.교통 },
    { name: "기타", value: MycategorySum.기타 },
  ];

  // 평균
  const data2 = [
    { name: "음식", value: categoryAverages.음식 },
    { name: "카페", value: categoryAverages.카페 },
    { name: "문화", value: categoryAverages.문화 },
    { name: "학습", value: categoryAverages.학습 },
    { name: "교통", value: categoryAverages.교통 },
    { name: "기타", value: categoryAverages.기타 },
  ];
  // console.log(ConsumeSummary);
  // console.log("111111111111111111");
  const combinedData = data1.map((item, index) => ({
    name: item.name,
    me: item.value,
    average: data2[index].value,
  }));
  console.log(data1);
  console.log(data2);
  console.log("data2data2data2data2data2");

  const data3 = ConsumeSummary.map((item) => {
    const date = new Date(item.name);
    const day = date.getDate().toString();
    return {
      name: day,
      me: item.me,
      average: item.average,
    };
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const buttonStyle: CSSProperties = {
    position: "fixed",
    top: "10%",
    right: showCalendar ? "unset" : "3%",
    left: showCalendar ? "3%" : "unset",
    transform: "translateY(-50%)",
    zIndex: 999,
    fontWeight: "bold",
  };

  return (
    <div className={showCalendar ? "" : "ConsumeLog"}>
      {!showCalendar && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: "2rem",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              width: "50%",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "red",
                marginRight: "10px",
              }}
            ></div>
            나
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              width: "50%",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#6F96FF",
                marginRight: "10px",
              }}
            ></div>
            평균
          </div>
        </div>
      )}
      <button
        className="ShowCalendarButton"
        onClick={() => setShowCalendar(!showCalendar)}
        style={buttonStyle}
      >
        {showCalendar ? "그래프보기" : "달력보기"}
      </button>
      {!showCalendar && (
        <>
          <div className="CompareCircleWrapper">
            <h2>나와 건국대생의 한 달 비교</h2>
            <div className="CompareCircle">
              <BarChart
                data={combinedData}
                width={400}
                height={280}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "black" }} />
                <YAxis
                  tick={{ fill: "black" }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip />
                <Bar dataKey="me" fill="red" strokeWidth={3} name="Me" />
                <Bar
                  dataKey="average"
                  fill="#6F96FF"
                  strokeWidth={3}
                  name="Average"
                />
              </BarChart>
            </div>
            <br />

            {/* <div
              className="Legend"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            > */}
          </div>
          {/* </div> */}

          <div className="CompareGraphWrapper">
            <h2>한 달 간의 소비</h2>

            <div className="CompareGraph">
              <LineChart
                data={data3}
                width={400}
                height={280}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "black" }} />
                <YAxis
                  tick={{ fill: "black" }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip />
                {/* 나의 데이터 */}
                <Line
                  type="monotone"
                  dataKey="me"
                  stroke="red"
                  strokeWidth={5}
                />

                {/* 평균 데이터 */}
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#6F96FF"
                  strokeWidth={5}
                />
              </LineChart>
            </div>
          </div>
        </>
      )}
      <br />

      {showCalendar && <MyCalendar dateWiseConsumption={dateWiseConsumption} />}
    </div>
  );
};
export default ConsumeLogPage;
