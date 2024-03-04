import Skeleton from "@mui/material/Skeleton";
import React from "react";

const Loading = () => {
  return (
    <div>
      {Array(50)
        .fill("")
        .map((e, i) => (
          <Skeleton key={i} variant="text" animation="wave" />
        ))}
    </div>
  );
};

export default Loading;
