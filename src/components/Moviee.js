import React, { useState, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import movieTrailer from "movie-trailer";
import Trailer from "./Trailer";

const Moviee = ({ item, onClick, playTrailer }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const trailerContainerRef = useRef(null);

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save the movie/series ");
    }
  };

  const handleTrailerClick = async () => {
    try {
      const url = await movieTrailer(null, { tmdbId: item?.id });
      console.log("URL:", url);
      console.log("Item:", item);

      if (url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setShowTrailer(true);
      } else {
        console.log("Trailer not found");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    saveShow();
  };

  const handleImageClick = async () => {
    onClick(item);
    handleTrailerClick();
  };

  return (
    <div
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
      onClick={handleImageClick}
    >
      <img
        className="w-full h-[150px] sm:h-[180px] md:h-[220px] lg:h-[260px] object-cover block"
        src={
          item?.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`
            : "https://via.placeholder.com/500x750?text=Image+Not+Available"
        }
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={handleSaveClick}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
      {trailerUrl && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "1000",
          }}
        >
          {showTrailer && (
            <Trailer
              videoId={trailerUrl}
              onClose={() => {
                setShowTrailer(false);
                setTrailerUrl("");
              }}
              trailerContainerRef={trailerContainerRef}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Moviee;
