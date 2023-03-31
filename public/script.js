viewGrid = true;

fields = [];
elementsNames = [];
elements = [];
function initalizeFields() {
  div = document.getElementById("input");
  for (let i = 0; i < fields.length; i++) {

    if (fields[i].type == "text") {
      var name = document.createElement("p");
      name.innerHTML = fields[i].name;
      div.appendChild(name);
      
      elementsNames.push(fields[i].name);
      elements.push(document.createElement("input"));
      elements[i].type = "text";
      elements[i].id = fields[i].name;
      div.appendChild(elements[i]);
      div.appendChild(document.createElement("br"));

    } else if (fields[i].type == "increment") {
      var name = document.createElement("p");
      name.innerHTML = fields[i].name;
      div.appendChild(name);
      
      elementsNames.push(fields[i].name);
      elements.push(document.createElement("input"));
      elements[i].type = "number";
      elements[i].id = fields[i].name;
      elements[i].value = 0;
      elements[i].style.border = "4px solid " + fields[i].color;
      div.appendChild(elements[i]);

      var decrementButton = document.createElement("button");
      decrementButton.innerHTML = "-";
      div.insertBefore(decrementButton, elements[i]);
      decrementButton.setAttribute("onclick", 'decrementInput("' + fields[i].name + '")');

      var incrementButton = document.createElement("button");
      incrementButton.innerHTML = "+";
      div.appendChild(incrementButton);
      incrementButton.setAttribute("onclick", 'incrementInput("' + fields[i].name + '")');

      div.appendChild(document.createElement("br"));

    } else if (fields[i].type == "choice") {
      var name = document.createElement("p");
      name.innerHTML = fields[i].name;
      div.appendChild(name);
      
      elementsNames.push(fields[i].name);
      elements.push(document.createElement("select"));
      elements[i].id = fields[i].name;
      div.appendChild(elements[i]);

      for (let j = 0; j < fields[i].choices.length; j++) {
        var option = document.createElement("option");
        option.value = fields[i].choices[j];
        option.text = fields[i].choices[j];
        elements[i].appendChild(option)
      }

      div.appendChild(document.createElement("br"));

    } else if (fields[i].type == "checkbox grid") {
      var name = document.createElement("p");
      name.innerHTML = fields[i].name;
      div.appendChild(name);
      
      elements.push([]);
      for (let j = 0; j < fields[i].grid.length; j++) {
        elements[i].push([]);

        for (let k = 0; k < fields[i].grid[j].length; k++) {
          elementsNames.push(fields[i].name + ": " + fields[i].rowNames[j] + " " + k);
          elements[i][j].push(document.createElement("input"));
          elements[i][j][k].type = "checkbox";
          elements[i][j][k].style.outline = "4px solid " + fields[i].colors[j][k];
          elements[i][j][k].style.setProperty('--color', fields[i].colors[j][k]);
          div.appendChild(elements[i][j][k]);
        }

        div.appendChild(document.createElement("br"));

      }
    } else if (fields[i].type == "title") {
      div.appendChild(document.createElement("hr"));
      elements.push(document.createElement("h2"));
      elements[i].innerHTML = fields[i].name;
      div.appendChild(elements[i]);
    }


  } 

  var exportButton = document.createElement("button");
  exportButton.innerHTML = "Export as CSV";
  exportButton.setAttribute("onclick", "exportFields()");

  var uploadButton = document.createElement("button");
  uploadButton.innerHTML = "Upload to server";
  uploadButton.setAttribute("onclick", "uploadMatch()");

  var clearButton = document.createElement("button");
  clearButton.innerHTML = "Clear Fields";
  clearButton.setAttribute("onclick", "clearView()");

  var getScoutingDataButtonPoints = document.createElement("button");
  getScoutingDataButtonPoints.innerHTML = "Get Scouting Data (Points)";
  getScoutingDataButtonPoints.setAttribute("onclick", "getScoutingDataAsPoints()");

  var getScoutingDataButtonCount = document.createElement("button");
  getScoutingDataButtonCount.innerHTML = "Get Scouting Data (Count)";
  getScoutingDataButtonCount.setAttribute("onclick", "getScoutingDataAsCount()");


  uploadButton.style["margin-top"] = "12px";
  exportButton.style["margin-top"] = "12px";
  clearButton.style["margin-top"] = "12px";
  getScoutingDataButtonPoints.style["margin-top"] = "12px";
  getScoutingDataButtonCount.style["margin-top"] = "12px";

  div.appendChild(exportButton);
  div.appendChild(uploadButton);
  div.appendChild(clearButton);
  div.appendChild(document.createElement("br"));
  div.appendChild(getScoutingDataButtonPoints);
  div.appendChild(getScoutingDataButtonCount);
}

function incrementInput(inputID) {
  document.getElementById(inputID).value = parseInt(document.getElementById(inputID).value) + 1;
}

function decrementInput(inputID) {
  document.getElementById(inputID).value = parseInt(document.getElementById(inputID).value) - 1;
}

function getFieldsAndInitialize() {
  document.getElementById("ViewSelector").children[0] = true;
  fetch("/getFields", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
    .then((data) => {
      fields = data;
      initalizeFields();
    });
}

function getGridFieldsAndInitialize() {
  document.getElementById("ViewSelector").children[1].selected = true;
  fetch("/getGridFields", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
    .then((data) => {
      fields = data;
      initalizeFields();
    });
}

function exportFields() {
  elementsValues = [];
  elementsValues = getElementsValues();
  csvData = [elementsNames, elementsValues];
  downloadCSV(csvData);
}

function getElementsValues() {
  elementsValues = [];
  for (i = 0; i < elements.length; i++) {
    if (fields[i].type == "text") {
      elementsValues.push('"'+elements[i].value+'"');
    } else if (fields[i].type == "increment") {
      elementsValues.push(elements[i].value);
    } else if (fields[i].type == "choice") {
      elementsValues.push(elements[i].value);
    } else if (fields[i].type == "checkbox grid") {
      for (let j = 0; j < fields[i].grid.length; j++) {
        for (let k = 0; k < fields[i].grid[j].length; k++) {
          elementsValues.push(elements[i][j][k].checked);
        }
      }
    }
  }

  return elementsValues;
}

function downloadCSV(rows) {
  let csvContent = "data:text/csv;charset=utf-8,"
    + rows.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  var fileName = elements[0].value + "-" + elements[1].value + "-" + elements[3].value;
  link.setAttribute("download", fileName);
  div.appendChild(link);

  link.click();
}

function uploadMatch() {
  uploadPath = "/uploadMatch";
  if (viewGrid) {
    uploadPath = "/uploadGridMatch";
  }
  elementsValues = [];
  elementsValues = getElementsValues();
  csvData = [elementsNames, elementsValues];
  jsonData = { data: csvData };
  fetch(uploadPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  }).then(response => {
    if (response.status == 200) {
      console.log("Match Uploaded");
      alert("Match Uploaded");
    } else {
      alert("Upload Failed");
    }
  })

}


function clearData() {
  document.getElementById("input").innerHTML = '';
  elements.length = 0;
  

}

function clearView() {
  if (confirm("Clear fields?")) {
    document.getElementById("input").innerHTML = '';
    elements.length = 0;
    viewGrid = true;
    getGridFieldsAndInitialize();
  }
  

}


function updateView() {
  clearData();
  viewGrid = true;
  getGridFieldsAndInitialize();
  // console.log(document.getElementById("ViewSelector"));
  // if (document.getElementById("ViewSelector").value == "Normal") {
  //   viewGrid = false;
  //   getFieldsAndInitialize();
  //   document.cookie = "view=normal; expires=Thu, 18 Dec 2025 12:00:00 UTC";
  // } else {
  //   viewGrid = true;
  //   getGridFieldsAndInitialize();

  //   document.cookie = "view=grid; expires=Thu, 18 Dec 2025 12:00:00 UTC";
  // }
}

function getScoutingDataAsPoints() {
  window.location.href = "/dataAsPoints.csv";
}

function getScoutingDataAsCount() {
  window.location.href = "/dataAsCount.csv";
}


viewGrid = true;
getGridFieldsAndInitialize();

// if (document.cookie) {
//   console.log(document.cookie.view);
//   if (getCookie("view") == "normal") {
//     viewGrid = false;
//     getFieldsAndInitialize();
//   } else {
//     viewGrid = true;
//     getGridFieldsAndInitialize();
//   }
// } else {
//   getGridFieldsAndInitialize();
// }


function getCookie(cookieName) {
  let cookieAndEqualsSign = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(cookieAndEqualsSign.length, cookie.length);
    }
  }
  return "";
}
