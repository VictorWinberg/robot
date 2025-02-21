import { useMemo } from 'react';
import PropTypes from 'prop-types';

import PathGrid from './PathGrid';

/**
 * @typedef {import('../types/robot-types').Position} Position
 */

/**
 * CircularGrid component
 * @param {object} props
 * @param {number} props.radius
 * @param {Position} props.start
 * @param {Position} props.end
 * @param {Position[]} props.path
 * @returns {JSX.Element}
 */
const CircularGrid = ({ radius, start, end, path }) => {
  const edges = useMemo(
    () =>
      path.slice(0, -1).map((point, index) => {
        const nextPoint = path[index + 1];

        return {
          start: {
            x: `${((point.x + radius) / (radius * 2)) * 100}%`,
            y: `${((point.y + radius) / (radius * 2)) * 100}%`,
          },
          end: {
            x: `${((nextPoint.x + radius) / (radius * 2)) * 100}%`,
            y: `${((nextPoint.y + radius) / (radius * 2)) * 100}%`,
          },
        };
      }),
    [path, radius]
  );

  return (
    <div className="relative w-full aspect-square bg-gray-50 rounded-full border-2 border-gray-200 overflow-hidden">
      <PathGrid edges={edges} />
      {/* Start position */}
      <div
        className="absolute w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${((start.x + radius) / (radius * 2)) * 100}%`,
          top: `${((start.y + radius) / (radius * 2)) * 100}%`,
          zIndex: 2,
        }}
      />
      {/* End position */}
      <div
        className="absolute w-3 h-3 bg-secondary rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${((end.x + radius) / (radius * 2)) * 100}%`,
          top: `${((end.y + radius) / (radius * 2)) * 100}%`,
          zIndex: 2,
        }}
      />
      {/* Coordinate lines */}
      <div className="absolute w-full h-[1px] bg-gray-200 top-1/2 left-0" />
      <div className="absolute h-full w-[1px] bg-gray-200 left-1/2 top-0" />
    </div>
  );
};

CircularGrid.propTypes = {
  radius: PropTypes.number.isRequired,
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

export default CircularGrid;
