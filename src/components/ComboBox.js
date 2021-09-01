/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ciudades from "../Others/Cities";

export default function ComboBox({ crearProvincia }) {
  const [destino, setDestino] = useState([]);

  const handleChange = (event, value) => setDestino(value);

  crearProvincia(destino);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={ciudades}
      getOptionLabel={(option) => option.provincia}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="¿A dónde vas?" variant="outlined" />
      )}
    />
  );
}
