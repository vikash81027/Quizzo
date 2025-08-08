import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Header.module.css";
import { User } from "./context";

interface UserProp {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

function Header({ user, setUser, setPoints }: UserProp) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div>
        <span className={styles.emoji}>🗿</span>
        <strong>Quizzo!</strong>
      </div>
      <div className={styles.side}>
        <span>
          Hello! <span className={styles.name}>{user.name}</span> 👋
        </span>
        <Button
          name="logout"
          className={styles.logout}
          onClick={() => {
            setUser({ name: "", id: -1, pw: "", points: 0 });
            setPoints(0);
            navigate("/auth/login");
          }}
        />
      </div>
    </header>
  );
}

export default Header;
