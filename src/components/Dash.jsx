import { useState } from 'react'
import ChangePassword from '@components/ChangePassword'
import supabaseC from "../config/supabase";
import { useNavigate } from 'react-router-dom';
export default function Dash() {
    const [isOpenChangePassword, setIsOpenChangePassword] = useState(false)
    // const [isOpenLogout, setIsOpenLogout] = useState(false)

    const openChangePassword = () => {
        setIsOpenChangePassword(!isOpenChangePassword)
    }
    const navigate = useNavigate();

    const logout = async() => {
        const supabase = supabaseC()
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('error', error)
            alert('退出失败，原因：' + error)
            return
        }
        navigate('/')
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen ">
            <h1 className="text-2xl">仪表盘</h1>
            <div className="flex flex-row">
                <div className="m-4 px-20 py-40 bg-white flex flex-col">
                    <h1 className="p-4">个人资料</h1>
                    <div className="flex flex-col gap-4">
                        <button onClick={openChangePassword} className=" hover:bg-blue-200 p-4 bg-blue-100 rounded-2xl">更改密码</button>
                        <button className="p-4 bg-blue-100 rounded-2xl hover:bg-blue-200" onClick={logout}>退出登录</button>
                    </div>


                </div>
                <div className=" m-4 px-20 py-40 bg-white ">
                    <h1>服务</h1>
                </div>
            </div>
            { isOpenChangePassword ? <ChangePassword /> : null}
        </div>
    )
}