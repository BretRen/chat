import { useState } from "react"
import { Turnstile } from '@marsidev/react-turnstile'
import supabaseC from "../config/supabase";
export default function ChangePassword(){

    const [newPassword, SetNewPassword] = useState('')
    const [checkNewPassword, SetCheckNewPassword] = useState('')

    const [error, setError] = useState('')
    const [captchaToken, setCaptchaToken] = useState()
    const [disabled, setDisabled] = useState(true)

    const newPasswordFunction = (e) => {
        SetNewPassword(e.target.value)

        if (e.target.value.length < 8) {
            setError('密码长度不能小于8')
            setDisabled(true)
        }else {
            setError('')
            setDisabled(false)
        }

    }
    const checkNewPasswordFunction = (e) => {
        SetCheckNewPassword(e.target.value)

        if (e.target.value.length < 8) {
            setError('密码长度不能小于8')
            setDisabled(true)
        }else if(newPassword != e.target.value){
            setError('两次密码不一致')
            setDisabled(true)
            console.log(newPassword)
            console.log(checkNewPassword)
        }
        else {
            setError('')
            setDisabled(false)
        }
    }

    const sub = async() => {
        if (checkNewPassword.length < 8) {
            setError('密码长度不能小于8')
            setDisabled(true)
            return
        }else if(newPassword !== checkNewPassword){
            setError('两次密码不一致')
            setDisabled(true)
            return
        }
        else {
            setError('')
            setDisabled(false)
        }
        const supabase = supabaseC()
        // 发送更改密码请求
        // options: { captchaToken },
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
          })

          if (error) {
            console.error('error', error)
            setError('更改密码失败，原因：' + error)
            return
          }
            console.log('success', data)

            setError('更改成功，因为一些原因请手动关闭此窗口（方法：重新点击更改密码按钮）')
            setDisabled(true)
          

    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center">更改密码</h1>
                <div className="mt-4">
                    <label htmlFor="new-password" className="block">新密码</label>
                    <input type="password" id="new-password" value={newPassword} onChange={newPasswordFunction} className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
                <div className="mt-4">
                    <label htmlFor="confirm-password" className="block">确认密码</label>
                    <input type="password" id="confirm-password" value={checkNewPassword} onChange={checkNewPasswordFunction} className="w-full border border-gray-300 rounded-lg p-2" />
                </div>

                <p className="text-red-500 m-4">{error}</p>
                <Turnstile
                    siteKey="0x4AAAAAAA9HGIwJ0IZ2Gu1o"
                    onSuccess={(token) => {
                        setCaptchaToken(token)
                    }}
                />
                <div className="mt-4">
                    <button className="disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-blue-300 disabled:text-gray-400 w-full bg-blue-500 text-white rounded-lg p-2" onClick={sub} disabled={disabled}>更改密码</button>
                </div>
            </div>
        </div>
    )
}