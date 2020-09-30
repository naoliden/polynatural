export const SAVE_FORM = "SAVE_FORM";
export const LOAD_FORM = "LOAD_FORM";


export const SaveForm = (form_data) => ({
  type: SAVE_FORM,
  payload: form_data
});
