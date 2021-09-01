import React, { Fragment, useState } from "react";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ciudades from "../Others/Cities";

export const Formulario = ({ crearReserva }) => {
  // Guardo la provincia escogida y reservo los otros
  // datos si es que han sido introducidos
  // Si el value no es null, guardo los cambios
  const handleChange = (event, value) =>
    value
      ? actualizarReserva({
          ...reserva,
          provincia: value.provincia,
        })
      : null;

  // Crear State de Reservas
  const [reserva, actualizarReserva] = useState({
    provincia: "",
    fechaEntrada: "",
    fechaSalida: "",
    adultos: 1,
    niños: 0,
  });

  const [error, actualizarError] = useState(false);

  //   Función que se ejecuta cada vez que el usuario escribe en el input
  const actualizarState = (e) =>
    actualizarReserva({
      ...reserva,
      [e.target.name]: e.target.value,
    });

  // Extraer valores
  const { provincia, fechaEntrada, fechaSalida, adultos, niños } = reserva;

  // Encontrar el dia de hoy
  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  //Cuando el usuario presiona "Agregar Reserva"
  const submitReserva = (e) => {
    e.preventDefault();

    //   Validar
    if (
      provincia.length === 0 ||
      fechaEntrada.trim() === "" ||
      fechaSalida.trim() === ""
    ) {
      actualizarError(true);
      return;
    }

    // Eliminarel mensaje previo
    actualizarError(false);

    //   Asignar iD
    reserva.id = uuid();
    console.log(reserva);

    // Crear Reserva
    crearReserva(reserva);

    // Reiniciar el form
    actualizarReserva({
      // provincia: "",
      fechaEntrada: "",
      fechaSalida: "",
      adultos: 1,
      niños: 0,
    });
  };

  return (
    <Fragment>
      <h2 data-testid="titulo">Crear reserva</h2>
      {error ? (
        <p data-testid="alerta" className="alerta-error">
          Todos los campos son obligatorios
        </p>
      ) : null}
      <form onSubmit={submitReserva} action="">
        <label htmlFor="">Destino de tu viaje</label>
        <Autocomplete
          id="combo-box-demo"
          options={ciudades}
          getOptionLabel={(option) => option.provincia}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="¿A dónde vas?" variant="outlined" />
          )}
        />

        <label htmlFor="">Fecha Entrada</label>
        <input
          data-testid="fechaEntrada"
          type="date"
          name="fechaEntrada"
          min={today}
          className="u-full-width"
          onChange={actualizarState}
          value={fechaEntrada}
        />
        <label htmlFor="">Fecha Salida</label>
        <input
          data-testid="fechaSalida"
          type="date"
          name="fechaSalida"
          min={fechaEntrada}
          className="u-full-width"
          onChange={actualizarState}
          value={fechaSalida}
        />
        <Row>
          <Col>
            <label htmlFor="">Adultos</label>
            <input
              data-testid="adultos"
              type="number"
              name="adultos"
              min="1"
              className="u-full-width"
              onChange={actualizarState}
              value={adultos}
            />
          </Col>
          <Col>
            <label htmlFor="">Niños</label>
            <input
              data-testid="niños"
              type="number"
              name="niños"
              min="0"
              className="u-full-width"
              onChange={actualizarState}
              value={niños}
            />
          </Col>
        </Row>

        <button
          data-testid="btn-submit"
          type="submit"
          className="u-full-width button-primary"
        >
          Agregar Reserva
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearReserva: PropTypes.func.isRequired,
};
