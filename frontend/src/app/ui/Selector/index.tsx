import React from "react";
import styles from "./selector.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Selector = () => {
  return (
    <div className={styles.container}>
      <button className={`${styles.iconButton} ${styles.iconButtonLeft}`}>
        <MdKeyboardArrowLeft />
      </button>
      <h2 className={styles.title}>ADD PAGE NUMBER TO PDFS</h2>
      <button className={`${styles.iconButton} ${styles.iconButtonRight}`}>
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Selector;
