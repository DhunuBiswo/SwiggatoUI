import React, { useRef } from "react";
import { PanelMenu } from "primereact/panelmenu";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const items = [
    {
      label: "Resturants",
      icon: "pi pi-file",
      items: [
        {
          label: "Your Resturants",
          icon: "pi pi-plus",
          command: () => {
            navigate("/resturants");
          },
        },
        {
          label: "Resturant Docs",
          icon: "pi pi-search",
          command: () => {},
        },
      ],
    },
    {
      label: "Account",
      icon: "pi pi-cloud",
      items: [
        {
          label: "Sales",
          icon: "pi pi-cloud-download",
          command: () => {},
        },
        {
          label: "Update Profile",
          icon: "pi pi-cloud-upload",
          command: () => {},
        },
      ],
    },
    {
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: () => {
        toast.current.show({
          severity: "info",
          summary: "Signed out",
          detail: "User logged out",
          life: 3000,
        });
      },
    },
  ];
  return (
    <div className={styles.sidebar}>
      <div className="card flex justify-content-center">
        <PanelMenu model={items} className="w-full md:w-20rem" />
      </div>
    </div>
  );
}

export default Sidebar;
