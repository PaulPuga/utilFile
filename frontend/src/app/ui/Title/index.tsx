import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./title.module.css";
import logo from "../../../../public/logo.svg";
import logoMobile from "../../../../public/logoMobile.svg";
const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <Link href="/">
        <Image
          priority
          src={logoMobile}
          alt="Pdf Icon title"
          className={styles.logoMobile}
        />
        <Image
          priority
          src={logo}
          alt="Pdf Icon title"
          className={styles.logo}
        />
      </Link>
    </div>
  );
};

export default Title;
