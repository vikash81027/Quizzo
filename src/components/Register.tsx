import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { User } from "./context";

interface loginProp {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function Register({ setUser }: loginProp) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [pw, setPw] = useState("");

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userName === "" || pw === "") return alert("No empty fields!");
    const users = JSON.parse(localStorage.getItem("quizzo") || "[]");
    const userExists = users.some((user: User) => user.name === userName);

    if (userExists) {
      alert("Username has been taken");
      return;
    }
    const newUser = { name: userName, id: -1, pw, points: 0 };
    localStorage.setItem("quizzo", JSON.stringify([...users, newUser]));

    // const user = users.find((u: User) => u.name === userName && u.pw === pw);
    console.log(newUser);
    setUser(newUser);
    navigate("/app");
  }
  return (
    <form onSubmit={(e) => handleRegister(e)}>
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
      <Button name={"Register"} className="btn-auth" onClick={() => {}} />
    </form>
  );
}

export default Register;
