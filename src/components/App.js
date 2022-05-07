import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

export default function App() {
    return(
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path='/' element={<SignInPage />} />
                <Route path='/sign-up' element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    )
}