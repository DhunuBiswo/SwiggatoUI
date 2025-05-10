const initialState = {
  loggedUserDetails: {},
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case "loggedUserDetails":
      return { ...state, [action.payload.name]: action.payload.value };

    default:
      return state;
  }
}
