const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastname: "",
  confirmPassword: "",
  mobile: "",
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case "singleUpdate":
      return { ...state, [action.payload.name]: action.payload.value };
    case "onFormClear":
      return {
        email: "",
        password: "",
        firstName: "",
        lastname: "",
        confirmPassword: "",
        mobile: "",
      };

    default:
      return state;
  }
}
