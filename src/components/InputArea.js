import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCurrentWordIndex,
  addFalseWord,
  addTrueWord,
} from "../redux/TextSlice/TextSlice";
import { useTimer } from "react-timer-hook";
import ModalComponent from "./ModalComponent";
const InputArea = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 59);
  const { seconds, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
  });
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.text.currentWordIndex);
  const spliceText = useSelector((state) => state.text.spliceText);
  const reset = useSelector((state) => state.text.reset);
  const status = useSelector((state) => state.text.status);
  const textEl = useRef();
  useEffect(() => {
    pause();
  }, [reset]);
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === " ") {
      if (spliceText[currentIndex] === input.trim(" ")) {
        dispatch(increaseCurrentWordIndex());
        dispatch(addTrueWord(input.trim(" ")));
      } else {
        dispatch(increaseCurrentWordIndex());
        dispatch(addFalseWord(input.trim(" ")));
      }
      setInput("");
      textEl.current.placeholder = "";
    }
  };
  const handleFocus = () => {
    textEl.current.placeholder = "";
    resume();
  };

  if (seconds === 0) {
    return <ModalComponent restart={restart} setInput={setInput} />;
  }

  if (status === "loading") {
    return false;
  }

  return (
    <div className="inputarea">
      <div className="inputarea-container">
        <textarea
          name=""
          id=""
          cols="150"
          rows="5"
          placeholder={"60 Saniyede ne kadar kelime yazabileceğinizi test edin"}
          value={input}
          ref={textEl}
          onChange={handleInput}
          onKeyUp={handleSubmit}
          onFocus={handleFocus}
        ></textarea>
        <div className="timerarea">
          <div className="timerarea-second">
            <span>{seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
