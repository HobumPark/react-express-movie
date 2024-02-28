import '../../css/common/Login.css'
import queryString from 'query-string'
import logo_daum from '../../images/common/login/logo_daum.png'
import { REDIRECT_URI,REST_API_KEY } from './KakaoLoginData';

function Login(){
    const kakaoLogin=()=>{
        window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
        const search=window.location.search
        const queryObj=queryString.parse(search)
        console.log(queryObj)
    }
    return(
        <div id='login'>
            <div id='login-logo'>
                <a href="#">
                    <img src={logo_daum} alt='로고'/>
                </a>
            </div>
            <div id='login-contents'>
                <div id='login-contents-1'>
                    <span>
                        <a href="#">
                            <span className="qr"></span>
                            카카오 QR코드 로그인
                            <span className="info"></span>
                        </a>
                    </span>
                </div>
                <div id='login-contents-2'>
                    <button onClick={kakaoLogin}>
                        <span className="login"></span>
                        카카오 계정으로 로그인
                    </button>    
                </div>
                <div id='login-contents-3'>
                    <span id='id-merge'>
                        <a href="#">
                            <span className="d_logo"></span>
                            Daum 아이디 통합하기
                        </a>
                    </span>
                    <span id='register'>
                        <a href="#">회원가입</a>
                    </span>
                </div>
            </div>
            <div id='login-info'>
                <div id='login-info-inner'>
                    <h1>혹시 Daum 아이디로 로그인을 찾으시나요?</h1>
                    <span>
                    Daum 아이디 로그인 기능이 2022년 10월 1일 부로 종료되었습니다.<br/>
                    [Daum 아이디 통합하기]를 누르고, Daum 아이디와 카카오계정을 통합하시면 기존 Daum 서비스 그대로 이용하실 수 있어요.
                    <br/> <br/>
                    <a href='#'>공지사항 보러가기</a>
                    </span>
                </div>
            </div>
            
        </div>
    )
}

export default Login;