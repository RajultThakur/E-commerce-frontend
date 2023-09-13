import React from 'react'

export default function Card({day, count, revenue}) {
  return (
    <div className='flex flex-col justify-center gap-2 items-center h-max px-[20px] py-[10px] bg-white w-[250px] shadow-lg
    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
      <h1 className='font-bold text-lg text-[#888888]'>{day.toUpperCase()}</h1>
      <h1 className='font-bold text-4xl text-[#7272be]'>{revenue === "" ? count : `₹ ${revenue}`}</h1>
      <h1 className='font-medium text-sm text-[#888888]'>{`${count} orders ${day}`}</h1>
    </div>
  )
}
