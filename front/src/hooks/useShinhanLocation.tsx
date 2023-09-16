import { useEffect, useState } from "react";
import { postShinhanLocation } from "../services/apiService";
import { BankLocationType } from "../types/DataType";
import useGPSLocation from "./useGPSLocation";

const useShinhanLocation = (cityName: String) => {
  const [bankLocationData, setbankLocationData] = useState([]);
  const [BanknearbyKonKuk, setBanknearbyKonKuk] = useState<BankLocationType[]>(
    []
  );
  const [BanknearbyMyLocation, setBanknearbyMyLocation] = useState<
    BankLocationType[]
  >([]);

  const MyLocation = useGPSLocation();

  const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    var R = 6371e3; // metres
    var φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    var φ2 = (lat2 * Math.PI) / 180;
    var Δφ = ((lat2 - lat1) * Math.PI) / 180;
    var Δλ = ((lon2 - lon1) * Math.PI) / 180;

    var a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
  };

  useEffect(() => {
    const fetchShinhanLocation = async () => {
      try {
        const response = await postShinhanLocation(cityName);
        setbankLocationData(response.data.dataBody.리스트);

        // 건국대 주변은행!!!
        // 반경 내에 있는 은행 지점만 필터링
        let nearbyKonKuk = response.data.dataBody.리스트.filter(
          (location: any): boolean =>
            calculateDistance(
              parseFloat(location.지점위도),
              parseFloat(location.지점경도),
              parseFloat("37.541981"),
              parseFloat("127.078959")
            ) <= 1000
        );

        // 거리에 따라 정렬
        nearbyKonKuk = nearbyKonKuk.sort(
          (a: any, b: any) =>
            calculateDistance(
              parseFloat(a.지점위도),
              parseFloat(a.지점경도),
              parseFloat("37.541981"),
              parseFloat("127.078959")
            ) -
            calculateDistance(
              parseFloat(b.지점위도),
              parseFloat(b.지점경도),
              parseFloat("37.541981"),
              parseFloat("127.078959")
            )
        );
        // 내위치 주변은행!!!
        // 내 위치 주변은행 찾기
        let nearbyMylocation: BankLocationType[] = [];

        if (MyLocation.latitude !== null && MyLocation.longitude !== null) {
          nearbyMylocation = response.data.dataBody.리스트.filter(
            (location: any): boolean =>
              calculateDistance(
                parseFloat(location.지점위도),
                parseFloat(location.지점경도),
                MyLocation.latitude,
                MyLocation.longitude
              ) <= 3500
          );
        }
        // 거리에 따라 정렬
        nearbyMylocation = nearbyMylocation.sort(
          (a: any, b: any) =>
            calculateDistance(
              parseFloat(a.지점위도),
              parseFloat(a.지점경도),
              MyLocation.latitude,
              MyLocation.longitude
            ) -
            calculateDistance(
              parseFloat(b.지점위도),
              parseFloat(b.지점경도),
              MyLocation.latitude,
              MyLocation.longitude
            )
        );

        setBanknearbyKonKuk(nearbyKonKuk);
        setBanknearbyMyLocation(nearbyMylocation);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShinhanLocation();
  }, [cityName, MyLocation]);

  return { bankLocationData, BanknearbyKonKuk, BanknearbyMyLocation };
};

export default useShinhanLocation;
