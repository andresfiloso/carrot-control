function cardFilter() {
  let input, filter, cards, cardContainer;
  input = document.getElementById("myFilter");
  filter = input.value.toUpperCase();
  cardContainer = document.getElementById("myItems");
  cards = cardContainer.getElementsByClassName("commit");
  for (i = 0; i < cards.length; i++) {
    let word = cards[i].querySelector("#changes");
    if (word !== null) {
      if (word.textContent.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    } else {
      if (filter != "") {
        cards[i].style.display = "none";
      } else {
        cards[i].style.display = "";
      }
    }
  }
}

function accordionFilter() {
  let input, filter, cards, cardContainer;
  input = document.getElementById("myFilter");
  filter = input.value.toUpperCase();
  cardContainer = document.getElementById("myItems");
  cards = cardContainer.getElementsByClassName("card");
  let hidden = cards.length;
  for (i = 0; i < cards.length; i++) {
    let word = cards[i].querySelector(".fileName");
    if (word !== null) {
      if (word.textContent.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
        hidden--;
      }
    } else {
      if (filter != "") {
        cards[i].style.display = "none";
      } else {
        cards[i].style.display = "";
      }
    }
  }

  if (hidden == 1) {
    for (i = 0; i < cards.length; i++) {
      if (cards[i].style.display != "none") {
        let collapsible = cards[i].getElementsByClassName("collapse")[0].id;
        $(`#${collapsible}`).collapse("show");
      }
    }
  }
  if (hidden == cards.length) {
    for (i = 0; i < cards.length; i++) {
      if (cards[i].style.display == "") {
        let collapsible = cards[i].getElementsByClassName("collapse")[0].id;
        $(`#${collapsible}`).collapse("hide");
      }
    }
  }
}

const btnSpinner = document.querySelectorAll(".btn-loader");

for (let i = 0; i < btnSpinner.length; i++){
    btnSpinner[i].addEventListener("click", () => {
        let loader = btnSpinner[i].getElementsByClassName("loader")[0];
        loader.style.display = "";

        // if any icon, delete it
        let icon = btnSpinner[i].getElementsByClassName("fas")[0];
        if (icon != undefined){
            icon.style.display = "none";
        }
       

    }
)}


const headings = document.querySelectorAll(".heading");


for (let i = 0; i < headings.length; i++){
    headings[i].addEventListener('click', () => {
        let header = headings[i].getElementsByClassName("collapsed")[0];
        if (header == undefined) {
            header = headings[i].getElementsByClassName('btn')[0];
            let collapsible = header.getAttribute("data-target");
            $(`${collapsible}`).collapse("hide");
        }
        let collapsible = header.getAttribute("data-target");
        $(`${collapsible}`).collapse("show");
    });
}

const checkboxes = document.querySelectorAll("input[type=checkbox]");

let selected_for_diffs = [];

$("#dismiss-toast").on("click", function() {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  selected_for_diffs = [];
});

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", () => {
    // put toast on top
    $(".toast").css("z-index", 1);
    let parent = checkboxes[i].parentElement.parentElement.parentElement;
    let commit = parent.querySelector(".sha").textContent;
    if (selected_for_diffs.length < 2) {
      if (checkboxes[i].checked == true) {
        selected_for_diffs.push(commit);
      } else {
        selected_for_diffs.splice(selected_for_diffs.indexOf(commit), 1);
      }
    } else {
      if (checkboxes[i].checked == true) {
        checkboxes[i].checked = false;
        alert("Maximo dos archivos");
      } else {
        selected_for_diffs.splice(selected_for_diffs.indexOf(commit), 1);
      }
    }
    let toasts_text = document.getElementById("selected_for_diffs");

    if (selected_for_diffs.length == 0) {
      $(".toast").toast("hide");
    }

    toasts_text.innerHTML = selected_for_diffs.map(val => {
      return `<b>${val.substring(0, 6)}</b>`.concat(`${val.substring(6)}<hr>`);
    });

    if (selected_for_diffs.length == 2) {
      toasts_text.innerHTML += `<a href="#">compare commits</a>`;
    }

    $(".toast").toast("show");

  });
}



