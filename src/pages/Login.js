import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Utils from '../utils/helper';
import "react-toastify/dist/ReactToastify.css";
import config from '../config/config';

function Login () {
    const [context] = Utils();
    const {authenticate, isAuthenticated} = context;

    const toastId = React.useRef(null);
    const [credential, setCredential] = useState({
        email: "user@gmail.com",
        password: "12345"
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credential.email || !credential.password) {
            toast.error("Field can't be empty!", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000
            })
            return;
        }
        toastId.current = toast("processing...", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            closeButton: false
        })
        try {
            const response = await fetch(`${config.backendEndPoint}/user/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({ email: credential.email, password: credential.password })
            })
            const data = await response.json();
            toast.dismiss(toastId.current)
            if (data.success) {
                toast.success("Logged in successfully!", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                })
                localStorage.setItem("auth-token", data.token);
                authenticate();
                navigate("/");
                setCredential({
                    email: "",
                    password: ""
                })
            } else {
                toast.dismiss(toastId.current)
                toast.error(data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }
            console.log(data);
        } catch (err) {
            toast.error('internal server issue')
            console.log(err)
        }
    }

    useEffect(() => {
        authenticate()
        console.log(isAuthenticated)
        if (isAuthenticated) {
            navigate("/")
        }
    }, [])


    return (<>
        <ToastContainer />
        <div className="
        w-[100%] h-[100%] 
        flex justify-center items-center 
        mt-[100px]">
            <form
                className='
                flex 
                flex-col
                p-[20px]
                '
                onSubmit={handleSubmit}>
                <div className="">
                    <input
                        type="email"
                        value={credential.email}
                        onChange={(e) => setCredential({ ...credential, email: e.target.value })}
                        placeholder='Email'
                        className='text-black
                                    outline-none
                                    border-none
                                    round-lg
                                    bg-[#dfdfdf]
                                    px-3
                                    py-1
                                    mb-4'
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={credential.password}
                        onChange={(e) => setCredential({ ...credential, password: e.target.value })}
                        placeholder="password"
                        className='text-black
                                    outline-none
                                    border-none
                                    round-[10px]
                                    bg-[#dfdfdf]
                                    px-3
                                    py-1
                                    mb-4'
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <div>
                <Link to="/auth/signup">SignUp</Link>
            </div>
        </div>
    </>
    );
}

export default Login;
