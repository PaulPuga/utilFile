import React from "react";
import styles from "./switch.module.css";

const Switch = ({
  checked,
  handleSwitchChange,
}: {
  checked: boolean;
  handleSwitchChange: () => void;
}) => {
  return (
    <div className={styles.switchContainer}>
      <h3 className={styles.textDesition}>No</h3>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={handleSwitchChange}
          checked={checked}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <h3 className={styles.textDesition}>Yes</h3>
    </div>
  );
};

export default Switch;
