/**
 * @desc Dependencies
 */
import { create, act } from 'react-test-renderer';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

/**
 * @desc Components
 */
import Grid from './Grid';

let grid = [{
  id: 1,
  status: 'empty',
  taken: false,
  cellContent: 'sea',
}]

describe('[Grid Component]',() => {

  it('Renders correctly', () => {
    const {queryByTestId} = render(<Grid gridName="user"  grid={grid} onClickCell={() => {}}/>);
    expect(queryByTestId('grid-component')).toBeTruthy();
  });
  
  it('Matches snapshot', () => {
    const input = create(<Grid gridName="user"  grid={grid} onClickCell={() => {}} />).toJSON;
    expect(input).toMatchSnapshot();
  });

  it("Should return correct number of cells", () => {
    const onClickCell = jest.fn();
    const { getAllByTestId } = render(<Grid gridName="user" grid={grid} enableGrid={true}  onClickCell={onClickCell} />);
    // Gets all cells
    const cells = getAllByTestId(/cell-component/);
    expect(cells).toHaveLength(grid.length);

  });

  it("Should call prop function onClickCell with right arguments", () => {
    const onClickCell = jest.fn();
    const { getByTestId } = render(<Grid gridName="user" grid={grid} enableGrid={true}  onClickCell={onClickCell} />);
    // Gets cell item
    const cell = getByTestId(/cell-component/);

    // Fires onClick event in cell item
    act(() => {
      fireEvent.click(cell);
    });

    expect(onClickCell).toHaveBeenCalled();
    expect(onClickCell).toHaveBeenCalledWith(grid[0]);

  });

})