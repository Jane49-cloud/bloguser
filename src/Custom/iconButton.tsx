import React, { ReactNode } from "react";
import { IconButton } from "@mui/material";

interface Props {
  children: ReactNode;
}

const IconButtonCustom: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <IconButton
        style={{
          height: "40px",
          width: "40px",
          marginTop: "5px",
          marginLeft: "2px",
          borderRadius: "4px",
          backgroundColor: "#2563eb",
        }}
        className=""
      >
        {children}
      </IconButton>
    </div>
  );
};

export default IconButtonCustom;
