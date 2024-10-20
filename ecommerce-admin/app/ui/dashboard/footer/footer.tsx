import styles from "./footer.module.css"

const Footer = () => {
  return (
      <div className={styles.container}>
          <div className={styles.logo}>C Pvt Ltd</div>
          <div className={styles.text}>2024 All Rights Reserved</div>
      </div>
  );
}

export default Footer;