import React, { Fragment, useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";
import { Cita } from "./components/Cita";

function App() {
  // Citas en el localStorage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  //  Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //  UseEffect para realizar ciertas operaciones cuando el satte cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Función que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  // Mensaje condicional
  const titulo =
    citas.length === 0 ? "No hay reservas" : "Administra tus reservas";

  const punto = ".";
  return (
    <Fragment>
      <h1 data-testid="nombre-app">Administrador de Reserva Hotel</h1>;
      <div className="container">
        <div className="row">
          <div className="five columns">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="two columns">{punto}</div>
          <div className="five columns">
            <h2 data-testid="titulo-dinamico">{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
