'use client';
import React from 'react';
import { X, Save } from 'lucide-react';

function Modal({isOpen, CloseModal, text, setText, onSave}) {
  if (!isOpen) return null;

  const MostrarEditar = (e) => {
      setText(e.target.value);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className=" w-1/3 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md">
        <button className="absolute top-2 right-2 text-red-500" onClick={CloseModal}> <X color="red" size={28} /> </button>
        <p className="text-black pl-4 text-lg mt-5">Editar tarea</p>
        <div className="p-4 rounded-sm flex justify-center items-center gap-2">
            <input className='w-full border rounded h-8 text-black px-2' value={text} onChange={MostrarEditar} type="text" />
            <button className='font-bold px-2 rounded h-8 border hover:bg-gray-400' onClick={onSave}><Save color='blue' size={28} /></button>
        </div>
      </div>
    </div>
  );
}

export default Modal