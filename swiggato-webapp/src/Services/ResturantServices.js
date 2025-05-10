import JwtMiddleware from "../JWT/JwtMiddleware";
const ResturantServices = {
  getResturants: async () => {
    return JwtMiddleware.get(
      `${
        process.env.REACT_APP_SWIGGATOBASEURL
      }owner/getresturants?useremail=${localStorage.getItem("user")}`
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getResturantDetails: async (resid) => {
    return JwtMiddleware.get(
      `${
        process.env.REACT_APP_SWIGGATOBASEURL
      }owner/getresturantdetails?resturantid=${resid}&useremail=${localStorage.getItem(
        "user"
      )}`
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  createResturant: async (payload) => {
    return JwtMiddleware.post(
      `${process.env.REACT_APP_SWIGGATOBASEURL}owner/create-resturant`,
      payload
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};
export default ResturantServices;
