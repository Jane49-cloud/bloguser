import React from "react";

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: "50px",
          height: "50px",
          marginBottom: "50px",
          border: "3px solid #ccc",
          borderTopColor: "blue",
          borderRadius: "50%",
          animation: "spin 1s infinite linear",
        }}
      ></div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingComponent;
