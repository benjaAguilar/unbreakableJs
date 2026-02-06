import "./style.css";
import Prism from "prismjs";
import { appendNode, createList, runAll } from "./lib.ts";
import jsCode from "./codeChallenges/syncVsAsync.js?raw";
import json from "./codeChallenges/test.json" with { type: "json" };

const code = Prism.highlight(jsCode, Prism.languages.javascript, "javascript");
let list = createList(json);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class='content'>
    <div class='code'>
      <h2>Code</h2>
      <pre>
        <code class='codeSnipet'>
          ${code}
        </code>
      </pre>
    </div>
    <div class='visualizer'>
      <h2>Live visualizer</h2>
      <div class='btns'>
        <button id='runAll'>Run all</button>
        <button id='prevBtn'>prev step</button>
        <button id='nextBtn'>next step</button>
      </div>
      <div class='div'>        
        <div class='execSteps'>
        </div> 
        <div class='liveThink'>
        </div> 
      </div> 
    </div>
    <div class='quiz'>
      <h2>Quiz: Select the output</h2>
    </div>
  </div>
`;

let lasteElemIsPrinted = false;
document.querySelector("#runAll")?.addEventListener("click", () => {
  if (!list.next) return alert("no code steps left");

  runAll(list);
  list = list.tail();
  lasteElemIsPrinted = true;
});

document.querySelector("#prevBtn")?.addEventListener("click", () => {
  document.querySelector(".execSteps")?.lastChild?.remove();
  document.querySelector(".execSteps")?.lastChild?.remove();
  if (list.prev) {
    list = list.prev;
    if (lasteElemIsPrinted) lasteElemIsPrinted = false;
  }
});

document.querySelector("#nextBtn")?.addEventListener("click", () => {
  if (!lasteElemIsPrinted) {
    appendNode(list);
    if (!list.next) lasteElemIsPrinted = true;
  }

  list = list.next ? list.next : list;
});
