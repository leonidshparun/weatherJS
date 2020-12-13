// source https://www.w3schools.com/howto/howto_js_autocomplete.asp

function autocomplete(inp, arr) {
  let currentFocus;

  function removeActive(x) {
    /* a function to remove the "active" class from all autocomplete items: */
    for (let i = 0; i < x.length; i += 1) {
      x[i].classList.remove('autocomplete-active');
    }
  }

  function addActive(x) {
    /* a function to classify an item as "active": */
    if (!x) return false;

    /* start by removing the "active" class on all items: */
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /* add class "autocomplete-active": */
    x[currentFocus].classList.add('autocomplete-active');
    return x;
  }

  function closeAllLists(elmnt) {
    /* close all autocomplete lists in the document,
            except the one passed as an argument: */
    const x = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < x.length; i += 1) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /* the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values: */

  /* execute a function when someone writes in the text field: */
  inp.addEventListener('input', (e) => {
    let b; let i;
    const elem = e.target;
    const val = elem.value;
    /* close any already open lists of autocompleted values */
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /* create a DIV element that will contain the items (values): */
    const a = document.createElement('DIV');
    a.setAttribute('id', `${elem.id}autocomplete-list`);
    a.setAttribute('class', 'autocomplete-items');
    /* append the DIV element as a child of the autocomplete container: */
    elem.parentNode.appendChild(a);
    /* for each item in the array... */
    for (i = 0; i < arr.length; i += 1) {
      /* check if the item starts with the same letters as the text field value: */
      if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        /* create a DIV element for each matching element: */
        b = document.createElement('DIV');
        /* make the matching letters bold: */
        b.innerHTML = `<strong>${arr[i].substr(0, val.length)}</strong>`;
        b.innerHTML += arr[i].substr(val.length);
        /* insert a input field that will hold the current array item's value: */
        b.innerHTML += `<input type='hidden' value='${arr[i]}'>`;
        /* execute a function when someone clicks on the item value (DIV element): */
        b.addEventListener('click', ({ target }) => {
          /* insert the value for the autocomplete text field: */
          elem.value = target.getElementsByTagName('input')[0].value;
          /* close the list of autocompleted values,
                    (or any other open lists of autocompleted values: */
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
    return val;
  });
  /* execute a function presses a key on the keyboard: */
  inp.addEventListener('keydown', (e) => {
    let x = document.getElementById(`${e.target.id}autocomplete-list`);
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode === 40) {
      /* If the arrow DOWN key is pressed,
            increase the currentFocus letiable: */
      currentFocus += 1;
      /* and and make the current item more visible: */
      addActive(x);
    } else if (e.keyCode === 38) { // up
      /* If the arrow UP key is pressed,
            decrease the currentFocus letiable: */
      currentFocus -= 1;
      /* and and make the current item more visible: */
      addActive(x);
    } else if (e.keyCode === 13) {
      /* If the ENTER key is pressed, prevent the form from being submitted, */
      e.preventDefault();
      if (currentFocus > -1) {
        /* and simulate a click on the "active" item: */
        if (x) x[currentFocus].click();
      }
    }
  });

  /* execute a function when someone clicks in the document: */
  document.addEventListener('click', (e) => {
    closeAllLists(e.target);
  });
}

export default autocomplete;
