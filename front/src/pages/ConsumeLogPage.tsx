import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../utils/atoms";

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
} from "recharts";
import "./styles/ConsumeLogPage.css";

const data1 = [
  { name: "음식", value: 40 },
  { name: "카페", value: 10 },
  { name: "문화", value: 15 },
  { name: "학습", value: 15 },
  { name: "교통", value: 5 },
  { name: "기타", value: 15 },
];

const data2 = [
  { name: "음식", value: 40 },
  { name: "카페", value: 20 },
  { name: "문화", value: 20 },
  { name: "학습", value: 15 },
  { name: "교통", value: 5 },
  { name: "기타", value: 15 },
];

const originalData3 = [
  { name: "1일", Me: 4000, Average: 2400 },
  { name: "2일", Me: 2007, Average: 54200 },
  { name: "3일", Me: 35447, Average: 11212 },
  { name: "4일", Me: 3230, Average: 1223 },
  { name: "5일", Me: 3480, Average: 13111 },
  { name: "6일", Me: 100, Average: 5555 },
  { name: "7일", Me: 39821, Average: 13981 },
  { name: "8일", Me: 100000, Average: 13983 },
  { name: "9일", Me: 38778, Average: 13981 },
];

// 누적된 값으로 데이터 변환
const data3 = originalData3.reduce((acc, cur) => {
  const last = acc[acc.length - 1]; // 마지막 요소 가져오기

  // 첫 번째 요소인 경우 그대로 추가
  if (!last) {
    return [cur];
  }

  // 이전 요소의 값에 현재 값을 더하여 새 객체 생성
  const newObj = {
    name: cur.name,
    Me: last.Me + cur.Me,
    Average: last.Average + cur.Average,
  };

  return [...acc, newObj]; // 새 객체 추가
}, [] as any);

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

  // const allConsumeLog = async () => {
  //   try {
  //     const response = await api.get("/api2/sshh/history/"");
  //     if (response.status === 200) {
  //    setAllLog(response.data)
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  // const myConsumeLog = async () => {
  //   try {
  //     const response = await api.get(`/api2/sshh/history/${loginuser.student_id}`);
  //     if (response.status === 200) {
  //      setMyLog(response.data)
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  return (
    <div className="ConsumeLog">
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
        <h2>한 달 간 얼마를 썼을까</h2>
        <div className="CompareGraph">
          <LineChart
            width={400}
            height={300}
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
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            {/* 나의 데이터 */}
            <Line
              type="monotone"
              dataKey="Me"
              stroke="#FFBB28"
              strokeWidth={3}
            />

            {/* 평균 데이터 */}
            <Line
              type="monotone"
              dataKey="Average"
              stroke="#82ca9d"
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};
export default ConsumeLogPage;
