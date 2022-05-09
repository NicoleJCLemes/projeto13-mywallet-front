import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import UserContext from '../context/UserContext'
import { useState } from 'react';

export default function App() {

    const savedToken = localStorage.getItem("token");
    const [token, setToken] = useState(savedToken);

    return(
        <UserContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path='/' element={<SignInPage />} />
                    <Route path='/sign-up' element={<SignUpPage />} />
                    <Route path='/deposit' element={<Deposit />} />
                    <Route path='/withdrawal' element={<Withdrawal />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}