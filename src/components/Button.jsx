import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
export function Button({ color = "bg-blue-100", text, url= "#",o = null}) {
    const navigate = useNavigate();
    // 处理点击事件
    const click = () => {
        // 如果 url 不是完整路径，则拼接它
        if (url !== "#" && !url.startsWith("#")) {
            // 确保不重复拼接路径
            if (url.startsWith("/")) {
                navigate(url);  // 如果url是以/开头的，直接跳转
            } else {
                navigate(`/${url}`);  // 拼接为完整路径
            }
        }
    };
    return (
        <button onClick={click} className={`${color} ${o} hover:bg-blue-200 border-2 px-20 py-5 rounded-2xl`}>
            {text}
        </button>
    );
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    o: PropTypes.string
};
