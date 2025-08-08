import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/quizo.svg";

import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.main}>
      <aside className={styles.aside}>
        <div>
          <h1>Quizzo!</h1>
          <p className={styles.para}>Welcome to quizzo!</p>
          <p className={styles.para}>Ultimate place to test your knowledge</p>
        </div>

        <Outlet />

        <div className={styles.btn}>
          <NavLink to="login">Login</NavLink>
          <NavLink to="register">Register</NavLink>
        </div>
      </aside>
      <img src={logo} alt="quizz" className={styles.logo} />
    </div>
  );
}

export default HomePage;
