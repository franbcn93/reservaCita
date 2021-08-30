import React from "react";
import PropTypes from "prop-types";

export const Reserva = ({ cita, eliminarCita }) => (
  <div data-testid="cita" className="cita">
    <p>
      Destino: <span>{cita.destino}</span>
    </p>
    <p>
      Fecha Entrada: <span>{cita.fechaEntrada}</span>
    </p>
    <p>
      Fecha Salida: <span>{cita.fechaSalida}</span>
    </p>
    <p>
      Adultos: <span>{cita.adultos}</span>
    </p>
    <p>
      Niños: <span>{cita.niños}</span>
    </p>
    <button
      data-testid="btn-eliminar"
      className="button eliminar u-full-width"
      onClick={() => eliminarCita(cita.id)}
    >
      Eliminar &times;
    </button>
  </div>
);

Reserva.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired,
};
