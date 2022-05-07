import styled from 'styled-components';

const Input = styled.input`
    width: 326px;
    height: 58px;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    border: none;
    padding-left: 15px;
    font-weight: 400;
    font-family: 'Raleway', sans-serif;

    &&::placeholder {
        font-size: 20px;
        line-height: 23px;
        font-style: normal;
        font-weight: 400;
        color: #000000;
    }

    &&:focus {
        outline: 0;
    }
`
export default Input