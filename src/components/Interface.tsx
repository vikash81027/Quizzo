import LeaderBoard from "./LeaderBoard";
import Question from "./Question";
import styles from "./Interface.module.css";
import Header from "./Header";

import { User } from "./context";

interface formatedQuestionInterface {
  question: string;
  options: string[];
  correct: string;
  difficulty: string;
  lvl: number;
}
interface questionProp {
  questions: formatedQuestionInterface[];
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  points: number;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  mode: number;
}

function Interface({
  questions,
  setPoints,
  points,
  user,
  setUser,
  mode,
}: questionProp) {
  return (
    <>
      <Header user={user} setUser={setUser} setPoints={setPoints} />
      <div className={styles.ui}>
        <LeaderBoard points={points} user={user} setUser={setUser} />
        <Question
          user={user}
          questions={questions}
          setPoints={setPoints}
          setUser={setUser}
          mode={mode}
        />
      </div>
    </>
  );
}

export default Interface;
