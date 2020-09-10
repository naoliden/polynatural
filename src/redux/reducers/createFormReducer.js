// Si hay 0 bandejas, la medición fue hecha a granel.

export const initialState = {
  fruta: "",
  variedad: "",
  cliente: "",
  origen: "",
  destino: "",
  lab: true,
  mediciones: [],
  unidades_por_tratemiento: 0,
  tratamientos: [{nombre: "T0", etiqueta:""}],
  cajas: 0,
  bandejas: 0,
  calibre: 0,
  comentarios: "",
};

export const createFormReducer = (state = initialState, action) => {
  return state;
};