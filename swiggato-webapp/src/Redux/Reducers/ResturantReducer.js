const initialState = {
  allResturantDetails: [],
  resturantDetails: {
    name: "",
    number: "",
    location: "",
    city: "",
    address: "",
    photo: "",
    totalreview: 0,
    totalstar: 0,
    totalrating: 0,
  },
};

export default function ResturantReducer(state = initialState, action) {
  switch (action.type) {
    case "storeAllResturant":
      return { ...state, [action.payload.name]: action.payload.value };
    case "addresturantDetails":
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          [action.payload.propname]: action.payload.propvalue,
        },
      };
    case "clearresturantdetails":
      return {
        ...state,
        resturantDetails: {
          name: "",
          number: "",
          location: "",
          city: "",
          address: "",
          photo: "",
        }, // resets to initial values
      };

    default:
      return state;
  }
}
