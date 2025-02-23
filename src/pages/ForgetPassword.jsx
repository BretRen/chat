import supabaseC from "../config/supabase";
import { useState } from "react";
import { Turnstile } from '@marsidev/react-turnstile'
import { useRef } from 'react';
export default function ForgetPassword() {
    const [captchaToken, setCaptchaToken] = useState()
    const turnstileRef = useRef(null);
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [disabled, setDisabled] = useState(true)
    const supabase = supabaseC()



    const sub = async () => {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('邮箱格式不正确')
            setDisabled(true)
            return
        } else {
            setError('')
            setDisabled(false)
        }
        setDisabled(true)   
        const { data, error } = await supabase.auth.resetPasswordForEmail(email,{})
        console.log(captchaToken)
        if (error) {
            console.error('error', error)
            setError('忘记密码失败，原因：' + error)
            setDisabled(false)
            turnstileRef.current.reset();
            return
        }
        console.log('success', data)
        setError('重置密码邮件已发送，请前往邮箱点击确认并修改您的密码')

        

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
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center">Forget Password</h1>
                <div className="mt-5">
                    <input value={email} onChange={setEmailFunction} type="text" placeholder="邮箱" className="p-2 m-2 border-2 rounded-lg"></input>
                </div>
                <Turnstile
                    siteKey="0x4AAAAAAA9HGIwJ0IZ2Gu1o"
                    ref={turnstileRef}
                    onSuccess={(token) => {
                        setCaptchaToken(token)
                    }}
                />
                <p className="text-red-500 m-4">{error}</p>
                {/* <p className="text-red-500 m-4">警告，此网站暂时已经停止进行忘记密码</p> */}

                <div className="mt-5">
                    <button onClick={sub} className=" disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-blue-200 border-2 px-10 py-3 rounded-2xl" disabled={disabled}>确认</button>
                    {/* <button onClick={sub} className=" disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-blue-200 border-2 px-10 py-3 rounded-2xl" disabled>确认</button> */}

                </div>
            </div>
        </div>
    )
}