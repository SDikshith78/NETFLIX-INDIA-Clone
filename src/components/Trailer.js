import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import YouTube from "react-youtube";

const Trailer = ({ videoId, onClose, trailerContainerRef }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const opts = {
    height: "500",
    width: "80%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleOutsideClick = (e) => {
    if (
      trailerContainerRef &&
      trailerContainerRef.current &&
      !trailerContainerRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose, trailerContainerRef]);

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setShowTrailer(false);
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "1000",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "80%", position: "relative" }}>
        <YouTube videoId={videoId} opts={opts} />
        <button
          onClick={handleCloseClick}
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("trailer-root")
  );
};

export default Trailer;
