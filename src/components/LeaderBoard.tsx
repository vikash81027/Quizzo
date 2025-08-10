import { useState } from "react";
import styles from "./LeaderBoard.module.css";
import { User } from "./context";
import { Heap } from "heap-js";

function getMedalEmoji(idx: number) {
  if (idx === 0) return "🥇";
  if (idx === 1) return "🥈";
  if (idx === 2) return "🥉";
  return "";
}

interface lbInterface {
  points: number;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function getTopK(arr: User[], k: number) {
  // const q = new Array<User>();
  const pq = new Heap<User>((a, b) => a.points - b.points);

  for (const user of arr) {
    pq.push(user);
    0;
    if (pq.length > k) {
      pq.pop();
    }
  }
  return [...pq].reverse();
}

function LeaderBoard({ points, user }: lbInterface) {
  const [k, setK] = useState(3);
  const users = JSON.parse(localStorage.getItem("quizzo") || "[]");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 3) return;
    const val = +e.target.value;

    if (Number.isNaN(+val)) return;
    setK(+e.target.value);
  }

  function getRank(arr: User[], user: User) {
    return getTopK(arr, k).findIndex((u) => u.name === user.name) + 1;
  }
  return (
    <aside className={styles.aside}>
      <div className={styles.ranks}>
        <h2 className={styles.h2}>
          <span>Top</span>{" "}
          <input type="text" value={k} onChange={(e) => handleInput(e)} />{" "}
          Scores
        </h2>

        <ul className={styles.list}>
          {getTopK(users, k).map((u: User, idx: number) => {
            return (
              <li key={idx} className={`${user.name === u.name && styles.you}`}>
                <div>
                  <span>{idx + 1}</span>
                  {u.name}
                  {`(${u.points})`}
                </div>
                {getMedalEmoji(idx)}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.yourRank}>
        <div>
          <h3>
            Your Rank <span>{getRank(users, user)}</span>{" "}
          </h3>
          <h4>
            Score <span>{points}</span>
          </h4>
        </div>
      </div>
    </aside>
  );
}

export default LeaderBoard;
