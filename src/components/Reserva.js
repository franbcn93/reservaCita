import React from "react";
import PropTypes from "prop-types";

export const Reserva = ({ reserva, eliminarReserva }) => (
  <div data-testid="reserva" className="cita">
    <p>
      Destino: <span>{reserva.provincia}</span>
    </p>
    <p>
      Fecha Entrada: <span>{reserva.fechaEntrada}</span>
    </p>
    <p>
      Fecha Salida: <span>{reserva.fechaSalida}</span>
    </p>
    <p>
      Adultos: <span>{reserva.adultos}</span>
    </p>
    <p>
      Niños: <span>{reserva.niños}</span>
    </p>
    <button
      data-testid="btn-eliminar"
      className="button eliminar u-full-width"
      onClick={() => eliminarReserva(reserva.id)}
    >
      Eliminar &times;
    </button>
  </div>
);

Reserva.propTypes = {
  reserva: PropTypes.object.isRequired,
  eliminarReserva: PropTypes.func.isRequired,
};
