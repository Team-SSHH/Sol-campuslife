import React, { useState, CSSProperties } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import useAllConsumeLogData from "../hooks/useAllConsumeLogData";
import useMyConsumeLogData from "../hooks/useMyConsumeLogData";
import {
  PieChart,
  Pie,
  Cell,
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
    { name: "음식", value: AllcategorySum.음식 },
    { name: "카페", value: AllcategorySum.카페 },
    { name: "문화", value: AllcategorySum.문화 },
    { name: "학습", value: AllcategorySum.학습 },
    { name: "교통", value: AllcategorySum.교통 },
    { name: "기타", value: AllcategorySum.기타 },
  ];

  // 누적된 값으로 데이터 변환
  const data3 = ConsumeSummary.reduce((acc, cur) => {
    const last = acc[acc.length - 1]; // 마지막 요소 가져오기

    // 첫 번째 요소인 경우 그대로 추가
    if (!last) {
      return [cur];
    }

    // 이전 요소의 값에 현재 값을 더하여 새 객체 생성
    const newObj = {
      name: cur.name.slice(8, 10),
      me: last.me + cur.me,
      average: last.average + cur.average,
    };

    return [...acc, newObj]; // 새 객체 추가
  }, [] as any);

  ///
  const [showCalendar, setShowCalendar] = useState(false);

  const buttonStyle: CSSProperties = {
    position: "absolute",
    top: "12.8%",
    right: showCalendar ? "unset" : "3%",
    left: showCalendar ? "3%" : "unset",
    transform: "translateY(-50%)",
    zIndex: 999,
    border: showCalendar ? "1px solid #fff" : "1px solid #fff",
    color: showCalendar ? "#fff" : "#fff",
    fontWeight: "bold",
  };

  return (
    <div className="ConsumeLog">
      <button
        className="ShowCalendarButton"
        onClick={() => setShowCalendar(!showCalendar)}
        style={buttonStyle}
      >
        {showCalendar ? "<<📊" : "📅>>"}
      </button>
      {!showCalendar && (
        <>
          <div className="CompareCircleWrapper">
            <h2>나와 건국대생의 한 달</h2>
            <div className="CompareCircle">
              <PieChart width={400} height={200}>
                {/* 첫 번째 반원형 그래프 */}
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data1}
                  cx="50%"
                  cy="100%"
                  innerRadius={70}
                  outerRadius={120}
                  labelLine={false}
                >
                  {data1.map((entry, index) => (
                    // 여기서 각 섹션에 대한 색상을 지정합니다.
                    // COLORS 배열에서 순서대로 색상을 가져옵니다.
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="85%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#000"
                  fontWeight="bold"
                >
                  Me
                </text>

                {/* 두 번째 반원형 그래프 */}
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data2}
                  cx="50%"
                  cy="100%"
                  innerRadius={120}
                  outerRadius={170}
                >
                  {data2.map((entry, index) => (
                    // 여기서 각 섹션에 대한 색상을 지정합니다.
                    // COLORS 배열에서 순서대로 색상을 가져옵니다.
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="5%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#000"
                  fontWeight="bold"
                >
                  average
                </text>
              </PieChart>
            </div>
            <br />
            <div
              className="Legend"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {data1.map((entry, index) => (
                <div
                  key={`item-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // <- 여기를 추가하였습니다.
                    marginBottom: "10px",
                    width: "33.33%", // 부모 컨테이너의 1/3 너비를 차지하도록 설정
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: COLORS[index],
                      marginRight: "10px",
                    }}
                  ></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
          <div className="CompareGraphWrapper">
            <h2>한 달 간의 소비</h2>

            <div className="CompareGraph">
              <ResponsiveContainer width={400} height={280}>
                <LineChart
                  data={data3}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: "white" }} />
                  <YAxis
                    tick={{ fill: "white" }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip />
                  {/* 나의 데이터 */}
                  <Line
                    type="monotone"
                    dataKey="me"
                    stroke="#FFBB28"
                    strokeWidth={3}
                  />

                  {/* 평균 데이터 */}
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="#82ca9d"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
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
