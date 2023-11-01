"use client";
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Check } from "lucide-react";
import Modal from "./Modal.jsx";
import Checkbox from "./Checkbox.jsx";

function Toapp() {
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editarIndex, setEditarIndex] = useState(null);
  const [editar, setEditar] = useState("");
  const [tareas, setTareas] = useState([]);

  const Llamar = () => {
    if (typeof window !== "undefined") {
      const storedTareas = localStorage.getItem("tareas");
      if (storedTareas !== null) { 
        try {
          return JSON.parse(storedTareas);
        } catch (error) {
          console.error("Error al parsear datos del localStorage:", error);
          return [];
        }
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  useEffect(() => {
    const initialTareas = Llamar();
    if (initialTareas.length > 0) {
      setTareas(initialTareas);
    }
  }, []);

  
  const resultado = () => {
    if (input !== undefined && input.trim() !== "") {
      const nuevasTar = [...tareas, { tarea: input, isChecked: false }];
      setTareas(nuevasTar);
      localStorage.setItem("tareas", JSON.stringify(nuevasTar));
      setInput("");
    }
  };

  const mostrarCheck = (index, checked) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].isChecked = checked;
    setTareas(nuevasTareas);
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
  };

  const Eliminar = (index_remove) => {
    const nuevasTareas = tareas.filter((tarea, index) => {
      if (index !== index_remove) {
        return tarea;
      }
    });
    setTareas(nuevasTareas);
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
  };

  const MostrarEditar = (index) => {
    setEditarIndex(index); //toma la key del texto seleccionado
    setEditar(tareas[index].tarea); //toma el texto de lo seleccionado
    setIsModalOpen(true);
  };

  const GuardarEditar = () => {
    if (editar.trim() !== "") {
      const nuevastareas = [...tareas];
      nuevastareas[editarIndex].tarea = editar;
      setTareas(nuevastareas);
      setIsModalOpen(false);
      localStorage.setItem("tareas", JSON.stringify(nuevastareas));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex py-10 gap-3 w-4/12">
        <input
          className="border rounded bg-gray-50 flex-grow h-10 px-2 text-black" placeholder="Escribe una nueva tarea"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          type="text"
        />
        <button
          className="bg-green-700 font-bold rounded px-3 hover:bg-blue-600 text-gray-50 h-9"
          onClick={resultado}
        >
          Agregar
        </button>
      </div>
      {tareas.length !== 0 ? (
        <div className="flex flex-col gap-3 w-4/12">
          {tareas.map((tarea, index) => {
            return (
              <div className="flex gap-2" key={index}>
                <div className="p-2 flex border bg-gray-200 font-normal justify-between rounded text-black flex-grow">
                  <div className="flex">
                    <Checkbox
                      isChecked={tarea.isChecked}
                      onCheck={(checked) => mostrarCheck(index, checked)}
                    />
                    {tarea.tarea}
                  </div>
                  {tarea.isChecked && <Check className="" color="blue" />}
                </div>

                <div className="flex justify-center items-center gap-3 px-2">
                  <button onClick={() => MostrarEditar(index)}>
                    <Pencil color="green" size={28} />
                  </button>
                  <Modal
                    isOpen={isModalOpen}
                    CloseModal={() => setIsModalOpen(false)}
                    text={editar}
                    setText={setEditar}
                    onSave={GuardarEditar}
                  />
                  <button
                    onClick={() => {
                      Eliminar(index);
                    }}
                  >
                    <Trash2 color="red" size={28} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Toapp;
