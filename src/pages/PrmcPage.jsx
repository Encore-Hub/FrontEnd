import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useTheaterStore from "../zustand/useTheatersStore";
import PrmcCard from "../components/PrmcCard";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const PrmcPage = () => {
  const apiKey = import.meta.env.VITE_SERVER_URL;

  const { theaterId } = useParams(); 

  const [prmcList, setPrmcList] = useState([]); // 공연 목록 상태

  // 데이터 READ
  // const getPrmc = async () => {
  //     let url = `${apiKey}/api/theaters/theaterId`;
  //     let response = await fetch(url);
  //     let data = await response.json();
  //     console.log(data.performances)
  //     setPrmcList(data.performances);
  // };
  
  // useEffect(() => {
  //   getPrmc();
  // }, []);


  useEffect(() => {
    if (theaterId) {
      const getPrmc = async () => { 
        try {
          const url = `/api/theaters/${theaterId}`;
          const response = await axiosInstance.get(url);
          setPrmcList(response.data.performances);
        } catch (error) {
          console.error("Error fetching performances", error);
        }
      };
      getPrmc(); 
    } }, [theaterId]); 

  return (
    <div>
      <h1>공연</h1>
      <Container>
        <Row>
          {prmcList.map((item) => {
            return (
              <Col key={item.mt20id} lg={3}>
                <PrmcCard item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default PrmcPage;
