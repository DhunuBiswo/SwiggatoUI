import React, { useEffect, useState } from "react";
import ResturantServices from "../../../Services/ResturantServices";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import { Carousel } from "primereact/carousel";
import { Rating } from "primereact/rating";
import { useNavigate } from "react-router-dom";
function ResturantLists() {
  const action = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const resturantData = useSelector((state) => state.ResturantReducer);
  useEffect(() => {
    getOnwerResturant();
  }, []);
  const getOnwerResturant = async () => {
    try {
      setLoader(true);
      let response = await ResturantServices.getResturants();
      if (!response.isAxiosError) {
        if (response.data?.success) {
          action({
            type: "storeAllResturant",
            payload: {
              name: "allResturantDetails",
              value: response.data.data,
            },
          });
        }
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={product.resturantImage}
            alt={product.name}
            className="w-full shadow-2"
            height={150}
          />
        </div>
        <div>
          <h4 className="mb-1">{product.resturantName}</h4>
          <h6 className="mt-0 mb-3">
            {product.resturantLocation}, {product.resturantCity}
          </h6>
          <Rating
            value={product.resturantRating ? product.resturantRating : 5}
            readOnly
            className="w-5 m-auto"
            cancel={false}
          />
          <div>
            <Button
              label="Menu"
              onClick={() => navigate("/resturants/menus")}
              text
              severity="success"
              className="mr-3"
            />
            <Button
              label="Edit Resturant"
              onClick={() =>
                navigate(
                  `/resturants/manage?mode=update&id=${product.restrantId}`
                )
              }
              text
              severity="warning"
            />
          </div>
          {/* <Tag
            value={product.inventoryStatus}
            severity={getSeverity(product)}
          ></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button
              icon="pi pi-star-fill"
              className="p-button-success p-button-rounded"
            />
          </div> */}
        </div>
      </div>
    );
  };
  return (
    <div>
      <BlockUI blocked={loader} template={<ProgressSpinner />} fullScreen>
        <div style={{ padding: "20px" }}>
          <div className="flex justify-content-end">
            <Button
              label="Add Resturant"
              onClick={() => navigate("/resturants/manage?mode=add")}
            />
          </div>
          <div className="card">
            <Carousel
              value={resturantData.allResturantDetails}
              numScroll={1}
              numVisible={3}
              itemTemplate={productTemplate}
            />
          </div>
        </div>
      </BlockUI>
    </div>
  );
}

export default ResturantLists;
