import React, { useEffect, useState } from "react";
import useAuthStore from "../zustand/useAuthStore";
import "./LikeAndFavorite.css";
import axios from "axios";

const LikeAndFavorite = ({ mt20id }) => {
  const apiKey = import.meta.env.VITE_SERVER_URL;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // 인가
  const refreshToken = useAuthStore((state) => state.token); // 리프레쉬 토큰
  const accessToken = useAuthStore((state) => state.accessToken); // 유저 토큰

  const [isLike, setIsLike] = useState(false); // 좋아요 상태
  const [isLikeCount, setIsLikeCount] = useState(0); // 좋아요 카운트
  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태

  // 좋아요 상태 조회
  const getLike = async () => {
    try {
      const { data } = await axios.get(
        `${apiKey}/api/likes/mypage/performances`,
        {
          headers: {
            "Content-Type": "application/json",
            AccessToken: accessToken ? accessToken : undefined,
            RefreshToken: refreshToken ? refreshToken : undefined,
          },
        }
      );
      const findId = data.data.find((item) => item.mt20id === mt20id);
      setIsLike(findId ? findId.liked : false);
      console.log("좋아요 상태 조회 성공");
    } catch (error) {
      console.error("좋아요 상태 조회 실패 : ", error);
    }
  };

  // 좋아요 상태 변경
  const onLikeHandler = async () => {
    try {
      const response = await axios.post(
        `${apiKey}/api/likes/toggle`,
        { mt20id: mt20id },
        {
          headers: {
            "Content-Type": "application/json",
            AccessToken: accessToken ? accessToken : undefined,
            RefreshToken: refreshToken ? refreshToken : undefined,
          },
        }
      );
      setIsLike(response.data.data.liked);
      setIsLikeCount(response.data.data.likeCount);
      console.log("좋아요 상태 변경 성공");
    } catch (error) {
      console.error("좋아요 상태 변경 실패 : ", error);
    }
  };

  // 즐겨찾기 상태 조회
  const getFavorite = async () => {
    try {
      const { data } = await axios.get(`${apiKey}/api/favorite-pfmc/mypage`, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: accessToken ? accessToken : undefined,
          RefreshToken: refreshToken ? refreshToken : undefined,
        },
      });
      const findId = data.find((item) => item.performanceId === mt20id);
      setIsFavorite(findId ? findId.favorited : false);
      console.log("즐겨찾기 상태 조회 성공");
    } catch (error) {
      console.error("즐겨찾기 상태 조회 실패 : ", error);
    }
  };

  // 즐겨찾기 상태 변경
  const onFavoriteHandler = async () => {
    try {
      const response = await axios.post(
        `${apiKey}/api/favorite-pfmc/toggle`,
        { performanceId: mt20id },
        {
          headers: {
            "Content-Type": "application/json",
            AccessToken: accessToken ? accessToken : undefined,
            RefreshToken: refreshToken ? refreshToken : undefined,
          },
        }
      );
      setIsFavorite(response.data.favorited);
      console.log("좋아요 상태 변경 성공");
    } catch (error) {
      console.error("즐겨찾기 상태 변경 실패 : ", error);
    }
  };

  useEffect(() => {
    getLike();
    getFavorite();
  }, [isAuthenticated, refreshToken, accessToken, mt20id]);

  return (
    <div className="flex justify-stretch">
      <button
        className={`like-button ${isLike ? "active" : ""}`}
        onClick={onLikeHandler}
        disabled={!isAuthenticated}
      >
        {isLike ? "❤️" : "🤍"} {isLikeCount}
      </button>
      <button
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        onClick={onFavoriteHandler}
        disabled={!isAuthenticated}
      >
        {isFavorite ? "★" : "☆"} 즐겨찾기
      </button>
    </div>
  );
};

export default LikeAndFavorite;
