import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchRandomTextAsync } from "../redux/TextSlice/TextSlice";
import Loading from "./Loading";
const Paragraph = () => {
  const dispatch = useDispatch();
  const spliceText = useSelector((state) => state.text.spliceText);
  const currentIndex = useSelector((state) => state.text.currentWordIndex);
  const trueWord = useSelector((state) => state.text.trueWord);
  const reset = useSelector((state) => state.text.reset);
  const status = useSelector((state) => state.text.status);

  useEffect(() => {
    dispatch(FetchRandomTextAsync());
  }, [reset,dispatch]);

  const setBackgroundColor = (index) => {
    if (index > currentIndex) {
      return "";
    } else if (index < currentIndex) {
      if (trueWord.includes(spliceText[index])) {
        return "#80ED99";
      } else {
        return "#FF5C58";
      }
    } else {
      return "#A2D2FF";
    }
  };

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="paragraph">
      {spliceText.map((text, index) => (
        <div key={index} className="paragraph-text">
          <div
            style={{
              backgroundColor: setBackgroundColor(index),
              borderRadius: 5,
              padding: 2,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
          >
            {text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Paragraph;
