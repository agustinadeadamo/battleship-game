/**
 * @desc Dependencies
 */
import styled from 'styled-components';

/**
 * @desc Variabled
 */
import Colors from '../../MainStyles/Variables';

export const GridComponent = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  display: flex;
  flex-wrap: wrap;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
  }
  
  &.grid-user {
    .hit {
      background-color: ${Colors.orange};
    }

    .missed {
      background-color: ${Colors.lightBlue};
    }

    .destroyed {
      background-color: ${Colors.red};
    }

    .taken {
      background-color: ${Colors.grey};
    }
  }

  .cell {
    width: 10%;
    height: 10%;
    ${(props) => props.enableGrid && 'cursor: pointer;'}

    &.empty {
      border: 2px solid ${Colors.grey};
    }

  }
`;

export default GridComponent;
