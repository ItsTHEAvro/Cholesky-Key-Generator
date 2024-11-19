# Cholesky Key Generator

A web-based cryptographic key generator using the Cholesky decomposition method. This tool generates cryptographic keys based on a symmetric positive definite (SPD) matrix and provides a lower triangular matrix using Cholesky decomposition. It is designed to be simple to use for cryptography enthusiasts or anyone interested in understanding how matrices and decompositions can be applied in cryptography.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To run this project locally, follow the steps below:

1. Clone the repo:

   ```bash
   git clone https://github.com/ItsTHEAvro/cholesky-key-generator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cholesky-key-generator
   ```

3. Open `index.html` in your web browser:
   ```bash
   index.html
   ```

No additional dependencies are required, as the project only relies on HTML, CSS, and vanilla JavaScript.

## Usage

To use the Cholesky Key Generator:

1. Open the `index.html` file in a web browser.
2. Enter the matrix dimension (e.g., 3 for a 3x3 matrix).
3. Enter the desired key length (minimum 2).
4. Click `Generate Keys` to generate the SPD matrix, perform Cholesky decomposition, and display the results.
5. View the lower triangular form of the matrix and the generated cryptographic keys in the "Results" section.
6. Click "Clear" to reset the inputs and results.

### Example Usage:

- **Matrix Dimension**: 3
- **Key Length**: 5
- After clicking "Generate Keys," the lower triangular matrix and cryptographic keys will appear.

## Features

- **SPD Matrix Generation**: Generates a random SPD (positive semi-definite) matrix of the specified dimension.
- **Cholesky Decomposition**: Performs the Cholesky decomposition to generate the lower triangular matrix.
- **Key Generation**: Generates cryptographic keys based on the values of the lower triangular matrix, with customizable key length.
- **Clear Functionality**: Resets all inputs and results.

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, please feel free to open an issue or submit a pull request. Ensure that your code adheres to the existing style guidelines and that it has been tested.

For more detailed guidelines on contributing, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Maintainer: [Jyotirmoy Avro](https://github.com/ItsTHEAvro)

For any questions or feedback, feel free to open an issue on GitHub or contact me through my GitHub profile.
