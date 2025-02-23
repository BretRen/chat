import supabaseC from "../config/supabase";
import { useState } from "react";
export default function OtpLogin() {
    const [email, setEmail] = useState('')


    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    const [disabled, setDisabled] = useState(true)
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
    const login = async () => {
        const supabase = supabaseC()
        const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

        if (error) {
            console.error('error', error)
            setError('登录失败，原因：' + error)
            setDisabled(false)
            return
        }
        console.log('success', data)
        // 跳转到首页
        // window.localStorage.setItem("sb-lysuqcspfpugxozttfek-auth-token", data.session.access_token)
        // window.localStorage.setItem("sb-lysuqcspfpugxozttfek-refresh-token", data.refresh_token)
        window.location.href = '/'

    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-8">Login</h1>
                <form>
                    <input value={email} onChange={setEmailFunction} type="text" placeholder="邮箱" className="p-2 m-2 border-2 rounded-lg"></input>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp"  >OTP</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="otp" type="text" placeholder="OTP" value={token} onChange={(e)=>setToken(e.target.value)}     />
                    </div>
                    <p className="text-red-500 m-4">{error}</p>
                    <div className="flex items-center justify-between">
                        <button onClick={login} className=" disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-blue-200 border-2 px-20 py-5 rounded-2xl" disabled={disabled}>确认</button>
                    </div>
                </form>
            </div>
        </div>
    )
}