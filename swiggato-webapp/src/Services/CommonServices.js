import JwtMiddleware from "../JWT/JwtMiddleware";
const CommonServices = {
  login: async (loginDetails) => {
    return JwtMiddleware.post(
      `${process.env.REACT_APP_SWIGGATOBASEURL}users/login`,
      loginDetails
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  signup: async (signupDetails) => {
    return JwtMiddleware.post(
      `${process.env.REACT_APP_SWIGGATOBASEURL}users/signup`,
      signupDetails
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  validateOtp: async (otpDetails) => {
    return JwtMiddleware.post(
      `${process.env.REACT_APP_SWIGGATOBASEURL}users/validate-otp`,
      otpDetails
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  forgotPassword: async (emailId) => {
    return JwtMiddleware.post(
      `${process.env.REACT_APP_SWIGGATOBASEURL}users/forgot-password`,
      emailId
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  forgotPasswordotp: async (payload) => {
    return JwtMiddleware.post(
      `${process.env.REACT_APP_SWIGGATOBASEURL}users/validate-forgot-password-otp`,
      payload
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updatePassword: async (payload) => {
    return JwtMiddleware.post(
      `${process.env.REACT_APP_SWIGGATOBASEURL}users/update-password`,
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
export default CommonServices;
