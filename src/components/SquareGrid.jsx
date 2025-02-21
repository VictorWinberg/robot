import { useMemo } from 'react';
import PropTypes from 'prop-types';

import PathGrid from './PathGrid';

/**
 * @typedef {import('../types/robot-types').Position} Position
 */

/**
 * SquareGrid component
 * @param {object} props
 * @param {number} props.size
 * @param {Position} props.start
 * @param {Position} props.end
 * @param {Position[]} props.path
 * @returns {JSX.Element}
 */
const SquareGrid = ({ size, start, end, path }) => {
  const cells = Array(size).fill(null);
  const edges = useMemo(
    () =>
      path.slice(0, -1).map((point, index) => {
        const nextPoint = path[index + 1];

        return {
          start: {
            x: `${(point.x + 0.5) * (100 / size)}%`,
            y: `${(point.y + 0.5) * (100 / size)}%`,
          },
          end: {
            x: `${(nextPoint.x + 0.5) * (100 / size)}%`,
            y: `${(nextPoint.y + 0.5) * (100 / size)}%`,
          },
        };
      }),
    [path, size]
  );

  return (
    <div
      className="relative w-full aspect-square grid gap-[1px] bg-gray-200 p-[1px]"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      <PathGrid edges={edges} />
      {cells.map((_, y) =>
        cells.map((_, x) => (
          <div
            key={`${x}-${y}`}
            className={`aspect-square bg-white flex items-center justify-center relative`}
          >
            {/* Start Position */}
            {x === start.x && y === start.y && (
              <div
                className="absolute inset-0 m-auto w-3 h-3 bg-primary rounded-full"
                style={{ zIndex: 2 }}
              />
            )}
            {/* End Position */}
            {x === end.x && y === end.y && (
              <div
                className="absolute inset-0 m-auto w-3 h-3 bg-secondary rounded-full"
                style={{ zIndex: 2 }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

SquareGrid.propTypes = {
  size: PropTypes.number.isRequired,
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

export default SquareGrid;
