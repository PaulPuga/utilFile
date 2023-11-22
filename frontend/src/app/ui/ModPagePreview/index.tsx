"use client"; // This is a client component
import { TextPosition } from "../../types/types";
import React, { useState, useEffect } from "react";
import styles from "./modPagePreview.module.css";

const ModPagePreview = ({
  label,
  firstPageNum,
  lastPageNum,
  textPosition,
}: {
  label: string;
  firstPageNum: number;
  lastPageNum: number;
  textPosition: TextPosition;
}) => {
  const [alignXStyle, setAlignXStyle] = useState(styles.alignCenter);
  const [alignYStyle, setAlignYStyle] = useState(styles.alignBottom);

  useEffect(() => {
    if (textPosition) {
      const [xPos, yPos] = textPosition;
      console.log(xPos, yPos);

      switch (xPos) {
        case "LEFT":
          setAlignXStyle(styles.alignLeft);
          break;
        case "CENTER":
          setAlignXStyle(styles.alignCenter);
          break;
        case "RIGHT":
          setAlignXStyle(styles.alignRight);
          break;
      }
      switch (yPos) {
        case "TOP":
          setAlignYStyle(styles.alignTop);
          break;
        case "BOTTOM":
          setAlignYStyle(styles.alignBottom);
          break;
      }
      console.log("🦄", alignXStyle, alignYStyle);
    }
  }, [textPosition, alignXStyle, alignYStyle]);

  return (
    <div className={styles.container}>
      <div className={styles.sheet}>
        <span className={`${styles.docIndicator}`}>{label}</span>
        <p className={`${styles.textPage} ${alignYStyle} ${alignXStyle}`}>
          Pagina {firstPageNum} de {lastPageNum}
        </p>
      </div>
    </div>
  );
};

export default ModPagePreview;
