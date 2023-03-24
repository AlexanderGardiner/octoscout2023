fields = [];
elementsNames = [];
elements = [];

function initalizeFields() {
  div = document.getElementById("input");
  for (let i = 0; i < fields.length; i++) {
    var name = document.createElement("p");
    name.innerHTML = fields[i].name;
    div.appendChild(name);

    if (fields[i].type == "text") {
      elementsNames.push(fields[i].name);
      elements.push(document.createElement("input"));
      elements[i].type = "text";
      elements[i].id = fields[i].name;
      div.appendChild(elements[i]);

    } else if (fields[i].type == "increment") {
      elementsNames.push(fields[i].name);
      elements.push(document.createElement("input"));
      elements[i].type = "number";
      elements[i].id = fields[i].name;
      elements[i].value = 0;
      div.appendChild(elements[i]);

      var decrementButton = document.createElement("button");
      decrementButton.innerHTML = "-";
      div.insertBefore(decrementButton, elements[i]);
      decrementButton.setAttribute("onclick", 'decrementInput("' + fields[i].name + '")');

      var incrementButton = document.createElement("button");
      incrementButton.innerHTML = "+";
      div.appendChild(incrementButton);
      incrementButton.setAttribute("onclick", 'incrementInput("' + fields[i].name + '")');

    } else if (fields[i].type == "choice") {
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

    } else if (fields[i].type == "checkbox grid") {
      elements.push([]);
      for (let j=0; j<fields[i].grid.length;j++) {
        elements[i].push([]);

        for (let k=0; k<fields[i].grid[j].length;k++) {
          elementsNames.push(fields[i].name +": " +fields[i].rowNames[j]+" "+k);
          elements[i][j].push(document.createElement("input"));
          elements[i][j][k].type = "checkbox";
          elements[i][j][k].style.outline = "2px solid "+fields[i].colors[j][k];
          div.appendChild(elements[i][j][k]);
        }

        div.appendChild(document.createElement("br"));

      }
    } 

    div.appendChild(document.createElement("br"));
  }

  var exportButton = document.createElement("button");
  exportButton.innerHTML = "Export as CSV";
  exportButton.setAttribute("onclick", "exportFields()");

  var uploadButton = document.createElement("button");
  uploadButton.innerHTML = "Upload to server";
  uploadButton.setAttribute("onclick", "uploadMatch()");

  var clearButton = document.createElement("button");
  clearButton.innerHTML = "Clear Fields";
  clearButton.setAttribute("onclick", "clearData()");

  var getScoutingDataButtonPoints = document.createElement("button");
  getScoutingDataButtonPoints.innerHTML = "Get Scouting Data (Points)";
  getScoutingDataButtonPoints.setAttribute("onclick", "getScoutingDataAsPoints()");

  var getScoutingDataButtonCount = document.createElement("button");
  getScoutingDataButtonCount.innerHTML = "Get Scouting Data (Count)";
  getScoutingDataButtonCount.setAttribute("onclick", "getScoutingDataAsCount()");


  uploadButton.style["margin-top"] = "8px";
  exportButton.style["margin-top"] = "8px";
  clearButton.style["margin-top"] = "8px";
  getScoutingDataButtonPoints.style["margin-top"] = "8px";
  getScoutingDataButtonCount.style["margin-top"] = "8px";

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
      elementsValues.push(elements[i].value);
    } else if (fields[i].type == "increment") {
      elementsValues.push(elements[i].value);
    } else if (fields[i].type == "choice") {
      elementsValues.push(elements[i].value);
    } else if (fields[i].type == "checkbox grid") {
      for (let j=0; j<fields[i].grid.length;j++) {
        for (let k=0; k<fields[i].grid[j].length;k++) {
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
  elementsValues = [];
  elementsValues = getElementsValues();
  csvData = [elementsNames, elementsValues];
  jsonData = { data: csvData };
  fetch("/uploadGridMatch", {
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
  initalizeFields();
}

function getScoutingDataAsPoints() {
  window.location.href = "/dataAsPoints.csv";
}

function getScoutingDataAsCount() {
  window.location.href = "/dataAsCount.csv";
}

getFieldsAndInitialize();