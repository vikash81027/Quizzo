import { useState } from "react";
import Button from "./Button.tsx";
import styles from "./Question.module.css";
import Complted from "./Completed.tsx";
import { User } from "./context.tsx";
import Bst from "./Bst.tsx";

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
  setUser: React.Dispatch<React.SetStateAction<User>>;
  user: User;
  mode: number;
}

function Question({ questions, setPoints, setUser, user, mode }: questionProp) {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const ansMap = new Map();
  questions.forEach((q, idx) => {
    ansMap.set(idx, q.correct);
  });

  return idx === questions.length ? (
    <Complted setPoints={setPoints} />
  ) : mode === 0 ? (
    <div className={styles.question}>
      <p>
        <span>{idx + 1}</span> {questions[idx].question}
      </p>
      <div className={styles.options}>
        {questions[idx].options.map((option, i) => {
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
                  option === ansMap.get(idx)
                    ? { ...user, points: user.points + 10 }
                    : user;
                setUser(updated);
                const newArr = users.filter((u: User) => u.name !== user.name);
                localStorage.setItem(
                  "quizzo",
                  JSON.stringify([...newArr, updated])
                );
                if (option === ansMap.get(idx)) setPoints((pts) => pts + 10);
              }}
              className={`${styles.option} ${
                ansMap.get(idx) === answer && answer === option
                  ? styles.correct
                  : ""
              } ${
                ansMap.get(idx) !== answer &&
                answer === option &&
                styles.incorrect
              } ${answer !== null && styles.answered}`}
            />
          );
        })}
        <Button
          className={styles.next}
          onClick={() => {
            setIdx((idx) => idx + 1);
            setAnswer(null);
          }}
          name={">"}
        />
      </div>
      <div
        className={`${questions[idx].difficulty === "easy" && styles.easy} ${
          questions[idx].difficulty === "medium" && styles.medium
        } ${questions[idx].difficulty === "hard" && styles.hard}`}
      >
        {questions[idx].difficulty}
      </div>
    </div>
  ) : (
    <Bst
      questions={questions}
      setUser={setUser}
      setPoints={setPoints}
      user={user}
    />
  );
}

export default Question;
