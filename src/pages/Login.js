import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import config from '../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser } from "../store/authSlice"

function Login () {

    const toastId = React.useRef(null);
    const [credential, setCredential] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch()
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
                dispatch(fetchLoggedInUser())
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
        } catch (err) {
            toast.error('internal server issue')
            console.log(err)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("auth-token") != null) {
            navigate("/");
            return;
        }
    }, [])


    return (<>
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
                                    bg-gray-200
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
                                    bg-gray-200
                                    px-3
                                    py-1
                                    mb-4'
                    />
                </div>
                <div>
                    <button type="submit" className='bg-green-400 text-white font-medium p-1 w-[100%]'>Login</button>
                </div>
                <div>
                    <h1 className='text-sm mt-1'>Don't have an account. <Link className='text-blue-600 underline' to="/auth/signup">Create</Link></h1>
                </div>
            </form>
        </div>
    </>
    );
}

export default Login;
