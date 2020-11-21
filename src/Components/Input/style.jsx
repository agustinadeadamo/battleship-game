/**
 * @desc Dependencies
 */
import styled from 'styled-components';

/**
 * @desc Variables
 */
import Colors from '../../MainStyles/Variables';

export const InputComponent = styled.input`
    width: 100%;
    border: 1px solid ${Colors.grey};
    color: ${Colors.grey};
    height: 40px;
    padding: 0 10px;
`;

export const MessageError = styled.p`
    color: ${Colors.red};
`;

export default InputComponent;
