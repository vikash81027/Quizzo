import Button from "./Button";
import styles from "./Completed.module.css";
import completed from "../assets/completed.svg";
import { useNavigate } from "react-router-dom";

interface completedInterface {
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}
function Complted({ setPoints }: completedInterface) {
  const navigate = useNavigate();
  return (
    <div className={styles.completed}>
      <img src={completed} alt="completed" />

      <Button
        className={styles.menu}
        name="menu"
        onClick={() => {
          navigate("/app");
          setPoints(0);
        }}
      />
    </div>
  );
}

export default Complted;
