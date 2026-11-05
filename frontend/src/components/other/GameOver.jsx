import React from 'react'
import { Link } from 'react-router-dom'

function GameOver({point,gameStart}) {
  return (
    <div className='flex flex-col justify-between items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-[#0f0f0f] text-white p-8 rounded-2xl'>
        <h1 className='text-red-900 font-stretch-condensed text-4xl font-bold'>Game Over!</h1>
        <p className='text-4xl font-extrabold'>{point}</p>
        <p className='mb-5'>Your Score</p>
        <div>
            <Link to="/" className='px-8 py-2 rounded-3xl bg-[#353535] mr-3' >Return to Menu</Link>
            <button className='px-8 py-2 rounded-3xl bg-[#353535]' onClick={gameStart}>Try again</button>
        </div>
    </div>
  )
}

export default GameOver