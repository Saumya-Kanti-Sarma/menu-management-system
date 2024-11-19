import React, { useEffect, useState } from "react";
import "./ImgGrid.comp.css";

const ImgGridComponent = ({ heading, imgList, limit }) => {
  const [enlargedIndex, setEnlargedIndex] = useState(null);
  const [displayBtn, setDisplayBtn] = useState("flex");

  const handleEnlargeImg = (index) => {
    // Toggle the enlarged state for the clicked image
    setEnlargedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (limit == imgList.length) {
      setDisplayBtn("none")
    }
    else {
      setDisplayBtn("flex")
    }
  }, [])

  return (
    <div className="img-div-comp">
      <p className="img-div-comp-heading">{heading || "-| HEADING |-"}</p>
      <div className="upload-area" style={{ display: displayBtn }} >
        <p className="upload-txt">Add {heading}</p>
        <input type="file" className="upload-btn" />
      </div>

      <section className="img-div-imgArea">
        {imgList && imgList.length > 0 ? (
          <>
            {imgList.map((item, index) => (
              <img
                src={item}
                alt={`Grid Image ${index}`}
                className={`imgs-of-imgGrid ${enlargedIndex === index ? "enlarge-img" : ""}`}
                key={index}
                onClick={() => handleEnlargeImg(index)}
              />
            ))}
            {/* Upload Button Logic */}

          </>
        ) : (
          <section className="img-div-imgArea">
            {[...Array(4)].map((_, index) => (
              <div className="imgs-of-imgGrid placeholder" key={index}></div>
            ))}
          </section>

        )}
      </section>
    </div>
  );
};

export default ImgGridComponent;
