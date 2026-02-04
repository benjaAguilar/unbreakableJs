import { LinkedList } from "../linkedList.ts";
import test from "./test.json" with { type: "json" };

type JsonType = typeof test;

export function createList(json: JsonType): LinkedList {
  let current = new LinkedList(json.steps[json.steps.length - 1]);

  for (let i = json.steps.length - 2; i >= 0; i--) {
    current.prev = new LinkedList(json.steps[i], current, null);
    current = current.prev;
  }

  return current;
}

export const jsCode = `
  console.log("A"); 

  setTimeout(() => {
    console.log("B");
  }, 0); 

  console.log("C");
`;

export function runAll(linkedList: LinkedList) {
  const visualizer: HTMLDivElement | null =
    document.querySelector(".visualizer");

  if (!visualizer) return alert("error");

  const totalStepsLeft = linkedList.getArrayOfSteps();
  const div = document.querySelector(".div");

  if (!div) return;

  console.log(totalStepsLeft);

  totalStepsLeft.forEach((step) => {
    const p = document.createElement("p");
    p.textContent += `${step.type}: ${step.code}`;
    div.appendChild(p);
  });

  visualizer.appendChild(div);
}
