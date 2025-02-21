import PropTypes from 'prop-types';

import CircularGrid from './CircularGrid';
import SquareGrid from './SquareGrid';

/**
 * @typedef {import('../types/robot-types').Position} Position
 * @typedef {import('../types/robot-types').Room} Room
 */

/**
 * RoomGrid component
 * @param {object} props
 * @param {Room} props.room
 * @param {Position} props.start
 * @param {Position} props.end
 * @param {Position[]} props.path
 * @returns {JSX.Element}
 */
const RoomGrid = ({ room, start, end, path }) => {
  if (room.shape === 'circular') {
    return <CircularGrid radius={room.size} start={start} end={end} path={path} />;
  }

  return <SquareGrid size={room.size} start={start} end={end} path={path} />;
};

RoomGrid.propTypes = {
  room: PropTypes.shape({
    shape: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }),
  start: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  end: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  path: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ),
};

export default RoomGrid;
