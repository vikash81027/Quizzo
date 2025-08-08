import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import { User } from "./context";

interface loginProp {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
function Login({ setUser }: loginProp) {
  const [userName, setUserName] = useState("");
  const [pw, setPw] = useState("");

  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userName === "" || pw === "") return alert("no empty fields");
    const users = JSON.parse(localStorage.getItem("quizzo") || "[]");
    let found = false;
    for (const user of users) {
      if (userName === user.name) {
        if (pw === user.pw) {
          found = true;
          setUser(user);
          navigate("/app");
          return;
        } else {
          alert("Wrong password");
          return;
        }
      }
    }
    if (!found) return alert("user not found");
  }

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <input
        type="text"
        placeholder="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <Button name={"Login"} onClick={() => {}} className="btn-auth" />
    </form>
  );
}

export default Login;
