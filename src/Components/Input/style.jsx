/**
 * @desc Dependencies
 */
import styled from 'styled-components';

/**
 * @desc Variabled
 */
import Colors from '../../MainStyles/Variables';

const InputComponent = styled.input`
    width: 100%;
    border: 1px solid ${Colors.grey};
    color: ${Colors.grey};
    height: 40px;
    padding: 0 10px;
`;

export default InputComponent;
