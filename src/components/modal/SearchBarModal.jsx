import { useState, useEffect } from "react";
import { useFetchRegions, useFetchTheaters } from "../../hooks/useTheaters";
import { useNavigate } from "react-router-dom";
// import {
//   useFetchFavoriteTheaters,
//   useAddFavoriteTheater,
//   useRemoveFavoriteTheater,
// } from "../../hooks/useFavoriteTheaters";
import useTheaterStore from "../../zustand/useTheatersStore";
import Modal from "../modal/Modal";
import { TECollapse } from "tw-elements-react";
import {
  List,
  ListItem,
  RegionList,
  VenueList,
  VenueItem,
  RegionItems,
  StyledRegionWrapper,
  StyledFavWrap,
  StyledFav,
} from "./SearchBarModal.styled";
import useAuthStore from "../../zustand/useAuthStore";
import { fetchRegions } from "../../api/theaters";

const SearchBarModal = ({ isVisible, onClose }) => {
  // 지역
  const {
    data: regions,
    isLoading: isRLoading,
    isError: isRError,
    error: Rerror,
  } = useFetchRegions();

  const {
    storeRegions,
    setSelectedRegion,
    selectedRegion,
    setRegions,
    selectedTheater,
    setSelectedTheater,
  } = useTheaterStore((state) => ({
    storeRegions: state.region,
    selectedRegion: state.selectedRegion,
    setSelectedRegion: state.setSelectedRegion,
    setRegions: state.setRegions,
    selectedTheater: state.selectedTheater,
    setSelectedTheater: state.setSelectedTheater,
  }));

  // 공연장;
  const {
    data: theaters,
    isLoading: isTLoading,
    isError: isTError,
    error: Terror,
  } = useFetchTheaters(selectedRegion);

  // 즐겨찾기
  // const {
  //   data: favoriteTheaters,
  //   isLoading: isFavLoading,
  //   isError: isFavError,
  //   error: FavError,
  // } = useFetchFavoriteTheaters();

  // const { mutate: addFavorite } = useAddFavoriteTheater();
  // const { mutate: removeFavorite } = useRemoveFavoriteTheater();

  const handleButtonClick = (region, event) => {
    event.preventDefault();
    setSelectedRegion(region);
    console.log(region);
  };

  const { isAuthenticated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  const [activeElement, setActiveElement] = useState("");

  const handleClick = (value) => {
    setActiveElement((prev) => (prev === value ? "" : value));
  };

  useEffect(() => {
    if (regions) {
      setRegions(regions.gugunnms);
    }
  }, [regions, setRegions]);

  useEffect(() => {
    fetchRegions();
    console.log(isAuthenticated);
    console.log(regions);
    console.log(theaters);
    console.log(storeRegions);
    console.log(selectedTheater);
  }, [fetchRegions(), selectedTheater, storeRegions]);

  // const [selectedVenue, setSelectedVenue] = useState(null);

  // const handleAddFavoriteClick = (theater) => {
  //   // if (!isAuthenticated) {
  //   //   console.log("로그인 후 즐겨찾기 추가");
  //   //   return;
  //   // }
  //   if (favoriteTheaters.some((fav) => fav.id === theater.id)) {
  //     // If the theater is already in favorites, remove it
  //     removeFavorite(theater.id);
  //   } else {
  //     // Otherwise, add it to favorites
  //     addFavorite(theater.venue, theater.id);
  //   }
  // };

  const navigate = useNavigate();
  const setTheaterClickHandler = (theater, event) => {
    setSelectedTheater(theater);
    navigate(`/prmcpage/${theater}`);
  };

  if (isRLoading) return <p>Loading...</p>;
  if (isRError) return <p>Error: {Rerror.message}</p>;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <StyledRegionWrapper>
        {/* 즐겨찾기 공연장 */}
        <StyledFavWrap>
          <StyledFav
            onClick={() => handleClick("element1")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <span>즐겨찾는 공연장</span>
            <span
              className={`${
                activeElement === "element1"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529]  dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </StyledFav>
          <TECollapse
            show={activeElement === "element1"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div
              className="px-4 py-3"
              style={{ height: "100px", overflow: "auto" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* <List>
                  {favoriteTheaters.length > 0 ? (
                    favoriteTheaters.map((theater) => (
                      <ListItem
                        key={theater.id}
                        className="flex justify-between items-center"
                      >
                        <span>{theater.venue}</span>
                        <button onClick={() => handleAddFavoriteClick(theater)}>
                          {favoriteTheaters.some(
                            (fav) => fav.id === theater.id
                          ) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="rgb(138, 14, 196)"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="rgb(138, 14, 196)"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="rgb(138, 14, 196)"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          )}
                        </button>
                      </ListItem>
                    ))
                  ) : (
                    <p>No favorite theaters</p>
                  )}
                </List> */}
              </div>
            </div>
          </TECollapse>
        </StyledFavWrap>

        {/* 지역 */}
        <RegionList>
          <ListItem
            style={{
              width: "30%",
              backgroundColor: "rgb(138, 14, 196)",
              color: "rgb(255,255,255)",
            }}
          >
            <button>
              <p>서울</p>
            </button>
          </ListItem>
          <RegionItems style={{ height: "calc(100% - (48px + 2rem))" }}>
            <div>
              {regions.gugunnms.map((region, index) => (
                <ListItem
                  key={index}
                  onClick={(event) => handleButtonClick(region, event)}
                  className="block cursor-pointer rounded-lg p-2 text-left transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
                  style={
                    selectedRegion === region
                      ? {
                          backgroundColor: "rgb(138, 14, 196)",
                          color: "rgb(255,255,255)",
                        }
                      : { backgroundColor: "rgb(255,255,255)" }
                  }
                >
                  {region}
                </ListItem>
              ))}
            </div>
          </RegionItems>
        </RegionList>
      </StyledRegionWrapper>

      {/* 공연장 */}
      <div
        style={{
          width: "60%",
          margin: "0 1rem",
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: ".75rem 1rem",
            fontSize: ".75rem",
            backgroundColor: "rgb(245,245,245)",
            marginBottom: ".5rem",
            borderRadius: "4px",
          }}
        >
          <p>공연장 별 공연 정보를 확인하세요! (지역 > 공연장 선택)</p>
          <p>자주 찾는 공연장을 즐겨찾기에 추가할 수 있습니다.</p>
        </div>
        {selectedRegion ? (
          theaters ? (
            <VenueList>
              {theaters.map((theater, index) => (
                <VenueItem
                  key={index}
                  className="inline-block rounded px-6 pb-2 pt-2.5 text-s font-medium uppercase leading-normal text-grey shadow-[0_4px_9px_-4px_#ccc] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ justifyContent: "space-between" }}
                  onClick={(event) => {
                    setTheaterClickHandler(
                      theater.mt10id,
                      event
                    );
                  }}
                >
                  <button style={{ marginRight: "5px" }}>
                    {theater.fcltynm}
                  </button>
                  <button onClick={() => handleAddFavoriteClick(theater)}>
                    {!isAuthenticated ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="rgb(245, 245, 245)"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="rgb(245, 245, 245"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    ) : (
                      // favoriteTheaters.some((fav) => fav.mt10id === theater.mt10id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="rgb(138, 14, 196)"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    )}
                  </button>
                </VenueItem>
              ))}
            </VenueList>
          ) : (
            <p>No theaters available</p>
          )
        ) : (
          <p>원하는 지역을 선택하세요!</p>
        )}
      </div>
    </Modal>
  );
};

export default SearchBarModal;
