"use strict";

(function () {
  let idField;
  let nameField;
  let siteField;
  let farmerField;
  let unitPriceField;
  let messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    idField = document.getElementById("flowerId");
    nameField = document.getElementById("name");
    siteField = document.getElementById("site");
    farmerField = document.getElementById("farmer");
    unitPriceField = document.getElementById("unitPrice");
    messagearea = document.getElementById("messagearea");

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    const flower = {
      flowerId: +idField.value,
      name: nameField.value,
      site: siteField.value,
      farmer: farmerField.value,
      unitPrice: +unitPriceField.value,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(flower),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      };

      const data = await fetch("http://localhost:4000/api/flowers", options);
      const status = await data.json();

      if (status.message) {
        updateMessage(status.message, status.type);
      }
    } catch (error) {
      updateMessage(error.message, "error");
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
})();
