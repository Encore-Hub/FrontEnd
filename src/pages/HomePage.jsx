import { useEffect, useState } from "react";
import SearchBar from "../components/searchbar/SearchBar";
// import usePrmcStore from "../zustand/usePrmcStore";
import "./HomePage.styled.css";
import axiosInstance from "../api/axiosInstance";

const HomePage = () => {
  // const { getRankedList, getUpcomingList, fetchPrmcs } = usePrmcStore();

  // useEffect(() => {
  //   fetchPrmcs();
  // }, [fetchPrmcs]);

  // const rankedList = getRankedList();
  // const upcomingList = getUpcomingList();

  const [regionData, setRegionData] = useState(null);
  const [theaterData, setTheaterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const response = await axiosInstance.post("/api/theater/save-list");
        setRegionData(response.data);
        console.log("success fetch region data", response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegionData();

    const fetchTheaterData = async () => {
      try {
        const response = await axiosInstance.post("/api/theater/save-details");
        setTheaterData(response.data);
        console.log("success fetch theater data", response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTheaterData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error.message}</p>;

  return (
    <div>
      <section style={{ height: "calc(100vh - 75px)" }}>
        <div className="flex justify-center flex-col text-center h-full">
          <h1
            className="text-4xl"
            style={{ marginTop: "80px", marginBottom: "30px" }}
          >
            손쉽게 공연장을 찾아보세요!
          </h1>
          <span className="text-1xl mb-8">
            ENCORE HUB는 주변의 공연 정보와 티켓팅 일정을 한눈에 확인할 수 있는
            플랫폼입니다.
            <br /> 관심 있는 공연을 즐겨찾기에 추가하고, 다른 유저들과 의견을
            나눌 수 있습니다.
          </span>
          <SearchBar style={{ margin: "0 auto" }} />
          {/* <div className="slider mt-12">
            <ul className="flex slides">
              {rankedList.map((item) => (
                <li className="slide" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ borderRadius: "4px" }}
                  />
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </section>
      {/* <section
        style={{
          position: "relative",
          height: "70vh",
          width: "100vw",
          display: "flex",
        }}
      >
        <div
          style={{
            margin: "2rem 5rem",
            overflow: "hidden",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="secondSt-slider">
            <h1>공연 랭킹</h1>
            <div>
              <ul className="secondSt-slides" style={{ display: "flex" }}>
                {rankedList.map((item) => (
                  <li className="secondSt-slide relative" key={item.id}>
                    <div style={{ position: "absolute" }}>{item.rnum}</div>
                    <div style={{ position: "relative" }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ borderRadius: "4px" }}
                      ></img>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          position: "relative",
          height: "70vh",
          width: "100vw",
          display: "flex",
        }}
      >
        <div
          style={{
            margin: "2rem 5rem",
            overflow: "hidden",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="secondSt-slider">
            <h1>티켓팅 일정 순서</h1>
            <div>
              <ul className="secondSt-slides" style={{ display: "flex" }}>
                {upcomingList.map((item) => (
                  <li className="secondSt-slide" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ borderRadius: "4px" }}
                    />
                    <p>티켓팅 날짜: {item.ticketDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
