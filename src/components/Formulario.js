import React, { Fragment, useState } from "react";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";

export const Formulario = ({ crearCita }) => {
  // Crear State de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, actualizarError] = useState(false);

  //   Función que se ejecuta cada vez que el usuario escribe en el input
  const actualizarState = (e) =>
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });

  // Extraer valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Cuando el usuario presiona agregar cita
  const submitCita = (e) => {
    e.preventDefault();

    
    //   Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }

    // Eliminarel mensaje previo
    actualizarError(false);

    //   Asignar iD
    cita.id = uuid();
    console.log(cita);

    // Crear cita
    crearCita(cita);

    // Reiniciar el form
  };

  return (
    <Fragment>
      <h2 data-testid="titulo">Crear citas</h2>
      {error ? (
        <p data-testid="alerta" className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita} action="">
        <label htmlFor="">Nombre mascota</label>
        <input
          data-testid="mascota"
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label htmlFor="">Nombre dueño</label>
        <input
          data-testid="propietario"
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre dueño mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label htmlFor="">Fecha</label>
        <input
          data-testid="fecha"
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label htmlFor="">Hora</label>
        <input
          data-testid="hora"
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label htmlFor="">Síntomas</label>
        <textarea
          data-testid="sintomas"    
          name="sintomas"
          id=""
          style={{ width: "100%" }}
          rows="10"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button 
        data-testid="btn-submit"
        type="submit" 
        className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};
