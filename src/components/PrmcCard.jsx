import React, { useState } from "react";
import ModalDetail from "./ModalDetail";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const PrmcCard = ({ item }) => {

  // 모달 관련 코드
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="m-2.5">
      {/* 공연 목록 카드 */}
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={item?.poster} alt="Loading..." />
        <Card.Body className="d-grid gap-2">
          <Card.Title>{item.prfnm}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </Card.Text>
          <Button variant="secondary" onClick={handleShow}>자세히 보기</Button>
        </Card.Body>
      </Card>

      {/* 모달 컴포넌트 */}
      <ModalDetail show={show} handleClose={handleClose} item={item} />
    </div>
  );
};

export default PrmcCard;
