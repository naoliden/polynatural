export const initialState = {
  fruta: null,
  variedad: null,
  cliente: null,
  origen: null,
  destino: null,
  medicion: {n_mediciones: 0, fechas: [],},
  lab: null,
  tratamientos: {n_tratamientos: 0, tratamientos: []},
  cajas: null,
  bandejas: null,
  calibre: null
};

export const createFormReducer = (state = initialState, action) => {
  return state;
};