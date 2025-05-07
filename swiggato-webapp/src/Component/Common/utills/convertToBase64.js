const convertToBase64 = (file) => {
  var base64string;
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    base64string = reader.result.split(",")[1];
  };
  reader.onerror = (error) => {
    console.log(error);
  };
  return base64string;
};

export default convertToBase64;
