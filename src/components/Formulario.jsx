import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {v4 as uuidv4 } from 'uuid';
import { useFormulario } from '../hooks/useFormulario';



const Formulario = ({agregarTodo}) => {

  const initialState = {
    nombre: '',
    descripcion: '',
    estado: 'pendiente',
    prioridad: false,
  };

  // const [todo, setTodo] = useState(initialState);

  const [inputs, handleChange, reset] = useFormulario(initialState);

  const {nombre, descripcion, estado, prioridad} = inputs;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ( !nombre.trim() ){
      // e.targe[0].focus();
      
      console.log(e.target[0]);
      Swal.fire({
        title: 'Error!',
        text: 'No deje el nombre en blanco.',
        icon: 'error',
      });
      return;
    }
    if(!descripcion.trim()){
      // e.targe[1].focus();
      Swal.fire({
        title: 'Error!',
        text: 'No deje el campo descripcion en blanco.',
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: "Exito",
      text: "Formulario Enviado",
      icon: "success",
    });

    agregarTodo({
      nombre: nombre,
      descripcion: descripcion,
      estado: estado === 'pendiente' ? false : true,
      prioridad: prioridad,
      id: uuidv4(),
    });

    reset();

    // console.log(todo);
  };


  // const handleChange = (e) => {
  //   const { name, value, checked, type } = e.target;
    
  //   setTodo((old) => ({
  //     ...old,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
    
  // };

  return (
    <React.Fragment>
      <h3>Agregar TODO</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          className="form-control mb-2"
          placeholder="Ingrese Todo Name"
          value={nombre}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Ingrese descripcion"
          id=""
          className="form-control mb-2"
          value={descripcion}
          onChange={handleChange}
        >
        </textarea>

        <select
          name="estado"
          className="form-control mb-2"
          value={estado}
          onChange={handleChange}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Completado">Completado</option>
        </select>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="flexCheckDefault"
            name="prioridad"
            checked={prioridad}
            onChange={handleChange}
          />
          <label htmlFor="flexCheckDefault" className="form-check-label">
            Dar prioridad
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
    </React.Fragment>
  );
};

export default Formulario