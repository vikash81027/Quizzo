import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import MainApp from "./pages/MainApp/MainApp";
import Interface from "./components/Interface";
import { useState } from "react";

import { User } from "./components/context";

interface formatedQuestionInterface {
  question: string;
  options: string[];
  correct: string;
  difficulty: string;
  lvl: number;
}

function App() {
  const [questions, setQuestions] = useState([] as formatedQuestionInterface[]);
  const [points, setPoints] = useState(0);
  const [user, setUser] = useState<User>({
    name: "",
    id: -1,
    pw: "",
    points,
  });
  const [mode, setMode] = useState(0);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="auth" element={<HomePage />}>
            <Route path="login" element={<Login setUser={setUser} />} />
            <Route path="register" element={<Register setUser={setUser} />} />
          </Route>
          <Route
            path="app"
            element={
              <MainApp
                setPoints={setPoints}
                setMode={setMode}
                setQuestions={setQuestions}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="quiz"
            element={
              <Interface
                mode={mode}
                questions={questions}
                setPoints={setPoints}
                points={points}
                user={user}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
