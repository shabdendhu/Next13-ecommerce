import React from "react";
import styles from "./QuickCategory.module.scss";
import { useRouter } from "next/navigation";
const QuickCategory = ({ category = [] }) => {
  const router = useRouter();
  const handleClick = (id) => {
    router.push("/category?id=" + id);
  };
  return (
    <div className={styles.component}>
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
