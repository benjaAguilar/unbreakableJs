import "./style.css";
import { createList, jsCode, runAll } from "./codeChallenges/syncVsAsync.ts";
import json from "./codeChallenges/test.json" with { type: "json" };
import type { LinkedList } from "./linkedList.ts";

let list = createList(json);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class='content'>
    <div class='code'>
      <h2>Code</h2>
      ${jsCode}
    </div>
    <div class='visualizer'>
      <h2>Live visualizer</h2>
      <button id='runAll'>Run all</button>
      <button id='prevBtn'>prev step</button>
      <button id='nextBtn'>next step</button>
      <div class='div'>
      </div> 
    </div>
    <div class='quiz'>
      <h2>Quiz: Select the output</h2>
    </div>
  </div>
`;

document.querySelector("#runAll")?.addEventListener("click", () => {
  if (!list.next) return alert("no code steps left");

  runAll(list);
  list = list.tail();
});

document.querySelector("#prevBtn")?.addEventListener("click", () => {
  if (list.prev) {
    document.querySelector(".div")?.lastChild?.remove();

    list = list.prev;
  }
});

document.querySelector("#nextBtn")?.addEventListener("click", () => {
  const p = document.createElement("p");
  p.textContent = `${list.val.type}: ${list.val.code}`;
  document.querySelector(".div")?.appendChild(p);

  list = list.next ? list.next : list;
});
