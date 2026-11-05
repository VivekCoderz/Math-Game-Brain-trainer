import { Heart,ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Deshboard from "./Deshboard";
import GameOver from "./other/GameOver";
import { Link } from "react-router-dom";

function MathExpretion() {
  const gameCon = useRef(null);
  const [exp, setexp] = useState([]);
  const [value, setvalue] = useState("");
  const [point, setpoint] = useState(0);
  const [heart, setheart] = useState(3);
  const getInterval = useRef(null);
  const changeInterval = useRef(null);
  const [pause, setpause] = useState(false);

  const gameStart = () => {
    setpoint(0);
    setheart(3);
    setpause(false)
    setexp([]);
  }

  function expresionGen() {
    let first_num = Math.floor(Math.random() * 10) + 1;
    let second_num = Math.floor(Math.random() * 10) + 1;
    let operator = ["+", "-", "/", "*"];
    let op = Math.floor(Math.random() * 4);

    let gameWidth = gameCon.current?.clientWidth - 78.2;
    let x = Math.floor(Math.random() * gameWidth);
    setexp((prev) => [
      ...prev,
      { first_num, second_num, op: operator[op], x, y: -55 },
    ]);
  }

  useEffect(() => {
    if (!pause) {
      getInterval.current = setInterval(() => {
        expresionGen();
      }, 3000);

      changeInterval.current = setInterval(() => {
        setexp((prev) =>
          prev
            .map((ele) => {
              return {
                ...ele,
                y: ele.y + 4,
              };
            })
            .filter((ele) => {
              if (ele.y + 65 >= gameCon.current.clientHeight)
                setheart((pre) => pre - 1);
              return ele.y + 65 < gameCon.current.clientHeight;
            })
        );
      }, 50);
    } else {
      clearInterval(getInterval.current);
      clearInterval(changeInterval.current);
    }
    return function () {
      clearInterval(getInterval.current);
      clearInterval(changeInterval.current);
    };
  }, [pause]);

  useEffect(() => {
    if (heart <= 0) {
      setpause(true);
      clearInterval(getInterval.current);
      clearInterval(changeInterval.current);
    }
  }, [heart]);

  function checkAnswer() {
    exp.map((ele) => {
      let correct;
      if (ele.op == "+") correct = ele.first_num + ele.second_num;
      else if (ele.op == "-") correct = ele.first_num - ele.second_num;
      else if (ele.op == "/") correct = ele.first_num / ele.second_num;
      else if (ele.op == "*") correct = ele.first_num * ele.second_num;
      if (Number(value) === correct) {
        setpoint(point + 100);
        setexp(exp.filter((e) => e != ele));
      }
    });
  }
  return (
    <div className="h-screen relative">
      {heart <= 0 && (
        <>
          <div className="absolute inset-0 bg-black/60 z-40">
            <GameOver point={point} gameStart = {gameStart} />
          </div>
        </>
      )}
      <div
        className="h-[75%] relative overflow-hidden bg-sky-200"
        ref={gameCon}
      >
        <div className="relative flex justify-between m-2 items-baseline">
          <div className="text-white ">
          <Link to="/" className="bg-black opacity-40  px-3 py-2 rounded-2xl mb-1 inline-block flex justify-center items-center"><ArrowLeft size={15} className="inline mt-[-3px]"/>  Exit</Link>
            <div className="bg-black opacity-40  px-3 py-2 rounded-2xl">
              Your Score : <span className="font-extrabold">{point}</span>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-4  bg-black/40 px-3 py-1 rounded-xl">
            {heart >= 0 &&
              [...Array(heart)].map((ele, ind) => (
                <div>
                  <Heart key={ind} fill="red" stroke="red" />
                </div>
              ))}
          </div>
          <div
            className="text-white bg-black opacity-40  px-3 py-2 rounded-2xl cursor-pointer
"
            onClick={() => setpause(!pause)}
          >
            {pause ? "Resume" : "Pause"}
          </div>
        </div>
        <input
          disabled={pause || heart <= 0}
          type="text"
          placeholder="Type answer...."
          className="absolute rounded-xl left-1/2 -translate-x-1/2 outline-none top-15 border-2 border-sky-600 px-3 py-2"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              checkAnswer();
              setvalue("");
            }
          }}
        />
        {exp.map((ele, ind) => (
          <div
            key={ind}
            className="bg-sky-400 flex justify-center items-center  h-[65px] w-[65px] rounded-full text-white absolute boble"
            style={{ left: `${ele.x}px`, top: `${ele.y}px` }}
          >
            {ele.first_num} {ele.op} {ele.second_num}
          </div>
        ))}
      </div>
      <div className="h-[25%] bg-blue-400 border-t-4 border-blue-600"></div>
    </div>
  );
}

export default MathExpretion;
