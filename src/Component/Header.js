import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className='header'>
            <div className='header-container'>
                <div onClick={() => navigate('/')} className='home-img-wrapper'>
                    <img src='https://v2.cocktailfunding.com/static/media/cock_logo_mobile.328979e3.png' className='home-img'></img>
                </div>
                <div className='header-wrapper'>
                    <div className='header-left'>
                        <div onClick={() => navigate('/investment')} >투자하기</div>
                        <div onClick={() => navigate('/loan')} >대출하기</div>
                        <div onClick={() => navigate('/about')} >회사소개</div>
                        <div onClick={() => navigate('/notice')} >공지사항</div>
                        <div onClick={() => navigate('/info')} >공시자료</div>
                    </div>
                    <div className='header-right'>
                        <div onClick={() => navigate('/faq')} >FAQ</div>
                        <div onClick={() => navigate('/login')} >로그인</div>
                        <div onClick={() => navigate('/signup')} >회원가입</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
