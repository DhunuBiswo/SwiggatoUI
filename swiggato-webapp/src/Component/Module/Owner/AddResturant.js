import React, { useEffect, useRef, useState } from "react";
import InputBox from "../../Common/InputBox/InputBox";
import { data, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResturantServices from "../../../Services/ResturantServices";
import { Messages } from "primereact/messages";
function AddResturant() {
  const [imageUrl, setImageUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const msgs = useRef(null);
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");
  const id = queryParams.get("id");
  const resturantData = useSelector((state) => state.ResturantReducer);
  const action = useDispatch();
  useEffect(() => {
    if (mode === "update") {
      resturantDetailsApi();
    }
  }, []);
  const resturantDetailsApi = async () => {
    try {
      setLoader(true);
      let response = await ResturantServices.getResturantDetails(id);
      if (!response.isAxiosError) {
        if (response.data?.success) {
          updateRedecure("name", response.data.data.resturantName);
          updateRedecure("number", response.data.data.resturantPhNumber);
          updateRedecure("location", response.data.data.resturantLocation);
          updateRedecure("city", response.data.data.resturantCity);
          updateRedecure("address", response.data.data.resturantCity);
          updateRedecure("photo", response.data.data.resturantImage);
          updateRedecure(
            "resturantTotalReview",
            response.data.data.resturantName
          );
          updateRedecure("totalstar", response.data.data.resturantTotalStar);
          updateRedecure("totalrating", response.data.data.resturantRating);
        }
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  const updateDetails = async (type, value) => {
    if (type === "photo") {
      var reader = new FileReader();

      reader.readAsDataURL(value);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
    updateRedecure(type, value);
  };
  const updateRedecure = (type, value) => {
    action({
      type: "addresturantDetails",
      payload: {
        name: "resturantDetails",
        propname: type,
        propvalue: value,
      },
    });
  };

  const updateFormdata = (type, value) => {
    updateDetails(type, value);
  };
  const getTheaddressObject = () => {
    let temp = resturantData.resturantDetails.address
      .split(",")
      .map((part) => part.trim()) // remove extra spaces
      .reduce((acc, curr, index) => {
        acc[index.toString()] = curr;
        return acc;
      }, {});
    return temp;
  };
  const clearResturantData = () => {
    action({
      type: "clearresturantdetails",
    });
    setImageUrl("");
  };
  const creteUpdateResturant = async (e) => {
    e.preventDefault();
    let payload = {
      email: localStorage.getItem("user"),
      resturantName: resturantData.resturantDetails.name,
      resturantAddress: getTheaddressObject(),
      resturantPhoneNo: resturantData.resturantDetails.number,
      resuturantLocation: resturantData.resturantDetails.location,
      resuturantCity: resturantData.resturantDetails.city,
      resuturantImage: imageUrl.split(",")[1],
    };
    try {
      setLoader(true);
      let response = await ResturantServices.createResturant(payload);
      if (!response.isAxiosError) {
        if (response.data?.success) {
          msgs.current.show({
            sticky: true,
            life: 100,
            severity: "success",
            summary: "Success",
            detail: "New Resturant Added Successfully",
            closable: true,
          });
          clearResturantData();
        }
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      msgs.current.show({
        sticky: true,
        life: 1000,
        severity: "error",
        summary: "Error",
        detail: "Creating Resturant Failed",
        closable: true,
      });
    } finally {
      setLoader(false);
    }
  };
  return (
    <BlockUI blocked={loader} template={<ProgressSpinner />} fullScreen>
      <Messages ref={msgs} />
      <form onSubmit={creteUpdateResturant}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            padding: "5px",
            gap: "10px",
          }}
        >
          <div>
            <InputBox
              type="text"
              required={true}
              logo="user"
              placeHolder="Resturant Name"
              updateFormdata={updateFormdata}
              reduxKey="name"
              value={resturantData.resturantDetails.name}
              label="Resturant Name"
              disableit={mode === "view" ? true : false}
            />
          </div>
          <div>
            <InputBox
              type="number"
              required={true}
              logo="mobile"
              placeHolder="Resturant PhoneNo"
              updateFormdata={updateFormdata}
              reduxKey="number"
              value={resturantData.resturantDetails.number}
              label="Resturant PhoneNo"
              disableit={mode === "view" ? true : false}
            />
          </div>
          <div>
            <InputBox
              type="text"
              required={true}
              logo="location"
              placeHolder="Location"
              updateFormdata={updateFormdata}
              reduxKey="location"
              value={resturantData.resturantDetails.location}
              label="Location"
              disableit={mode === "view" ? true : false}
            />
          </div>
          <div>
            <InputBox
              type="text"
              required={true}
              logo="city"
              placeHolder="City"
              updateFormdata={updateFormdata}
              reduxKey="city"
              value={resturantData.resturantDetails.city}
              label="City"
              disableit={mode === "view" ? true : false}
            />
          </div>
          <div>
            {resturantData.resturantDetails.photo !== "" ? (
              <div>
                <div>
                  {resturantData.resturantDetails.photo.name ||
                    resturantData.resturantDetails.photo.slice(0, 10) + "..."}
                </div>
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  name="Re-Capture"
                  onClick={() => {
                    action({
                      type: "addresturantDetails",
                      payload: {
                        name: "resturantDetails",
                        propname: "photo",
                        propvalue: "",
                      },
                    });
                    setImageUrl("");
                  }}
                />
              </div>
            ) : (
              <InputBox
                type="file"
                required={true}
                logo="photo"
                updateFormdata={updateFormdata}
                reduxKey="photo"
                value={resturantData.resturantDetails.photo}
                label="Resturant Photo"
                disableit={mode === "view" ? true : false}
              />
            )}
          </div>
          <div>
            <InputBox
              type="text"
              required={true}
              logo="address"
              updateFormdata={updateFormdata}
              reduxKey="address"
              value={resturantData.resturantDetails.address}
              label="Full Address"
              disableit={mode === "view" ? true : false}
            />
          </div>
        </div>
        {mode !== "view" && (
          <>
            <Button label={mode.toLocaleUpperCase()} className="mr-5" />
            <Button label="Clear" onClick={clearResturantData} type="button" />
          </>
        )}
      </form>
    </BlockUI>
  );
}

export default AddResturant;
