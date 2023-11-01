import React, { useState } from 'react'

function Checkbox({ isChecked, onCheck }) {

  const StatusChecked = () => {
    onCheck(!isChecked);
  }

  return (
    <div className="flex items-center justify-center pr-3">
        <label className='flex items-center cursor-pointer space-x-2'>
            <input className='h-5 w-5 appearance-none border rounded-full border-blue-600 checked:bg-blue-600 cursor-pointer checked:border-transparent' type="checkbox" checked={isChecked} onChange={StatusChecked} />
        </label>
    </div>
    
  )
}

export default Checkbox