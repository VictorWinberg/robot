/**
 * @typedef {import('../types/robot-types').Position} Position
 * @typedef {import('../types/robot-types').Room} Room
 */

const directionMap = {
  N: { left: 'W', right: 'E' },
  E: { left: 'N', right: 'S' },
  S: { left: 'E', right: 'W' },
  W: { left: 'S', right: 'N' },
};

const languageCommands = {
  english: { left: 'L', right: 'R', forward: 'F' },
  swedish: { left: 'V', right: 'H', forward: 'G' },
  french: { left: 'G', right: 'D', forward: 'A' },
};

/**
 * Move the robot forward based on its current direction
 * @param {Position} state
 * @returns {Position}
 */
const moveForward = (state) => {
  const newState = { ...state };
  switch (state.direction) {
    case 'N':
      newState.y--;
      break;
    case 'E':
      newState.x++;
      break;
    case 'S':
      newState.y++;
      break;
    case 'W':
      newState.x--;
      break;
  }
  return newState;
};

/**
 * Check if the robot is in a valid position
 * @param {Position} state
 * @param {Room} room
 * @returns {boolean}
 */
const isValidPosition = (state, room) => {
  if (room.shape === 'square') {
    return (
      state.x >= 0 && state.x < room.size && state.y >= 0 && state.y < room.size
    );
  } else {
    const distanceFromCenter = Math.sqrt(
      Math.pow(state.x, 2) + Math.pow(state.y, 2)
    );
    return distanceFromCenter <= room.size;
  }
};

/**
 * Execute commands to move the robot
 * @param {string} commands
 * @param {string} language
 * @param {Position} start
 * @param {Room} room
 * @returns {{ end: Position, path: Position[] }}
 */
export const executeCommands = (commands, language, start, room) => {
  const cmdMap = languageCommands[language];
  let state = { ...start };
  const path = [state];

  for (const cmd of commands.toUpperCase()) {
    let newState = { ...state };

    if (cmd === cmdMap.left) {
      newState.direction = directionMap[state.direction].left;
    } else if (cmd === cmdMap.right) {
      newState.direction = directionMap[state.direction].right;
    } else if (cmd === cmdMap.forward) {
      newState = moveForward(state);
      if (!isValidPosition(newState, room)) {
        continue;
      }
      path.push({ x: newState.x, y: newState.y });
    }

    state = newState;
  }

  return { end: state, path };
};

/**
 * Validate the commands based on the selected language
 * @param {string} commands
 * @param {string} language
 * @returns {boolean}
 */
export const validateCommands = (commands, language) => {
  const cmdMap = languageCommands[language];
  const validCommands = new Set([cmdMap.left, cmdMap.right, cmdMap.forward]);
  return commands
    .toUpperCase()
    .split('')
    .every((cmd) => validCommands.has(cmd));
};
