// import React, { useEffect, useState } from "react";
// import usePostGPS from "../hooks/usePostGPS";
// import { useRecoilState } from "recoil";
// import { loginuser } from "../stores/atoms";
// import useGPSLocation from "../hooks/useGPSLocation";
// import radarImg from "../assets/radar.png";
// import "./styles/FindMyGganbuPage.css";
// import styled from "styled-components";

// interface gganbuImgType {
//   imageurl: string;
// }

// const GganbuImg = styled.div<gganbuImgType>`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;

//   background-image: url(${(props) => props.imageurl});

//   background-size: cover;

//   background-position: center;
// `;

// // interface GganbuType {
// //   balance: Number;
// //   bankNumber: Number;
// //   distance: Number;
// //   gender: string;
// //   grade: Number;
// //   imageUrl: string;
// //   major: string;
// //   name: string;
// //   nationality: string;
// //   phoneId: string;
// //   studentId: Number;
// //   university: string;
// // }

// const FindMyGganbuPage = () => {
//   const { handlePutMyLocation, frienddata } = usePostGPS();
//   const [userData, setUserData] = useRecoilState(loginuser);
//   const MyLocation = useGPSLocation();
//   const URL = "https://api.solcampuslife.store/static/images/";

//   useEffect(() => {
//     if (userData.locationState) {
//       handlePutMyLocation(userData.studentId);
//     }
//   }, [MyLocation]);

//   return (
//     <div className="findGganbuPage">
//       <img
//         src={radarImg}
//         alt="radarImg"
//         className="raderImg"
//         style={{ position: "absolute", zIndex: 1 }}
//       />

//       {frienddata.map((friend, index) => (
//         <div key={index} style={{ position: "absolute", zIndex: 2 }}>
//           {/* <img
//             src={URL + friend.imageUrl}
//             alt="friend image"
//             style={{ width: "20%" }}
//           /> */}
//           <GganbuImg imageurl={URL + friend.imageUrl} />

//           <div>{friend.distance.toFixed(2)}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FindMyGganbuPage;

import React, { useEffect, useState } from "react";
import usePostGPS from "../hooks/usePostGPS";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import useGPSLocation from "../hooks/useGPSLocation";
import radarImg from "../assets/radar.png";
import "./styles/FindMyGganbuPage.css";
import styled from "styled-components";

interface gganbuImgType {
  imageurl: string;
}

const GganbuImg = styled.div<gganbuImgType>`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  background-image: url(${(props) => props.imageurl});

  background-size: cover;

  background-position: center;
`;

const FindMyGganbuPage = () => {
  const SOME_SCALE_FACTOR = 1;
  const { handlePutMyLocation, frienddata } = usePostGPS();
  const [userData, setUserData] = useRecoilState(loginuser);
  const MyLocation = useGPSLocation();
  const URL = "https://api.solcampuslife.store/static/images/";

  useEffect(() => {
    if (userData.locationState) {
      handlePutMyLocation(userData.studentId);
    }
  }, [MyLocation]);

  return (
    <div className="findGganbuPage">
      <img
        src={radarImg}
        alt="radarImg"
        className="raderImg"
        style={{ position: "absolute", zIndex: 1 }}
      />

      {frienddata.map((friend, index) => {
        // 각도는 랜덤하게 설정하고 distance에 따라 반지름을 조절합니다.
        const angle = Math.random() * Math.PI * 2; // 랜덤한 각도 (0부터 π)

        // distance 값을 적절히 스케일링하여 반지름으로 사용합니다.
        // 이 부분은 실제 distance 값과 화면 표시 크기 등에 따라 조절이 필요할 수 있습니다.
        const radius = friend.distance * SOME_SCALE_FACTOR;

        // 극 좌표계에서 직교 좌표계로 변환
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              zIndex: 2,
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <GganbuImg imageurl={URL + friend.imageUrl} />
            {/* <div>{friend.distance.toFixed(2)} m</div> */}
          </div>
        );
      })}
    </div>
  );
};

export default FindMyGganbuPage;
