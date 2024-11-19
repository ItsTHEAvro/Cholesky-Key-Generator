# Cholesky Key Generator

## Description

This project implements a cryptographic key generator using Cholesky decomposition. The user inputs the matrix dimension and desired key length, and the system generates a Symmetric Positive Definite (SPD) matrix. The Cholesky decomposition is then applied to this matrix to generate cryptographic keys, which are displayed to the user.

The project consists of the following files:

- **index.html**: The main HTML structure for the webpage.
- **styles.css**: Styling for the webpage layout and appearance.
- **script.js**: JavaScript code to handle the generation of keys and matrix operations.

## File Structure

```plaintext
/cryptographic-key-generator
|-- index.html
|-- styles.css
|-- script.js
```

## Features

- **Matrix Input**: Users can input the dimension of the matrix and the desired key length.
- **Key Generation**: Generates cryptographic keys using Cholesky decomposition on a Symmetric Positive Definite matrix.
- **SPD Matrix**: Displays the generated SPD matrix and its Cholesky decomposition.
- **Clear Functionality**: Clears all input and output fields to reset the app.

## HTML: `index.html`

This file contains the structure of the webpage, which consists of two main sections:

1. **Input Section**: Allows the user to input the matrix dimension and key length.

   ```html
   <label for="matrix-dimension">Matrix Dimension:</label>
   <input
     type="number"
     id="matrix-dimension"
     placeholder="Enter dimension (e.g. 3)"
   />

   <label for="key_length">Key Length:</label>
   <input
     type="number"
     id="key_length"
     placeholder="Length of generated keys"
   />
   ```

2. **Result Section**: Displays the results.
   ```html
   <h3>Generated SPD Matrix:</h3>
   <div id="matrix-table"></div>
   <h3>Lower Triangular Form:</h3>
   <div id="lower_triangular"></div>
   <h3>Generated Cryptographic Keys:</h3>
   <input type="text" id="keys-output" readonly />
   ```

## CSS: `styles.css`

The styles in this file provide a clean and minimalistic layout:

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.input-section,
.result-section {
  width: 45%;
  padding: 20px;
  margin: 5px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  width: 48%;
  padding: 10px;
  margin-top: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
```

## JavaScript: `script.js`

This script handles the logic behind the key generation:

### Key Functions:

- **`generateKeys()`**: Triggered when the user clicks "Generate Keys". It:

  1. Validates user input.
  2. Generates a Symmetric Positive Definite matrix (SPD).
  3. Performs Cholesky decomposition on the matrix.
  4. Generates cryptographic keys based on the lower triangular matrix.
  5. Displays the matrix and generated keys in the result section.

  ```javascript
  function generateKeys() {
    const dimension = parseInt(
      document.getElementById("matrix-dimension").value
    );
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
  ```

- **`generateCryptoKeysFromMatrix()`**: Generates cryptographic keys based on the lower triangular matrix obtained from the Cholesky decomposition. The values from the matrix are mapped to characters, and the resulting key is generated by repeating this mapping until the desired length is reached.

  ```javascript
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
  ```

- **`generateSPDMatrix()`**: Generates a random Symmetric Positive Definite (SPD) matrix of a given dimension:

  1. Random values are generated for the matrix.
  2. The matrix is made symmetric by mirroring the elements across the diagonal.
  3. The diagonal elements are increased to ensure positive definiteness.

  ```javascript
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
  ```

- **`choleskyDecompose()`**: Implements the Cholesky decomposition algorithm to find the lower triangular matrix (L) of the SPD matrix. If the matrix is not positive definite, it returns an empty array.

  ```javascript
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
  ```

- **`displayMatrixAsTable()`**: Converts a matrix into an HTML table and inserts it into the specified HTML element (`matrix-table` or `lower_triangular`).

  ```javascript
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
  ```

- **`clearInputs()`**: Clears all input fields and the result display sections.

  ```javascript
  function clearInputs() {
    document.getElementById("matrix-dimension").value = "";
    document.getElementById("keys-output").value = "";
    document.getElementById("matrix-table").innerHTML = "";
    document.getElementById("lower_triangular").innerHTML = "";
  }
  ```

### Event Listeners:

- **Generate Keys Button**: Triggers the `generateKeys()` function.
- **Clear Button**: Clears all inputs and outputs using the `

clearInputs()` function.

### Error Handling:

- If the user inputs invalid values for the matrix dimension or key length, the application will display an alert message and prevent further execution.

## How to Use

1. **Input the matrix dimension**: Enter a positive integer (e.g., 3) for the matrix dimension.
2. **Input the key length**: Enter a number greater than 2 for the length of the generated cryptographic keys.
3. **Generate Keys**: Click "Generate Keys" to generate the SPD matrix, its Cholesky decomposition, and the corresponding cryptographic keys.
4. **Clear Inputs**: Click "Clear" to reset the inputs and outputs.

## Example

- **Matrix Dimension**: 3
- **Key Length**: 5
- **Generated Cryptographic Keys**: `jxmwz, fsrtt, kmzfp`

## License

This project is open-source and available under the MIT License. You can freely use, modify, and distribute it.