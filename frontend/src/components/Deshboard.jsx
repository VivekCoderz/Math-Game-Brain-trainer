import React from "react";
import GameCard from "./other/GameCard";
function Deshboard() {
  return (
    <div className="grid grid-cols-[260px_1fr] h-screen ">
      <div className="p-4 bg-black"></div>
      <div className="bg-linear-to-br from-gray-900 via-slate-800 to-gray-900 text-white h-screen p-6">
        <h1 className="font-bold text-3xl">Train Your Brain</h1>
        <p className="text-gray-400">
          Sharpen Your mind with quick, fun challenges every day
        </p>

        <main className="grid grid-cols-[70%_30%] mt-9">
          
          <div className="grid grid-cols-2 gap-3 mr-4">
            <GameCard/>
            <GameCard/>
          </div>

          <div className="bg-linear-to-br from-indigo-700 to-purple-800  rounded-2xl border-3 border-gray-500">
            <div className="flex justify-between items-center px-4 pt-4">
              <h1 className="font-semibold text-2xl">Leaderboard</h1>
              <div className="flex justify-center items-center bg-purple-500 rounded-3xl p-1">
                <p className="bg-transparent text-gray-300 rounded-2xl px-2 py-1 text-[14px] hover:bg-white/25">All Time</p>
                <p className="bg-transparent text-gray-300 rounded-2xl px-2 py-1 text-[14px] hover:bg-white/25">Week</p>
                <p className="bg-transparent text-gray-300 rounded-2xl px-2 py-1 text-[14px] hover:bg-white/25">Month</p>
              </div>
            </div>
            <div className="flex justify-between items-center my-3 gap-3 px-4">
              <p className="bg-transparent px-4 py-1 rounded-2xl border border-indigo-400 hover:bg-white hover:text-black ">All</p>
              <p className="bg-transparent px-4 py-1 rounded-2xl border border-indigo-400 hover:bg-white hover:text-black ">Memory</p>
              <p className="bg-transparent px-4 py-1 rounded-2xl border border-indigo-400 hover:bg-white hover:text-black ">Math</p>
              <p className="bg-transparent px-4 py-1 rounded-2xl border border-indigo-400 hover:bg-white hover:text-black ">Train</p>
            </div>
            <div className="h-70 flex justify-center items-center mt-6">
              Arive Soon
            </div>
            <div className="h-50 bg-linear-to-br from-gray-900 via-slate-800 to-gray-900 text-white rounded-2xl rounded-t-4xl mt-[-25px]">
              
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default Deshboard;
