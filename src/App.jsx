import React, { useState } from "react";
import { questions } from "./constants";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const App = () => {
  const [curr, setCurr] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [progress, setProgress] = useState({
    IDEALISTIC: 0,
    DISILLUSIONED: 0,
    CYNICAL: 0,
    HOPEFUL: 0,
  });

  const sliderLabels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];

  const handleNext = () => {
    if (curr < questions.length) {
      setCurr(curr + 1);
      setSelectedAnswer(null);
      updateProgress();
    }
  };

  const handlePrev = () => {
    if (curr > 1) {
      const previousIndex = curr - 1;

      setSelectedAnswer(null);

      const updatedProgress = { ...progress };

      if (previousIndex <= questions.length / 4) {
        updatedProgress.IDEALISTIC =
          ((previousIndex - 1) / (questions.length / 4)) * 100;
      } else if (previousIndex <= (questions.length * 2) / 4) {
        updatedProgress.DISILLUSIONED =
          ((previousIndex - 1 - questions.length / 4) /
            (questions.length / 4)) *
          100;
      } else if (previousIndex <= (questions.length * 3) / 4) {
        updatedProgress.CYNICAL =
          ((previousIndex - 1 - (questions.length * 2) / 4) /
            (questions.length / 4)) *
          100;
      } else {
        updatedProgress.HOPEFUL =
          ((previousIndex - 1 - (questions.length * 3) / 4) /
            (questions.length / 4)) *
          100;
      }

      setCurr(previousIndex);
      setProgress(updatedProgress);
    }
  };

  const handleSliderChange = (value) => {
    setSelectedAnswer(value);
  };

  const updateProgress = () => {
    const updatedProgress = { ...progress };

    if (curr <= questions.length / 4) {
      updatedProgress.IDEALISTIC = (curr / (questions.length / 4)) * 100;
    } else if (curr <= (questions.length * 2) / 4) {
      updatedProgress.DISILLUSIONED =
        ((curr - questions.length / 4) / (questions.length / 4)) * 100;
    } else if (curr <= (questions.length * 3) / 4) {
      updatedProgress.CYNICAL =
        ((curr - (questions.length * 2) / 4) / (questions.length / 4)) * 100;
    } else {
      updatedProgress.HOPEFUL =
        ((curr - (questions.length * 3) / 4) / (questions.length / 4)) * 100;
    }

    setProgress(updatedProgress);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center items-center p-8 text-2xl font-bold text-red-500 font-sans">
        ARE YOU DISILLUSIONED?
      </div>

      <div className="flex-1 bg-[#8fcbd3] flex justify-center items-center">
        <div className="flex flex-col items-center justify-center w-[80%] h-2/3 bg-white rounded-xl p-8">
          <div className="w-full flex justify-around m-4 items-end mb-8">
            {Object.keys(progress).map((key) => (
              <div key={key} className="w-1/5 h-2 bg-gray-300 rounded-full">
                <div
                  className="h-full bg-[#8fcbd3]"
                  style={{ width: `${progress[key]}%` }}
                />
                <div className="text-center text-2xl text-black">{key}</div>
              </div>
            ))}
          </div>
          <div className="text-xl text-red-500 mb-4">
            <span className="font-bold">{curr}</span>/{questions.length}
          </div>
          <div className="flex justify-center items-center m-4 text-2xl p-2">
            <div className="text-center my-4">{questions[curr - 1]}</div>
          </div>
          <div className="w-[80%] flex flex-col items-center m-4">
            <input
              type="range"
              min="1"
              max="5"
              value={selectedAnswer || 0}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-[80%] h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between w-full mt-2">
              {sliderLabels.map((label, index) => (
                <span
                  key={index}
                  className={`text-2xl ${
                    selectedAnswer === index + 1
                      ? "font-bold text-[#8fcbd3]"
                      : ""
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full ml-8">
            <button
              onClick={handlePrev}
              disabled={curr === 1}
              className={`flex items-center p-3 w-20 bg-gray-200 rounded ${
                curr === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaChevronLeft className="h-5 w-5 mr-1" />
              PREV
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null || curr === questions.length}
              className={`flex items-center p-3 w-20 bg-blue-500 text-white rounded-md mr-8 ${
                selectedAnswer === null || curr === questions.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              NEXT
              <FaChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
