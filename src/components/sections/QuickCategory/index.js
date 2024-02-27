import React from "react";
import styles from "./QuickCategory.module.scss";
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";
const QuickCategory = ({ category = [] }) => {
  const router = useRouter();
  const handleClick = (id) => {
    router.push("/category?id=" + id);
  };
  return (
    <div className={styles.component}>
      {!category.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          {Array(7)
            .fill("")
            .map((e, i) => (
              <Skeleton
                key={i}
                variant="circular"
                style={{
                  minHeight: "90px",
                  minWidth: "90px",
                  margin: "5px",
                }}
              />
            ))}
        </div>
      ) : (
        <></>
      )}
      {category.map((e, i) => (
        <>
          {e.subcategories.length > 0 ? (
            <></>
          ) : (
            <button
              className={styles.item}
              key={i}
              onClick={() => handleClick(e?._id)}
            >
              <img alt="categoryimage" src={e.image} />
            </button>
          )}
        </>
      ))}
    </div>
  );
};

export default QuickCategory;
