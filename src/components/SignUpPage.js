import Input from "../style/Input";
import Button from "../style/Button";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import dotenv from 'dotenv';
dotenv.config();

export default function SignUpPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');
    const navigate = useNavigate();

    function signUp(e) {
        e.preventDefault();

        const URL = `${process.env.REACT_APP_API}sign-up/`;
        const promise = axios.post(URL, {
            name,
            email,
            password,
            passwordConfirmed
        });

        promise.then((response) => {
            console.log(response.data);
            navigate('/');
        });

        promise.catch((e) => {
            console.log(e.request.status)
            alert("Não foi possível realizar o cadastro!")
        })

    }


    return(
        <Main>
            <Header>MyWallet</Header>
            <Form onSubmit={signUp}>
                <Input placeholder='Nome' type='text' onChange={(e) => setName(e.target.value)} required />
                <Input placeholder='E-mail' type='email' onChange={(e) => setEmail(e.target.value)} required />
                <Input placeholder='Senha' type='password' onChange={(e) => setPassword(e.target.value)} required />
                <Input placeholder='Confirme a senha' type='password' onChange={(e) => setPasswordConfirmed(e.target.value)} required />
                <Button type="submit">Cadastrar</Button>
            </Form>
            <Link to='/'><p>Já tem uma conta? Entre agora!</p></Link>
        </Main>
    )
}

const Header = styled.header`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 28px;
`
const Form = styled.form`
    height: 330px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`

const Main = styled.main`

    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: 'Raleway', sans-serif;

    p {
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
        margin-top: 32px;
    }
`