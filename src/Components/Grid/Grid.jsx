/**
 * @desc Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @desc Styles
 */
import {
  GridComponent,
} from './style';

const Grid = (props) => {
  // Destructuring props
  const {
    gridName,
    onClickCell,
    enableGrid,
    grid,
  } = props;

  return (
    <div>
      <GridComponent data-testid="grid-component" gridName={gridName} className={`grid-${gridName}`}>
        <div className="content">
        {
          grid && grid.map((cell) => (
            <div
              key={cell.id}
              role="presentation"
              onClick={() => enableGrid && onClickCell(cell)}
              id={cell.id}
              className={`cell ${cell.status}`}
              data-testid="cell-component"
            />
          ))
        }
        </div>
      </GridComponent>
    </div>
  );
};

Grid.propTypes = {
  gridName: PropTypes.string.isRequired,
  onClickCell: PropTypes.func.isRequired,
  enableGrid: PropTypes.bool,
  grid: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Grid.defaultProps = {
  enableGrid: false,
};

export default Grid;
