import { LinkedList } from "./linkedList";
import test from "./codeChallenges/test.json" with { type: "json" };

type JsonType = typeof test;

export function createList(json: JsonType): LinkedList {
  let current = new LinkedList(json.steps[json.steps.length - 1]);

  for (let i = json.steps.length - 2; i >= 0; i--) {
    current.prev = new LinkedList(json.steps[i], current, null);
    current = current.prev;
  }

  return current;
}

export function runAll(linkedList: LinkedList) {
  const visualizer: HTMLDivElement | null =
    document.querySelector(".visualizer");

  if (!visualizer) return alert("error");

  const totalStepsLeft = linkedList.getArrayOfSteps();
  const div = document.querySelector(".execSteps");

  if (!div) return;

  totalStepsLeft.forEach((step) => {
    const type = document.createElement("span");
    const p = document.createElement("p");

    type.textContent = `${step.type}:`;
    p.textContent += `${step.code}`;

    type.classList.add("type");

    div.appendChild(type);
    div.appendChild(p);
  });

  visualizer.appendChild(div);
}

export function appendNode(list: LinkedList) {
  const div = document.querySelector(".execSteps");
  const explanationDiv = document.querySelector(".liveThink");

  const type = document.createElement("span");
  const p = document.createElement("p");

  type.textContent = `${list.val.type}:`;
  p.textContent += `${list.val.code}`;

  type.classList.add("type");

  div?.appendChild(type);
  div?.appendChild(p);
  if (explanationDiv) explanationDiv.textContent = list.val.reasoning;
}
