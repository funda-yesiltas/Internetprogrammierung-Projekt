// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  global.$ = require('jquery')
}
// END

$( document ).ready((() => {
  // DOMContent is laoded, now we can start checking HTML Elements
  // If we dont "wait" for document to be ready, we cannot access HTML elements
  // for testing purposes, you can use a "debugger;" statement or also "console.log(element)"
  console.log('DOM is ready!')
  

  //----------------------------------------------START: Buecher hinzufuegen--------------------------------------------------------------
  getData(); // TODO: Implement getData Method
  //const input = $('#hft-shoutbox-form-input-name') ---> entfernen?
  const booktitle = $('#booktitel-input')
  const form = $('#book-form')

  form.on('keyup', (event) => {
    if (formElementIsValid(booktitle.val(), 1)) {
     // toggleAlertBox(false)
      toggleSubmit(false)
    } else {
      //toggleAlertBox(true)
      toggleSubmit(true)
    }
  })

  form.on("books-submit", async (event) => {
    event.preventDefault();
    await saveData(booktitle.val());
   // await getData();

  });
}));

function formElementIsValid(element, minLength) {
  return element.length >= minLength
}

/* NUR FUER MIN ANZAHL AN ZEICHEN -------------> spaeter hinzufuegen
function toggleAlertBox(show) {
  const alertEl = $('#hft-shoutbox-alert')

  if (show) {
    alertEl.removeClass('d-none')
  } else {
    alertEl.addClass('d-none')
  }
}*/

function toggleSubmit(disable) {
  const submitButton = $('#books-submit')
  submitButton.prop('disabled', disable)
}


async function getData() {
  // clear complete table 
  const tableBody = $(".table > tbody")
  tableBody.empty();
  // fetch table data
  const responseBooks = await fetch("/api/Books", {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  });

  // fill table
  const json = await responseBooks.json();
  json.forEach(elem => {
    tableBody.append(`<tr><td>${elem.buchID}</td><td>${elem.titel}</td><td>${elem.kategorie}</td></tr>`);
  });
}

async function saveData(titel, /*kategorie*/) {
    try{
      await fetch("/api/Books", {
        method: "add-entry",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titel,
          //kategorie,
        }),
      });
    }catch(e){
      console.error(e);
    }
}
//---------------------------------------------ENDE: Buecher hinzufuegen--------------------------------------------------------------






// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  module.exports = {
    getData,
    saveData
  }
}
// END