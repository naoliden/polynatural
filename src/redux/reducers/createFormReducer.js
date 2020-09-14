// Si hay 0 bandejas, la medición fue hecha a granel.
export const initialState = {
  fruit: null,
  variety: null,
  unidad_experimental: null,
  cantidad_ue: 0,
  lab: true,
  client: "",
  origen: {},
  destino: {},
  tratamientos: [],
  mediciones: [],
  comentarios: "",
  calibre: 0,
  cajas: 0,
  unidades_por_tratamiento: 0,
};

export const createFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case "UPDATE_FORM":
      return { ...action.payload }
    default:
      return state
  }
};