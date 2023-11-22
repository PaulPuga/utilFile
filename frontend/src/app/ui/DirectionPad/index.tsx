"use client"; // This is a client component

import { Direction } from "../../types/types";
import React, { ReactNode, useState, useEffect } from "react";
import styles from "./directionPad.module.css";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";

const DirectionButton = ({
  handleDirectionChange,
  direction,
  children,
}: {
  handleDirectionChange: (direction: Direction) => void;
  direction: Direction;
  children: ReactNode;
}) => {
  const [directionStyle, setdirectionStyle] = useState(styles.upDirection);

  const handleButtonClick = () => {
    handleDirectionChange(direction);
  };

  useEffect(() => {
    direction === "UP" && setdirectionStyle(styles.upDirection);
    direction === "DOWN" && setdirectionStyle(styles.downDirection);
    direction === "LEFT" && setdirectionStyle(styles.leftDirection);
    direction === "RIGHT" && setdirectionStyle(styles.rightDirection);
  }, [direction]);

  return (
    <button
      onClick={handleButtonClick}
      className={`${styles.directionButton} ${directionStyle}`}
    >
      {children}
    </button>
  );
};

const DirectionPad = ({
  handleDirectionChange,
}: {
  handleDirectionChange: (direction: Direction) => void;
}) => {
  return (
    <div className={styles.container}>
      <DirectionButton
        handleDirectionChange={handleDirectionChange}
        direction="UP"
      >
        <MdKeyboardArrowUp />
      </DirectionButton>
      <DirectionButton
        handleDirectionChange={handleDirectionChange}
        direction="RIGHT"
      >
        <MdKeyboardArrowRight />
      </DirectionButton>
      <DirectionButton
        handleDirectionChange={handleDirectionChange}
        direction="DOWN"
      >
        <MdKeyboardArrowDown />
      </DirectionButton>
      <DirectionButton
        handleDirectionChange={handleDirectionChange}
        direction="LEFT"
      >
        <MdKeyboardArrowLeft />
      </DirectionButton>
    </div>
  );
};

export default DirectionPad;
