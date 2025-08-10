import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  question,
  User,
  formatedQuestionInterface,
} from "../../components/context";
import img1 from "../../assets/undraw_exams_re_4ios.svg";
import img2 from "../../assets/undraw_programming_re_kg9v.svg";
import styles from "./MainApp.module.css";
import Header from "../../components/Header";

interface questionProp {
  setQuestions: React.Dispatch<
    React.SetStateAction<formatedQuestionInterface[]>
  >;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setMode: React.Dispatch<React.SetStateAction<number>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

function MainApp({
  setQuestions,
  user,
  setUser,
  setMode,
  setPoints,
}: questionProp) {
  const [option, setOption] = useState("cs");
  const [description, setDescription] = useState("choose mode");

  const navigate = useNavigate();

  async function fetchRandomQuestion(url: string) {
    const res = await fetch(url);
    const data = await res.json();

    const { results } = data;

    const formated = results.map((q: question, idx: number) => {
      return {
        question: q.question,
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        correct: q.correct_answer,
        difficulty: q.difficulty,
        lvl: idx,
      };
    });
    setQuestions(formated);
  }

  async function fetchFlexQuestion(cat: string) {
    if (cat === "cs") {
      const q = await fetchQuestions("/csQuiz.json");
      setQuestions(q);
    } else {
      const q = await fetchQuestions("/gkQuiz.json");

      setQuestions(q);
    }
  }

  async function fetchQuestions(url: string) {
    const res = await fetch(url);
    const data = await res.json();
    const formated = data.map((q: question, idx: number) => {
      return {
        question: q.question,
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        correct: q.correct_answer,
        difficulty: q.difficulty,
        lvl: idx,
      };
    });
    return formated;
  }

  function handleSubmit(op: number) {
    if (op == 0) {
      if (option === "cs")
        fetchRandomQuestion(
          "https://opentdb.com/api.php?amount=15&category=18&type=multiple"
        );
      else
        fetchRandomQuestion(
          "https://opentdb.com/api.php?amount=15&category=9&type=multiple"
        );
    } else {
      if (option === "cs") fetchFlexQuestion("cs");
      else fetchFlexQuestion("gk");
    }
  }

  return (
    <>
      <Header user={user} setUser={setUser} setPoints={setPoints} />
      <div className={styles.options}>
        <h1>Choose Category</h1>
        <select
          name="category"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="cs">Computer Science</option>
          <option value="gk">General Knowledge</option>
        </select>
        <div className={styles.mode}>
          <div
            onClick={() => {
              setMode(0);
              handleSubmit(0);
              navigate("/quiz");
            }}
            onMouseOver={() =>
              setDescription(
                "Feeling adventurous? Enable the randomized difficulty option, and our advanced algorithm will throw questions at you from a variety of difficulty levels, keeping you on your toes."
              )
            }
            onMouseLeave={() => {
              setDescription("choose mode");
            }}
          >
            <img src={img1} alt="op1" />
            <h2>Random Difficulty</h2>
          </div>
          <div
            onClick={() => {
              setMode(1);
              handleSubmit(1);
              navigate("/quiz");
            }}
            onMouseOver={() =>
              setDescription(
                "Answer correctly, and the questions get harder. Struggle with a question, and the difficulty decreases, keeping the challenge just right for you."
              )
            }
            onMouseLeave={() => {
              setDescription("choose mode");
            }}
          >
            <img src={img2} alt="op2" />
            <h2>Dynamic Difficulty</h2>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </>
  );
}

export default MainApp;
