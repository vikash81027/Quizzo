import { useEffect, useState } from "react";
import styles from "./Bst.module.css";
import Button from "./Button";
import { User } from "./context";
import { createBst, Node } from "./util";
import Complted from "./Completed";

interface formatedQuestionInterface {
  question: string;
  options: string[];
  correct: string;
  difficulty: string;
  lvl: number;
}

interface bstProp {
  questions: formatedQuestionInterface[];
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  user: User;
}

function Bst({ questions, setUser, setPoints, user }: bstProp) {
  const root = createBst(questions, 0, questions.length - 1);
  const [curr, setCurr] = useState<Node | null>(root);
  const [answer, setAnswer] = useState<string | null>(null);
  let isCorrect = false;

  const [ansMap, setAnsMap] = useState(new Map());
  useEffect(() => {
    const tempMap = new Map();
    questions.forEach((q) => {
      tempMap.set(q.question, q.correct);
    });
    setAnsMap(tempMap);
  }, []);

  return curr === null ? (
    <Complted setPoints={setPoints} />
  ) : (
    <div className={styles.question}>
      <p>{curr.data.question}</p>
      <div className={styles.options}>
        {curr.data.options.map((option, i) => {
          return (
            <Button
              key={i}
              disabled={answer !== null}
              name={option}
              onClick={() => {
                setAnswer(option);
                const users = JSON.parse(
                  localStorage.getItem("quizzo") || "[]"
                );
                const updated =
                  option === ansMap.get(curr.data.question)
                    ? { ...user, points: user.points + 10 }
                    : user;
                setUser(updated);
                const newArr = users.filter((u: User) => u.name !== user.name);
                localStorage.setItem(
                  "quizzo",
                  JSON.stringify([...newArr, updated])
                );
                if (option === ansMap.get(curr.data.question)) {
                  setPoints((pts) => pts + 10);
                  isCorrect = true;
                }
              }}
              className={`${styles.option} ${
                ansMap.get(curr.data.question) === answer && answer === option
                  ? styles.correct
                  : ""
              } ${
                ansMap.get(curr.data.question) !== answer &&
                answer === option &&
                styles.incorrect
              } ${answer !== null && styles.answered}`}
            />
          );
        })}
        <Button
          className={styles.next}
          onClick={() => {
            if (isCorrect) {
              if (curr.right) {
                setCurr(curr.right);
              } else {
                setCurr(null);
              }
            } else {
              if (curr.left) {
                setCurr(curr.left);
              } else {
                setCurr(null);
              }
            }
            setAnswer(null);
          }}
          name={">"}
        />
        <div
          className={`${curr.data.difficulty === "easy" && styles.easy} ${
            curr.data.difficulty === "medium" && styles.medium
          } ${curr.data.difficulty === "hard" && styles.hard}`}
        >
          {curr.data.difficulty}
        </div>
      </div>
    </div>
  );
}

export default Bst;
