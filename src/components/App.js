import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import Home from './Home';
import UserContext from '../context/UserContext'
import { useState } from 'react';

export default function App() {

    const savedToken = localStorage.getItem("token");
    const savedName = localStorage.getItem("name");
    const [token, setToken] = useState(savedToken);
    const [name, setName] = useState(savedName);

    return(
        <UserContext.Provider value={{token, setToken, name, setName}}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path='/' element={<SignInPage />} />
                    <Route path='/sign-up' element={<SignUpPage />} />
                    <Route path='/deposit' element={<Deposit />} />
                    <Route path='/withdrawal' element={<Withdrawal />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}