/**
 * @desc Dependencies
 */
import styled from 'styled-components';

const GameScreenContainer = styled.div`
width: 90%;
max-width: 1240px;
margin: 0 auto;

  .title {
    width: 100%;
    text-align: center;
    margin: 30px 0;
  }

  .player-turn {
    text-align: center;
  }

  .grids-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .grid-name {
      margin: 20px 0;
      text-align: center;
    }

    .first-column, .second-column {
      width: 100%;
  
      @media (min-width: 1140px) {
        width: 45%;
      }
  
      .grid-container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
  
        @media (min-width: 1140px) {
          margin: 20px 0;
        }
      }
    }
  }

  .button-row {
    width: 100%;

    .button-container {
      width: 30%;
      max-width: 300px;
      margin: 30px auto;
    }
  }
`;

export default GameScreenContainer;
