import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import styled from 'styled-components';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Home() {
    
    const context = useContext(UserContext);
    const {name, token} = context;
    const [deposits, setDeposits] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    let total = 0;

    // token
    // router, middleware

    useEffect(() => {

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const URL_D = "http://localhost:5000/deposit";
        const promiseD = axios.get(URL_D, config);
    
        promiseD.then((response) => {
            setUserId(response.data.userId);
            setDeposits(response.data);
        });
    
        promiseD.catch((e) => console.log("Não foi possível buscar os depósitos"));
        
        const URL_W = "http://localhost:5000/withdrawal";
        const promiseW = axios.get(URL_W, config);
    
        promiseW.then((response) => {
            setUserId(response.data.userId);
            setWithdrawals(response.data);
        });
    
        promiseW.catch((e) => console.log("Não foi possível buscar os saques")); // eslint-disable-next-line
    } ,[])


    function compare (a, b) {
        return a.date > b.date
    }

    function logOut() {
        localStorage.clear();

        const promise = axios.delete(`http://localhost:5000/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        promise.then((res) => console.log(res.data));

        navigate("/");
    }

    deposits.sort(compare);
    withdrawals.sort(compare);

    return (deposits.length !== 0 || withdrawals.length !== 0) ? ( //terminar o css e testar
        <Main>
            <header>
                <p>Olá, {name}</p>
                <ion-icon onClick={logOut} name="exit-outline"></ion-icon>
            </header>
            <div className="transaction-board">
                {deposits.map((deposit) =>
                {
                    total += parseInt(deposit.amount)
                    return <p className="transaction" key={deposit._id}><span className="date">{deposit.date}</span> <span className="description">{deposit.description}</span> <span className="deposit-amount">{deposit.amount}</span></p>
                })}
                {withdrawals.map((withdrawal) =>
                {
                    total -= parseInt(withdrawal.amount)
                    return <p className="transaction" key={withdrawal._id}><span className="date">{withdrawal.date}</span> <span className="description">{withdrawal.description}</span> <span className="withdrawal-amount">{withdrawal.amount}</span></p>
                })}
                <p className="balance-total"><span className="balance">SALDO</span> <span className="total">{total}</span></p>
            </div>
            <footer>
                <Link to='/deposit'>
                    <button>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <p>Nova entrada</p>
                    </button>
                </Link>
                <Link to='/withdrawal'>
                    <button>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <p>Nova saída</p>
                    </button>
                </Link>
            </footer>
        </Main>
    ) : (
        <Main>
            <header>
                <p>Olá, {name}</p>
                <ion-icon name="exit-outline"></ion-icon>
            </header>
            <div className="empty-board"><p>Não há registros de entrada ou saída</p></div>
            <footer>
            <Link to='/deposit'>
                    <button>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <p>Nova entrada</p>
                    </button>
                </Link>
                <Link to='/withdrawal'>
                    <button>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <p>Nova saída</p>
                    </button>
                </Link>
            </footer>
        </Main>
    )
}

function totalColor(p) {
    if (p >= 0) {
        return '#03AC00';
    } else if (p < 0) {
        return '#C70000';
    }
}

const Main = styled.main`

    padding: 25px;

    header {
        display: flex;
        justify-content: space-between;
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
        margin-bottom: 22px;

        ion-icon {
            color: #FFFFFF;
            font-size: 30px;
            --ionicon-stroke-width: 40px;
        }
    }

    div {
        width: 326px;
        height: 446px;
        background: #FFFFFF;
        border-radius: 5px;
    }
    .empty-board {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
            width: 180px;
            height: 46px;
        }
    }

    footer {

        display: flex;
        justify-content: space-between;
        margin-top: 13px;

        button {
            width: 155px;
            height: 114px;
            background-color: #A328D6;
            border-radius: 5px;
            border: none;
            color: #FFFFFF;
            font-style: normal;
            font-weight: 700;
            font-size: 17px;
            line-height: 20px;
            position: relative;
        }

        ion-icon {
            color: #FFFFFF;
            font-size: 25px;
            --ionicon-stroke-width: 35px;
            position: absolute;
            top: 11px;
            left: 10px;
        }

        p {
            width: 64px;
            height: 40px;
            text-align: left;
            position: absolute;
            bottom: 9px;
            left: 10px;
        }
    }

    .transaction-board {

        position: relative;
        padding: 23px 11px 10px 15px;

        .balance {
            font-style: normal;
            font-weight: 700;
            font-size: 17px;
            line-height: 20px;
            color: #000000;
        }

        .total {
            font-weight: 400;
            font-size: 17px;
            line-height: 20px;
            text-align: right;
            color: ${({total}) => totalColor(total)};
        }

        .balance-total {
            position: absolute;
            bottom: 10px;
            left: 15px;
            width: 300px;
            display: flex;
            justify-content: space-between;
        }

        .date .description .amount {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            width: 300px;
        }

        .transaction {
            position: relative;
        }

        .date {
            color: #C6C6C6;
            margin-right: 5px;
        }

        .description {
            color: #000000;
        }

        .deposit-amount {
            color: #03AC00;
            position: absolute;
            right: 0;
        }

        .withdrawal-amount {
            color: #C70000;
            position: absolute;
            right: 0;
        }

    }
`
