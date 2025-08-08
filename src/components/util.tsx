// import { question } from "./context";

interface formatedQuestionInterface {
  question: string;
  options: string[];
  correct: string;
  difficulty: string;
  lvl: number;
}

export class Node {
  left: Node | null;
  right: Node | null;
  constructor(public data: formatedQuestionInterface) {
    this.left = null;
    this.right = null;
  }
}

export function createBst(
  questions: formatedQuestionInterface[],
  start: number,
  end: number
): Node | null {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const root = new Node(questions[mid]);
  root.left = createBst(questions, start, mid - 1);
  root.right = createBst(questions, mid + 1, end);
  return root;
}
