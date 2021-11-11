import React, { Fragment, useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";
import { Reserva } from "./components/Reserva";

function App() {
  // reservas en el localStorage
  let ReservasIniciales = JSON.parse(localStorage.getItem("reservas"));
  if (!ReservasIniciales) {
    ReservasIniciales = [];
  }
  //  Arreglo de reservas
  const [reservas, guardarReservas] = useState(ReservasIniciales);

  //  UseEffect para realizar ciertas operaciones cuando el satte cambia
  useEffect(() => {
    if (ReservasIniciales) {
      localStorage.setItem("reservas", JSON.stringify(reservas));
    } else {
      localStorage.setItem("reservas", JSON.stringify([]));
    }
  }, [reservas, ReservasIniciales]);

  // Función que tome las reservas actuales y agregue la nueva
  const crearReserva = (reserva) => {
    guardarReservas([...reservas, reserva]);
  };

  // Función que elimina una cita por su id
  const eliminarReserva = (id) => {
    const nuevasReservas = reservas.filter((reserva) => reserva.id !== id);
    guardarReservas(nuevasReservas);
  };

  // console.log(destinoViaje);

  // Mensaje condicional
  const titulo =
    reservas.length === 0
      ? "No hay ninguna reserva todavía"
      : "Administra tus reservas";

  const punto = ".";
  return (
    <Fragment>
      <h1 data-testid="nombre-app">Administrador de Reserva Hotel</h1>;
      <div className="container">
        <div className="row">
          <div className="five columns">
            <Formulario crearReserva={crearReserva} />
          </div>
          <div className="two columns">{punto}</div>
          <div className="five columns">
            <h2 data-testid="titulo-dinamico">{titulo}</h2>
            {reservas.map((reserva) => (
              <Reserva
                key={reserva.id}
                reserva={reserva}
                eliminarReserva={eliminarReserva}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
