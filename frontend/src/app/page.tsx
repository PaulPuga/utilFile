"use client"; // This is a client component
import React, { ReactNode, useState, useEffect } from "react";
import styles from "@UI/home.module.css";
import Title from "@UI/Title";
import Selector from "@UI/Selector";
import ModPagePreview from "@UI/ModPagePreview";
import Switch from "@UI/Switch";
import DirectionPad from "@UI/DirectionPad";
import { Direction, TextPosition } from "./types/types";

function Option({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.optionWrapper}>
      <h3>{caption}</h3>
      <div className={styles.optionInputWrapper}>{children}</div>
    </div>
  );
}

export default function Home() {
  const [textPosition, setTextPosition] = useState([
    "CENTER",
    "BOTTOM",
  ] as TextPosition);

  const [filesAreConsecutive, setFilesAreConsecutive] = useState(false);

  const [pageTextNumbsEx, setPageTextNumbsEx] = useState([
    [1, 1],
    [1, 1],
    [1, 1],
  ]);

  const handleDirectionChange = (direction: Direction) => {
    if (direction === "UP" && textPosition[1] === "BOTTOM") {
      setTextPosition([textPosition[0], "TOP"]);
    }
    if (direction === "DOWN" && textPosition[1] === "TOP") {
      setTextPosition([textPosition[0], "BOTTOM"]);
    }
    if (direction === "LEFT") {
      if (textPosition[0] === "RIGHT")
        setTextPosition(["CENTER", textPosition[1]]);
      if (textPosition[0] === "CENTER")
        setTextPosition(["LEFT", textPosition[1]]);
    }
    if (direction === "RIGHT") {
      if (textPosition[0] === "LEFT")
        setTextPosition(["CENTER", textPosition[1]]);
      if (textPosition[0] === "CENTER")
        setTextPosition(["RIGHT", textPosition[1]]);
    }
  };

  const toggleConsecutiveFiles = () => {
    if (filesAreConsecutive) {
      setFilesAreConsecutive(false);
      setPageTextNumbsEx([
        [1, 1],
        [1, 1],
        [1, 1],
      ]);
    } else {
      setFilesAreConsecutive(true);
      setPageTextNumbsEx([
        [1, 3],
        [2, 3],
        [3, 3],
      ]);
    }
  };

  useEffect(() => {
    console.log(textPosition);
  }, [textPosition]);
  useEffect(() => {
    console.log(filesAreConsecutive);
  }, [filesAreConsecutive]);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <Title />
      </div>
      <div className={styles.navWrapper}>
        <Selector />
      </div>
      <div className={styles.optionsWrapper}>
        <div className={styles.optionsColection}>
          <Option caption="Consecutive files?">
            <Switch
              checked={filesAreConsecutive}
              handleSwitchChange={toggleConsecutiveFiles}
            />
          </Option>
          <Option caption="Text position">
            <DirectionPad handleDirectionChange={handleDirectionChange} />
          </Option>
        </div>
        <div className={styles.documentsPreview}>
          <ModPagePreview
            label="PDF 1"
            firstPageNum={pageTextNumbsEx[0][0]}
            lastPageNum={pageTextNumbsEx[0][1]}
            textPosition={textPosition}
          />
          <ModPagePreview
            label="PDF 2"
            firstPageNum={pageTextNumbsEx[1][0]}
            lastPageNum={pageTextNumbsEx[1][1]}
            textPosition={textPosition}
          />
          <ModPagePreview
            label="PDF 3"
            firstPageNum={pageTextNumbsEx[2][0]}
            lastPageNum={pageTextNumbsEx[2][1]}
            textPosition={textPosition}
          />
        </div>
      </div>
      <div className={styles.filesWrapper}></div>
      <div className={styles.submitButtonWrapper}></div>
    </div>
  );
}
