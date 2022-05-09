import styled from 'styled-components';
import Input from '../style/Input';
import Button from '../style/Button';
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Deposit() {

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const {token} = context;
    
    function toDeposit(e) {
        
        e.preventDefault();

        console.log(amount, description)

        const URL = "http://localhost:5000/deposit/";
        const body = {
            amount,
            description
        };

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        
        const promise = axios.post(URL, body, config);
    
        promise.then((response) => {
            console.log(response.status);
            navigate('/home');
        });
    
        promise.catch((e) => {
            console.log(e.request.status);
            alert("Não foi possível enviar seu depósito");
        });

    }

    return(
        <Main>
            <header>Nova entrada</header>
            <form onSubmit={toDeposit}>
                <Input placeholder='Valor' type='number' onChange={(e) => setAmount(e.target.value)} required />
                <Input placeholder='Descrição' type='text' onChange={(e) => setDescription(e.target.value)} required />
                <Button type='submit'>Salvar entrada</Button>
            </form>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway', sans-serif;
    padding: 25px;

    header {
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
        margin-bottom: 40px;
        margin-left: -160px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 188px;
    }
`