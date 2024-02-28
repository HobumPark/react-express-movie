
import '../../css/common/Footer.css'
import logo_naver from '../../images/common/footer/logo_naver.png'

function Footer(){
    return(
        <div id='footer'>
            <div id='bottom-menu'>
                <div id='bottom-menu-inner'>
                    <ul>
                        <li>
                            <a href="#">이용약관</a>
                        </li>
                        <li>
                            <a href="#">개인정보처리방침</a>
                        </li>
                        <li>
                            <a href="#">책임의한계와 법적고지</a>
                        </li>
                        <li>
                            <a href="#">영화 고객센터</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id='copyright'>
                <div id='copyright-01'>
                    본 콘텐츠의 저작권은 저작권자 또는 제공처에 있으며, 이를 무단 이용하는 경우 저작권법 등에 따라 법적 책임을 질 수 있습니다.
                </div>
                <div id='copyright-02'>
                    <div id='copyright-02-inner'>
                        <ul>
                            <li>
                                <a href="#">사업자등록번호 : 220-81-62517</a>
                            </li>
                            <li>
                                <a href="#">통신판매업 신고번호 : 경기성남 제 2006 - 692호</a>
                            </li>
                            <li>
                                <a href="#">대표이사 : 최수연</a>
                            </li>
                            <li>
                                <a href="#">사업자등록정보 확인</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id='copyright-03'>
                    <div id='copyright-03-inner'>
                        <ul>
                            <li>
                                <a href="#">주소 : 경기도 성남시 분당구 정자일로 95, NAVER 1784, 13561</a>
                            </li>
                            <li>
                                <a href="#">대표전화 : 1588-3820</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id='copyright-04'>
                    <div id='copyright-04-inner'>
                        <ul>
                            <li>
                                <a href="#">
                                    <img src={logo_naver} alt='로고'/>
                                </a>
                            </li>
                            <li>
                                <a href="#">Copyright ©</a>
                            </li>
                            <li>
                                <a href="#">NAVER Corp. </a>
                            </li>
                            <li>
                                <a href="#">All Rights Reserved.</a>
                            </li>
                        </ul>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

export default Footer;