# PinMeTo Robot

A React + Vite + Tailwind application that simulates robot movement within a room based on user-inputted commands. The robot can navigate in different room shapes, accept commands in multiple languages, and visualize its path and final position.

## Features

- Configure the room's shape and size.
- Set the robot's starting position and direction.
- Enter movement commands in English, Swedish, or French.
- Validate and execute commands to determine the robot's final position.
- Visualize the robot's movement path in a grid.

## Tech Stack

- **React 19** - Frontend framework
- **Vite** - Development environment
- **Tailwind CSS** - Styling framework
- **ESLint** - Code linting

## Installation

Ensure you have **Node.js >=20.0.0** installed.

```sh
# Clone the repository
git clone https://github.com/PinMeTo/codetest_victor.git
cd codetest_victor

# Install dependencies
npm install
```

## Usage

Start the development server:

```sh
npm run dev
```

Run tests:

```sh
npm test
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

Lint the code:

```sh
npm run lint
```

## Project Structure

```
├── src
│   ├── components       # Reusable UI components
│   ├── context          # React context
│   ├── hooks            # Custom React hooks
│   ├── utils            # Helper functions for logic
│   ├── App.jsx          # Main application file
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│
├── public               # Static assets
├── package.json         # Project metadata
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Commands Format

- **English**: `L` (left), `R` (right), `F` (forward)
- **Swedish**: `V` (vänster/left), `H` (höger/right), `G` (gå/forward)
- **French**: `G` (gauche/left), `D` (droite/right), `A` (avancer/forward)

Example input:

```
FRFLF
```

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT License.
