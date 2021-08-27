// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Formulario } from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"

const crearCita = jest.fn();

test("<Formulario/> Que el Formulario cargue correctamente", () => {
  // const wrapper = render(<Formulario />);
  // wrapper.debug();

  // Validación del Formulario
  render(<Formulario crearCita={crearCita}/>)

  // HEADING
  const titulo=screen.getByTestId("titulo");
  // Esperando que esté en el documento
  expect( screen.getByText("Crear citas")).toBeInTheDocument();
  // Esperando que contenga una etiqueta H2
  expect( titulo.tagName).toBe("H2");
  // Esperando que el contenido de la etiqueta H2 sea "Crear citas"
  expect( titulo.textContent).toBe("Crear citas");
  // Esperando que NO contenga una etiqueta H2
  expect( titulo.tagName).not.toBe("H1");
  // Esperando que el contenido de la etiqueta H2 NO sea "Crear cita"
  expect( titulo.textContent).not.toBe("Crear cita");

  // BUTTON
  // Esperando que tenga una etiqueta Botón
  expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON");

});

test("<Formulario/> Validación del formulario", () => {
  // Validación del Formulario
  render(<Formulario crearCita={crearCita}/>);

  // Click en el botón de Submit
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  // Revisar por la alerta
  const alerta = screen.getByTestId("alerta");
  expect(alerta).toBeInTheDocument();
  expect(alerta.textContent).toBe("Todos los campos son obligatorios");
  expect(alerta.textContent).not.toBe("Error");
  expect(alerta.tagName).toBe("P");

});

test("<Formulario/> Validación la citas del formulario", () => {
  // Validación del Formulario
  render(<Formulario crearCita={crearCita}/>);

  const mascota = screen.getByTestId("mascota");
  const propietario = screen.getByTestId("propietario");
  const fecha = screen.getByTestId("fecha");
  const hora = screen.getByTestId("hora");
  const sintomas = screen.getByTestId("sintomas");

  userEvent.type(mascota, "Canela");
  userEvent.type(propietario, "Paquito");
  userEvent.type(fecha, "2021-09-21");
  userEvent.type(hora, "12:30");
  userEvent.type(sintomas, "Dolor abdominal");

  // Click en el botón de Submit
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  // Revisar que no nos dé un mensaje de alerta
  const alerta = screen.queryByTestId("alerta");
  expect(alerta).not.toBeInTheDocument();

  // Crear cita y comprobar que la función se haya llamado
  expect(crearCita).toHaveBeenCalled();
  expect(crearCita).toHaveBeenCalledTimes(1);
  
});


