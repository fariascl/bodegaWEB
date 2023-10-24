import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import * as React from "react";
import axios from "axios";
import api_URL from "../api/api";

export default function Index() {
  /* Loaders */
  const [loaded, setLoaded] = React.useState(false);
  const [modeloloaded, setModeloLoaded] = React.useState(false);
  const [marcasloaded, setMarcasLoaded] = React.useState(false);
  const [dispositivosloaded, setDispositivosLoaded] = React.useState(false);

  const [bodegas, setBodegas] = React.useState([]);

  /* Fin Loaders */

  const [bodega, setBodega] = React.useState("");
  const [marcas, setMarcas] = React.useState([]);
  const [marca, setMarca] = React.useState("");
  const [modelos, setModelos] = React.useState([]);
  const [modelo, setModelo] = React.useState("");
  const [dispositivos, setDispositivos] = React.useState([]);

  /* Handlers */

  const handleBodega = (event) => {
    getMarcas(event.target.value);
    setBodega(event.target.value);
    setMarca("");
    setModelo("");
    setMarcasLoaded(true);
    setModeloLoaded(false);
    setDispositivosLoaded(false);
  };

  const handleMarca = (event) => {
    getModelos(event.target.value);
    setMarca(event.target.value);
    setModelo("");
    setDispositivosLoaded(false);
  };

  const handleModelo = (event) => {
    getDispositivos(event.target.value);
    setModelo(event.target.value);
    setDispositivosLoaded(false);
  };

  /* Fin Handlers */

  const getBodegas = async () => {
    axios
      .get(`${api_URL}/bodegas/all`)
      .then((response) => {
        setBodegas(response.data.bodegas);
        setLoaded(true);
      })
      .catch((error) => {
        // Aquí se podría poner un mensaje de error... lo veré después
        console.log(error);
      });
  };

  const getMarcas = async () => {
    axios
      .get(`${api_URL}/marcas/all`)
      .then((response) => {
        setMarcas(response.data.marcas);
      })
      .catch((error) => {
        // Aquí se podría poner un mensaje de error... lo veré después
        console.log(error);
      });
  };


  const getModelos = async (marca) => {
    axios
      .get(`${api_URL}/modelos/getbymarca/${marca}`)
      .then((response) => {
        setModelos(response.data.modelos);
        setModeloLoaded(true);
      })
      .catch((error) => {
        // Aquí se podría poner un mensaje de error... lo veré después
        console.log(error);
      });
  };

  const getDispositivos = async (modelo) => {
    axios
      .get(`${api_URL}/dispositivos/get/${bodega}/${modelo}`)
      .then((response) => {
        console.log(modelo)
        console.log(dispositivos)
        setDispositivos(response.data.dispositivos);
        setDispositivosLoaded(true);
      })
      .catch((error) => {
        // Aquí se podría poner un mensaje de error... lo veré después
        console.log(error);
      });
  };

  React.useEffect(() => {
    getBodegas();
  }, []);

  if (!loaded) {
    return <div>Cargando...</div>;
  }
  return (
    <Container>
      <Box padding={4} sx={{ width: 800, height: 800, margin: "auto" }}>
        <Typography variant="h4" textAlign={"center"} gutterBottom>
          Ejercicio para mundo
        </Typography>
        <Box padding={2}>
          <FormControl fullWidth>
            <InputLabel id="regiones">Bodega</InputLabel>
            <Select
              labelId="bodegas"
              label="Bodega"
              value={bodega}
              onChange={handleBodega}
            >
              {bodegas.map((bodega, index) => (
                <MenuItem key={index} value={bodega.id}>
                  {bodega.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box padding={2}>
          <FormControl fullWidth>
            <InputLabel id="marcas">Marcas</InputLabel>
            <Select
              labelId="marcas"
              label="Marcas"
              value={marca}
              onChange={handleMarca}
              disabled={marcasloaded ? false : true}
            >
              {marcas.map((marca, index) => (
                <MenuItem key={index} value={marca.id}>
                  {marca.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box padding={2}>
          <FormControl fullWidth>
            <InputLabel id="modelos">Modelos</InputLabel>
            <Select
              labelId="modelos"
              label="Modelos"
              value={modelo}
              onChange={handleModelo}
              disabled={modeloloaded ? false : true}
            >
              {modelos.map((modelo, index) => (
                <MenuItem key={index} value={modelo.id}>
                  {modelo.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              {dispositivosloaded ? (
                dispositivos.length > 0 ? (
                  dispositivos.map((dispositivo, index) => (
                    <ListItem key={index}>
                      <ListItemText key={index}>{dispositivo.id} - {dispositivo.nombre} - {dispositivo.modelo.marca.nombre} - {dispositivo.modelo.nombre} - {dispositivo.bodega.nombre}</ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>No hay dispositivos para mostrar</ListItem>
                )
              ) : (
                ""
              )}
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
