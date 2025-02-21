import PropTypes from 'prop-types';

/**
 * PathGrid component
 * @param {object} props
 * @param {object[]} props.edges
 * @param {object} props.edges.start
 * @param {object} props.edges.end
 * @returns {JSX.Element}
 */
const PathGrid = ({ edges }) =>
  edges.map(({ start, end }, index) => (
    <svg
      key={`path-${index}`}
      className="absolute inset-0 w-full h-full pointer-events-none text-primary"
      style={{ zIndex: 1 }}
    >
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4"
      />
    </svg>
  ));

PathGrid.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      end: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default PathGrid;
