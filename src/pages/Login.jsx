import { Button } from "@components/button";
import supabaseC from "../config/supabase";
import { useEffect, useState } from "react";
import { Turnstile } from '@marsidev/react-turnstile'
import { useNavigate,Link } from 'react-router-dom';
import { useRef } from 'react';
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const [disabled, setDisabled] = useState(true)

    const [captchaToken, setCaptchaToken] = useState()

    const navigate = useNavigate();
    const turnstileRef = useRef(null);

    useEffect(() => {
        if (window.localStorage.getItem("sb-lysuqcspfpugxozttfek-auth-token") != null){
            navigate('/')
            return
        }
    },[navigate])



    const GoLogin = async () => {
        if (password.length < 8) {
            setError('密码长度不能小于8')
            setDisabled(true)
            return
        } else {
            setError('')
            setDisabled(false)
        }

        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('邮箱格式不正确')
            setDisabled(true)
            return
        } else {
            setError('')
            setDisabled(false)
        }

        setDisabled(true)

        const supabase = supabaseC()
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
            options: { captchaToken },
        })

        if (error) {
            console.error('error', error)
            setError('登录失败，原因：' + error)
            setDisabled(false)
            turnstileRef.current.reset();
            return
        }
        console.log('success', data)
        // 跳转到首页
        
        navigate(`/`); 

    }

    const setEmailFunction = (e) => {
        setEmail(e.target.value)
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setError('邮箱格式不正确')
            setDisabled(true)
        } else {
            setError('')
            setDisabled(false)
        }
    }
    const setPasswordFunction = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8) {
            setError('密码长度不能小于8')
            setDisabled(true)
        } else {
            setError('')
            setDisabled(false)
        }
    // }
    // const fogotPassword = async() => {
    //     // 忘记密码
    //     const supabase = supabaseC()
    //     // const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    //     //     redirectTo: 'http://localhost/',

            
    //     // });
    //     const { data, error } = await supabase.auth.resetPasswordForEmail(email,{
    //         options: {
    //             captchaToken: captchaToken
    //         }
    //     })
    //     alert(captchaToken)        
          
    //     if (error) {
    //         console.error('error', error)
    //         setError('忘记密码失败，原因：' + error)
    //         turnstileRef.current.reset();
    //         console.log(captchaToken)
    //         return
    //     }
    //     console.log('success', data)
    //     setError('重置密码邮件已发送，请查收')
    }
    const otp = async() => {
        const supabase = supabaseC()
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('邮箱格式不正确')
            setDisabled(true)
            return
        } else {
            setError('')
        }
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
              emailRedirectTo: 'http://localhost:5173/'
            }
          })

        if (error) {
            console.error('error', error)
            setError('OTP 登录失败，原因：' + error)
            return
        }
        console.log('success', data)
        // 跳转到首页
        navigate(`/otp`);

    }

    return (
        <>
            
            <div className="flex flex-col justify-center items-center h-screen ">

                <h1 className="text-2xl m-4">登录 Pdnode Chat</h1>
                <input value={email} onChange={setEmailFunction} type="text" placeholder="邮箱" className="p-2 m-2 border-2 rounded-lg"></input>
                <input value={password} onChange={setPasswordFunction} type="password" placeholder="密码" className="p-2 m-2 border-2 rounded-lg"></input>

                <p className="text-red-500 m-4">{error}</p>

                <Turnstile
                    siteKey="0x4AAAAAAA9HGIwJ0IZ2Gu1o"
                    ref={turnstileRef}
                    onSuccess={(token) => {
                        setCaptchaToken(token)
                    }}
                />

                {/* <button onClick={fogotPassword}>忘记密码</button> */}
                <button onClick={otp}>使用OTP进行登录</button>
                <Link to={"/forgetpassword"}>忘记密码</Link>

                <Button o={"m-4 "} text={"取消"} url={"/"}></Button>
                <button onClick={GoLogin} className=" disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-blue-200 border-2 px-20 py-5 rounded-2xl" disabled={disabled}>确认</button>

            </div >
        </>
    )
}
export default Login   