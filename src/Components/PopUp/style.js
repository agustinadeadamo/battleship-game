/**
 * @desc Dependencies
 */
import styled from 'styled-components';
import Colors from '../../MainStyles/Variables';

/**
 * @desc Variabled
 */

const PopUpComponent = styled.div`
  width: 100%;
  max-width: 300px;
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  color: ${Colors.white};
  font-size: 13px;
  background: ${Colors.green};
  font-weight: 600;
  border-radius: 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &.show {
    top: 0; 
    transition: all 0.5s ease 0s; 
    -webkit-transition: all 0,5s ease 0s; 
  }

  &.hide {
    top: -50%; transition: all 0.5s ease 0s; -webkit-transition: all 0.5s ease 0s;
  }
`;

export default PopUpComponent;
