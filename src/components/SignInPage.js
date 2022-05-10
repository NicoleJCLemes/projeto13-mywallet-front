import styled from 'styled-components';
import Input from '../style/Input';
import Button from '../style/Button';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import UserContext from '../context/UserContext';

export default function SignInPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const {setToken, setName} = context;

    function signIn(e) {
        e.preventDefault();

        const URL = process.env.REACT_APP_API;

        const promise = axios.post(URL, {
            email,
            password,
        });

        promise.then((response) => {
            console.log(response.status);
            localStorage.setItem("token", `${response.data.token}`);
            localStorage.setItem("name", `${response.data.name}`);
            setName(response.data.name);
            setToken(response.data.token);
            navigate('/home');
        });

        promise.catch((e) => {
            console.log(e.request.status);
            alert("Não foi possível realizar o login!");
        })

    }

    return(
        <Main>
            <Header>MyWallet</Header>
            <Form onSubmit={signIn}>
                <Input placeholder='E-mail' type='email' onChange={(e) => setEmail(e.target.value)} required />
                <Input placeholder='Senha' type='password' onChange={(e) => setPassword(e.target.value)} required />
                <Button type='submit'>Entrar</Button>
            </Form>
            <Link to='/sign-up'><p>Primeira vez? Cadastre-se!</p></Link>
        </Main>
    )
}

const Header = styled.header`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
`
const Form = styled.form`
    height: 188px;
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
        margin-top: 36px;
    }
`