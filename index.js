const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));

// Defining what data to collect
fields = [
  { name: "Team Number", type: "text" },
  { name: "Match Number", type: "text" },
  {
    name: "Team Color",
    type: "choice",
    choices: ["Red", "Blue"],
    points: ["Red", "Blue"],
  },
  { name: "Scout Initals", type: "text" },
  { name: "Cone High Auto", type: "increment", points: 6, color: "#fffb00" },
  { name: "Cone Mid Auto", type: "increment", points: 4, color: "#fffb00" },
  { name: "Cone Low Auto", type: "increment", points: 3, color: "#fffb00" },
  { name: "Cube High Auto", type: "increment", points: 6, color: "#A5C0FF " },
  { name: "Cube Mid Auto", type: "increment", points: 4, color: "#A5C0FF " },
  { name: "Cube Low Auto", type: "increment", points: 3, color: "#A5C0FF " },
  {
    name: "Mobility Auto",
    type: "choice",
    choices: ["None", "Attempted Mobility", "Mobility"],
    points: [0, 0, 3],
  },
  {
    name: "Balance Auto",
    type: "choice",
    choices: ["None", "Attempted", "Docked", "Engaged"],
    points: [0, 0, 8, 12],
  },
  { name: "Cones Collected", type: "increment", points: 1, color: "#fffb00" },
  { name: "Cubes Collected", type: "increment", points: 1, color: "#A5C0FF " },
  { name: "Cone High Teleop", type: "increment", points: 5, color: "#fffb00" },
  { name: "Cone Mid Teleop", type: "increment", points: 3, color: "#fffb00" },
  { name: "Cone Low Teleop", type: "increment", points: 2, color: "#fffb00" },
  { name: "Cube High Teleop", type: "increment", points: 5, color: "#A5C0FF " },
  { name: "Cube Mid Teleop", type: "increment", points: 3, color: "#A5C0FF " },
  { name: "Cube Low Teleop", type: "increment", points: 2, color: "#A5C0FF " },
  {
    name: "Endgame Teleop",
    type: "choice",
    choices: ["None", "Park", "Docked", "Engaged"],
    points: [0, 2, 6, 10],
  },
  { name: "Notes", type: "text" },
];

gridFields = [
  { name: "Team Number", type: "text" },
  { name: "Match Number", type: "text" },
  {
    name: "Team Color",
    type: "choice",
    choices: ["Red", "Blue"],
    points: ["Red", "Blue"],
  },
  { name: "Scout Initals", type: "text" },
  { name: "AUTO", type: "title" },
  {
    name: "Pieces Placed Auto",
    type: "checkbox grid",
    grid: [
      [6, 6, 6, 6, 6, 6, 6, 6, 6],
      [4, 4, 4, 4, 4, 4, 4, 4, 4],
      [3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    rowNames: ["Top", "Middle", "Bottom"],
    colors: [
      [
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
      ],
      [
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
      ],
      [
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
      ],
      [
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
      ],
    ],
    categories: [
      [0, 3, 0, 0, 3, 0, 0, 3, 0],
      [1, 4, 1, 1, 4, 1, 1, 4, 1],
      [2, 2, 2, 2, 2, 2, 2, 2, 2],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
    ],
    categoriesNames: [
      "Cone High Auto",
      "Cone Mid Auto",
      "Cone Low Auto",
      "Cube High Auto",
      "Cube Mid Auto",
      "Cube Low Auto",
    ],
  },
  {
    name: "Mobility Auto",
    type: "choice",
    choices: ["None", "Attempted Mobility", "Mobility"],
    points: [0, 0, 3],
  },
  {
    name: "Balance Auto",
    type: "choice",
    choices: ["None", "Attempted", "Docked", "Engaged"],
    points: [0, 0, 8, 12],
  },
  { name: "TELEOP", type: "title" },
  { name: "Cones Collected", type: "increment", points: 1, color: "#fffb00" },
  { name: "Cubes Collected", type: "increment", points: 1, color: "#A5C0FF " },
  {
    name: "Pieces Placed",
    type: "checkbox grid",
    grid: [
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
      [3, 3, 3, 3, 3, 3, 3, 3, 3],
      [2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2],
    ],
    rowNames: ["Top", "Middle", "Bottom"],
    colors: [
      [
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
      ],
      [
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
      ],
      [
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
      ],
      [
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
      ],
    ],
    categories: [
      [0, 3, 0, 0, 3, 0, 0, 3, 0],
      [1, 4, 1, 1, 4, 1, 1, 4, 1],
      [2, 2, 2, 2, 2, 2, 2, 2, 2],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
    ],
    categoriesNames: [
      "Cone High",
      "Cone Mid",
      "Cone Low",
      "Cube High",
      "Cube Mid",
      "Cube Low",
    ],
  },
  {
    name: "Pieces Placed (Full Grid)",
    type: "checkbox grid",
    grid: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    rowNames: ["Top", "Middle", "Bottom"],
    colors: [
      [
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
      ],
      [
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
        "#fffb00",
        "#A5C0FF ",
        "#fffb00",
      ],
      [
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
        "#fffe95",
        "#fffe95 ",
        "#fffe95",
      ],
      [
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
        "#C6D7FF",
        "#C6D7FF ",
        "#C6D7FF",
      ],
    ],
    categories: [
      [0, 3, 0, 0, 3, 0, 0, 3, 0],
      [1, 4, 1, 1, 4, 1, 1, 4, 1],
      [2, 2, 2, 2, 2, 2, 2, 2, 2],
      [5, 5, 5, 5, 5, 5, 5, 5, 5],
    ],
    categoriesNames: [
      "Cone High (Full Grid)",
      "Cone Mid (Full Grid)",
      "Cone Low (Full Grid)",
      "Cube High (Full Grid)",
      "Cube Mid (Full Grid)",
      "Cube Low (Full Grid)",
    ],
  },
  {
    name: "Endgame Teleop",
    type: "choice",
    choices: ["None", "Park", "Docked", "Engaged"],
    points: [0, 2, 6, 10],
  },
  {
    name: "How in the way of own alliance (none (0) to lots (10))",
    type: "choice",
    choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    points: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
  },
  {
    name: "How tippy (none (0) to lots (10))",
    type: "choice",
    choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    points: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
  },
  {
    name: "How many penalties (none (0) to lots (10))",
    type: "choice",
    choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    points: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
  },
  {
    name: "How speedy (0 (low speed) - 10 (high speed))",
    type: "choice",
    choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    points: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  },
  { name: "Swerve", type: "choice", choices: ["Yes", "No"], points: [1, 0] },
  { name: "Died?", type: "choice", choices: ["No", "Yes"], points: [1, 0] },
  { name: "Notes", type: "text" },
];

// Upload a match
app.post("/uploadMatch", (req, res) => {
  uploadedData = req.body.data;

  // Write data to count csv
  data = readFromCountCSV();
  uploadedData[1].push(new Date().toString());
  data.push(uploadedData[1]);
  writeToCountCSV(convert2DArrayToCSV(data));
  uploadedData[1].pop();

  // Format data and write to points csv
  pointsData = [];
  for (i = 0; i < uploadedData[1].length; i++) {
    if (fields[i].type == "text") {
      pointsData.push(uploadedData[1][i]);
    } else if (fields[i].type == "increment") {
      pointsData.push(parseInt(uploadedData[1][i]) * fields[i].points);
    } else if (fields[i].type == "choice") {
      for (let j = 0; j < fields[i].choices.length; j++) {
        if (fields[i].choices[j] == uploadedData[1][i]) {
          pointsData.push(fields[i].points[j]);
        }
      }
    }
  }
  pointsData.push(new Date().toString());
  pointsCSV = readFromPointsCSV();
  pointsCSV.push(pointsData);
  writeToPointsCSV(convert2DArrayToCSV(pointsCSV));

  console.log("Match Uploaded");
  res.sendStatus(200);
});

app.post("/uploadGridMatch", (req, res) => {
  uploadedData = req.body.data;

  // Write data to grid csv
  data = readFromGridCSV();
  uploadedData[1].push(new Date().toString());
  data.push(uploadedData[1]);
  writeToGridCSV(convert2DArrayToCSV(data));
  uploadedData[1].pop();
  data.pop();

  // Format data and write to points csv
  uploadedDataAsPoints = [];
  i = 0;
  uploadedDataI = 0;

  while (i < gridFields.length) {
    if (gridFields[i].type == "text") {
      uploadedDataAsPoints.push(uploadedData[1][uploadedDataI]);
      uploadedDataI++;
    } else if (gridFields[i].type == "increment") {
      uploadedDataAsPoints.push(
        parseInt(uploadedData[1][uploadedDataI]) * gridFields[i].points
      );
      uploadedDataI++;
    } else if (gridFields[i].type == "choice") {
      for (let j = 0; j < gridFields[i].choices.length; j++) {
        if (gridFields[i].choices[j] == uploadedData[1][uploadedDataI]) {
          uploadedDataAsPoints.push(gridFields[i].points[j]);
        }
      }
      uploadedDataI++;
    } else if (gridFields[i].type == "checkbox grid") {
      categoriesPointsSums = Array(gridFields[i].categoriesNames.length).fill(
        0
      );
      for (let j = 0; j < gridFields[i].categories.length; j++) {
        for (let k = 0; k < gridFields[i].categories[j].length; k++) {
          if (uploadedData[1][uploadedDataI]) {
            categoriesPointsSums[gridFields[i].categories[j][k]] +=
              gridFields[i].grid[j][k];
          }
          uploadedDataI++;
        }
      }

      for (let j = 0; j < gridFields[i].categoriesNames.length; j++) {
        uploadedDataAsPoints.push(categoriesPointsSums[j]);
      }
    }
    i++;
  }

  uploadedDataAsPoints.push(new Date().toString());
  // Format data and write to points csv
  pointsCSV = readFromPointsCSV();
  pointsCSV.push(uploadedDataAsPoints);
  writeToPointsCSV(convert2DArrayToCSV(pointsCSV));

  uploadedDataAsCount = [];
  i = 0;
  uploadedDataI = 0;

  while (i < gridFields.length) {
    if (gridFields[i].type == "text") {
      uploadedDataAsCount.push(uploadedData[1][uploadedDataI]);
      uploadedDataI++;
    } else if (gridFields[i].type == "increment") {
      uploadedDataAsCount.push(parseInt(uploadedData[1][uploadedDataI]));
      uploadedDataI++;
    } else if (gridFields[i].type == "choice") {
      uploadedDataAsCount.push(uploadedData[1][uploadedDataI]);
      uploadedDataI++;
    } else if (gridFields[i].type == "checkbox grid") {
      categoriesCountsSums = Array(gridFields[i].categoriesNames.length).fill(
        0
      );
      for (let j = 0; j < gridFields[i].categories.length; j++) {
        for (let k = 0; k < gridFields[i].categories[j].length; k++) {
          if (uploadedData[1][uploadedDataI]) {
            categoriesCountsSums[gridFields[i].categories[j][k]] += 1;
          }
          uploadedDataI++;
        }
      }

      for (let j = 0; j < gridFields[i].categoriesNames.length; j++) {
        uploadedDataAsCount.push(categoriesCountsSums[j]);
      }
    }
    i++;
  }

  uploadedDataAsCount.push(new Date().toString());
  coutCSV = readFromCountCSV();
  coutCSV.push(uploadedDataAsCount);
  writeToCountCSV(convert2DArrayToCSV(coutCSV));

  console.log("Match Uploaded");
  res.sendStatus(200);
});

// Requests for scouting format
app.get("/getFields", (req, res) => {
  res.json(fields);
});

app.get("/getGridFields", (req, res) => {
  res.json(gridFields);
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});

// Read csv and format functions
function readFromCountCSV() {
  results = [];
  data = fs.readFileSync("./public/dataAsCount.csv", "utf8");

  const rows = data.trim().split("\n");

  for (const row of rows) {
    const values = row.split(",");
    results.push(values);
  }

  return results;
}

function readFromPointsCSV() {
  results = [];
  data = fs.readFileSync("./public/dataAsPoints.csv", "utf8");

  const rows = data.trim().split("\n");

  for (const row of rows) {
    const values = row.split(",");
    results.push(values);
  }

  return results;
}

function readFromGridCSV() {
  results = [];
  data = fs.readFileSync("./public/dataAsGrid.csv", "utf8");

  const rows = data.trim().split("\n");

  for (const row of rows) {
    const values = row.split(",");
    results.push(values);
  }

  return results;
}

// Write to csv functions
function writeToCountCSV(csv) {
  fs.writeFileSync("./public/dataAsCount.csv", csv, "utf8");
}

function writeToPointsCSV(csv) {
  fs.writeFileSync("./public/dataAsPoints.csv", csv, "utf8");
}

function writeToGridCSV(csv) {
  fs.writeFileSync("./public/dataAsGrid.csv", csv, "utf8");
}

function convert2DArrayToCSV(data) {
  return data
    .map((item) => {
      var row = item;
      return row.join(",");
    })
    .join("\n");
}

// Write headers to points csv if empty
data = readFromPointsCSV();
if (data == 0) {
  headers = [[]];
  for (let i = 0; i < gridFields.length; i++) {
    if (gridFields[i].type == "checkbox grid") {
      for (let j = 0; j < gridFields[i].categoriesNames.length; j++) {
        headers[0].push(gridFields[i].categoriesNames[j]);
      }
    } else if (gridFields[i].type != "title") {
      headers[0].push(gridFields[i].name);
    }
  }
  headers[0].push("Time Uploaded");
  writeToPointsCSV(convert2DArrayToCSV(headers));
}

// Write headers to count csv if empty
data = readFromCountCSV();
if (data == 0) {
  headers = [[]];
  for (let i = 0; i < gridFields.length; i++) {
    if (gridFields[i].type == "checkbox grid") {
      for (let j = 0; j < gridFields[i].categoriesNames.length; j++) {
        headers[0].push(gridFields[i].categoriesNames[j]);
      }
    } else if (gridFields[i].type != "title") {
      headers[0].push(gridFields[i].name);
    }
  }
  headers[0].push("Time Uploaded");
  writeToCountCSV(convert2DArrayToCSV(headers));
}

// Write headers to grid csv if empty
data = readFromGridCSV();
if (data == 0) {
  headers = [[]];
  for (let i = 0; i < gridFields.length; i++) {
    if (gridFields[i].type == "checkbox grid") {
      for (let j = 0; j < gridFields[i].grid.length; j++) {
        for (let k = 0; k < gridFields[i].grid[j].length; k++) {
          headers[0].push(gridFields[i].name + " " + j + " " + k);
        }
      }
    } else if (gridFields[i].type != "title") {
      headers[0].push(gridFields[i].name);
    }
  }
  headers[0].push("Time Uploaded");
  writeToGridCSV(convert2DArrayToCSV(headers));
}
