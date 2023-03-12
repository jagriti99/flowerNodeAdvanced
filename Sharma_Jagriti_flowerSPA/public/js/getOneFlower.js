"use strict";

(function () {
  let resultarea;
  let messagearea;
  let id;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    id = document.getElementById("flowerId");
    messagearea = document.getElementById("messagearea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    resultarea.innerHTML = "";
    try {
      if (id.value.trim().length > 0) {
        const data = await fetch(
          `http://localhost:4000/api/flowers/${id.value}`,
          { mode: "cors" }
        );
        const result = await data.json();
        if (result) {
          if (result.message) {
            updateMessage(result.message, result.type);
          } else {
            updateflower(result);
          }
        }
      }
    } catch (error) {
      updateMessage(`Not found. ${error.message}`, "error");
    }
  }

  function updateMessage(message, type) {
    messagearea.textContent = message;
    messagearea.setAttribute("class", type);
  }

  function clearMessage() {
    messagearea.textContent = "";
    messagearea.removeAttribute("class");
  }

  function updateflower(result) {
    if (result.length === 0) return;
    const flower = result[0];
    resultarea.innerHTML = `
        <p><span class="legend">flowerId</span> ${flower.flowerId}</p>
        <p><span class="legend">Name</span> ${flower.name}</p>
        <p><span class="legend">site</span> ${flower.site}</p>
        <p><span class="legend">farmer</span> ${flower.farmer}</p>
        <p><span class="legend">unitPrice</span> ${flower.unitPrice}</p>
        `;
  }
})();
