/**
 * @desc Dependencies
 */
import styled from 'styled-components';

const StartScreenContainer = styled.div`
  width: 100%;

  .title, .instructions {
    width: 100%;
    text-align: center;
    margin: 30px 0;
  }

  .configuration {
    width: 90%;
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    justify-content: space-arround;
    flex-wrap: wrap;

    .first-column {
      width: 100%;
  
      @media (min-width: 1140px) {
        width: 70%;
      }
  
      .grid-container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
  
        @media (min-width: 1140px) {
          margin: 0;
        }
      }
    }
  
    .second-column {
      width: 100%;
  
      @media (min-width: 1140px) {
        width: 30%;
      }
  
      .actions {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
  
        @media (min-width: 1140px) {
          margin: 0;
        }

        .buttons-container {
          margin: 30px;
        }
      }
    }
  }
`;

export default StartScreenContainer;
