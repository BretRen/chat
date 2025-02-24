import { useEffect, useState } from "react";
import supabaseC from "../../config/supabase";

export default function Chat() {
    // 使用 useState 管理公告数据
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getAnnouncement() {
            const supabase = supabaseC();
            const { data, error } = await supabase
                .from('system')
                .select()
                .eq('type', 'announcement');

            if (error) {
                setError(error);  // 错误处理
                setLoading(false);
                return;
            }
            setAnnouncement(data);  // 更新状态
            setLoading(false);
        }

        getAnnouncement();  // 调用异步函数
    }, []);  // 只在组件挂载时执行一次

    if (loading) {
        return <div>加载中...</div>;
    }

    if (error) {
        return <div>出现错误：{error.message}</div>;
    }

    return (
        <div>
            <nav className="bg-gray-100 p-6 flex justify-between items-center">
                <h1>欢迎来到PdNode Chat，祝你们聊的开心😄！</h1>

                <div className="flex flex-col">
                    <p>以下为公告：</p>
                    <div>
                        {announcement && announcement.length > 0 ? (
                            announcement.map((item, index) => (
                                <p className="text-red-400" key={index}>{item.value}</p>      // 假设公告内容字段为 content
                            ))
                        ) : (
                            <p>没有找到公告</p>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
