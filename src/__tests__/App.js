import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

test("<App/> La App funciona Correctamente la primera vez", () => {
  render(<App />);

  //  Que sea cierto el texto y se encuentre en él
  expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
  expect(screen.getByText("No hay citas")).toBeInTheDocument();
  // expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
  expect(screen.getByTestId("nombre-app").textContent).toBe(
    "Administrador de Pacientes"
  );
  //  Que sea falso y no sea un H2
  expect(screen.getByTestId("nombre-app").tagName).not.toBe("H2");
  // Que sea un H1
  expect(screen.getByTestId("nombre-app").tagName).toBe("H1");
});

test("<App/> La App funciona Correctamente la primera vez", () => {
  render(<App />);

  const mascota = screen.getByTestId("mascota");
  const propietario = screen.getByTestId("propietario");
  const fecha = screen.getByTestId("fecha");
  const hora = screen.getByTestId("hora");
  const sintomas = screen.getByTestId("sintomas");
  const tituloDinamico = screen.getByTestId("titulo-dinamico");

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

  //   Revisar por el titulo dinamico
  expect(tituloDinamico.textContent).toBe("Administra tus citas");
  expect(tituloDinamico.textContent).not.toBe("No hay citas");
});

// Verificar que las citas se añadan correctamente
test("<App/> Verifica las citas en el DOM", async () => {
  render(<App />);

  const citas = await screen.findAllByTestId("cita");

  // console.log(citas.toString());

  // Snapshot crea un archivo para verificar su contenido
  // expect(citas).toMatchSnapshot()

  expect(screen.getByTestId("btn-eliminar").tagName).toBe("BUTTON");
  expect(screen.getByTestId("btn-eliminar")).toBeInTheDocument();

  //   Verificar alguna cita
  expect(screen.getByText("Canela")).toBeInTheDocument();
});

test("<App/> Eliminar la cita", () => {
  render(<App />);

  // Verificar que existan los botones
  const btnEliminar = screen.getByTestId("btn-eliminar");
  expect(btnEliminar.tagName).toBe("BUTTON");
  expect(btnEliminar).toBeInTheDocument();

  // Simular el click
  userEvent.click(btnEliminar);

  // El botón debe desaparecer
  expect(btnEliminar).not.toBeInTheDocument();

  //   Verificar alguna cita no está
  expect(screen.queryByText("Canela")).not.toBeInTheDocument();
});
