document
  .getElementById("generate-keys-btn")
  .addEventListener("click", generateKeys);
document.getElementById("clear-btn").addEventListener("click", clearInputs);

key_length = 0;

function generateKeys() {
  const dimension = parseInt(document.getElementById("matrix-dimension").value);
  if (dimension < 1 || isNaN(dimension)) {
    alert("Please enter a valid dimension.");
    return;
  }

  key_length = parseInt(document.getElementById("key_length").value);
  if (key_length < 2 || isNaN(key_length)) {
    alert("Please enter a valid key length.");
    return;
  }
  let matrix, choleskyMatrix;

  do {
    matrix = generateSPDMatrix(dimension);
    choleskyMatrix = choleskyDecompose(matrix);
  } while (choleskyMatrix.length === 0);

  displayMatrixAsTable(matrix, "#matrix-table");
  displayMatrixAsTable(choleskyMatrix, "#lower_triangular");

  let cryptoKeys = generateCryptoKeysFromMatrix(choleskyMatrix, key_length);

  document.getElementById("keys-output").value = cryptoKeys.join(", ");
}

// Function to map values from lower triangular matrix to keys
function generateCryptoKeysFromMatrix(choleskyMatrix, keyLength) {
  const keys = [];
  const chars = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < choleskyMatrix.length; i++) {
    let key = "";
    let charIndex = 0;
    // Repeat until the key reaches the desired length
    while (key.length < keyLength) {
      // Map the value at [i][j] to a character
      let value = choleskyMatrix[i][charIndex % choleskyMatrix[i].length];
      let index = Math.floor(value * 100) % chars.length;
      key += chars.charAt(index);
      charIndex++;
    }
    keys.push(key);
  }

  return keys;
}

function generateSPDMatrix(dimension) {
  let matrix = [];
  for (let i = 0; i < dimension; i++) {
    matrix[i] = [];
    for (let j = 0; j < dimension; j++) {
      matrix[i][j] = Math.random();
    }
  }

  for (let i = 0; i < dimension; i++) {
    for (let j = i + 1; j < dimension; j++) {
      matrix[j][i] = matrix[i][j]; // Symmetry
    }
  }

  for (let i = 0; i < dimension; i++) {
    matrix[i][i] += dimension * 0.1;
  }

  return matrix;
}

function choleskyDecompose(matrix) {
  const dimension = matrix.length;
  let L = new Array(dimension)
    .fill(null)
    .map(() => new Array(dimension).fill(0));

  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }
      if (i === j) {
        let value = matrix[i][i] - sum;
        if (value < 0) {
          return [];
        }
        L[i][j] = Math.sqrt(value);
      } else {
        L[i][j] = (matrix[i][j] - sum) / L[j][j];
      }
    }
  }

  return L;
}

function displayMatrixAsTable(matrix, elementId) {
  let tableHTML = "<table border='1'>";
  for (let i = 0; i < matrix.length; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < matrix[i].length; j++) {
      tableHTML += `<td>${matrix[i][j].toFixed(2)}</td>`;
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</table>";
  document.querySelector(elementId).innerHTML = tableHTML;
}

function clearInputs() {
  document.getElementById("matrix-dimension").value = "";
  document.getElementById("keys-output").value = "";
  document.getElementById("matrix-table").innerHTML = "";
  document.getElementById("lower_triangular").innerHTML = "";
}
