/**
 * @desc Dependencies
 */
import styled from 'styled-components';

const EndGameScreen = styled.div`
width: 90%;
max-width: 1240px;
margin: 0 auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
height: 100vh;

  .winner-container {
    width: 300px;
    height: 200px;
    

    .winner {
      font-size: 30px;
      text-align: center;
    }

    .button-play-again {
      margin: 30px 0;
    }
  }
`;

export default EndGameScreen;
