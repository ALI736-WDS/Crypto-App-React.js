//Styles
import styles from "./Layouts.module.css";

function Layouts({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1> Crypto App </h1>
        <p>
          <a href="#"> ALI736-WDS </a> | React.js Full Course
        </p>
      </header>

      {children}

      <footer className={styles.footer}>
        <p> Developed By ALI736-WDS </p>
      </footer>
    </>
  );
}

export default Layouts;
