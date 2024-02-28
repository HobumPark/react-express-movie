
import '../../css/Home/Notice.css';

function Notice(){
    return(
        <div id='notice'>
            <div id='head'>
                <div>
                    <span className='notice'></span>
                    <span>
                        <b>[공지]</b>
                        <h6>상영 영화 예매순위 정보 제공 종료 안내드립니다.</h6>
                    </span>
                </div>
            </div>
            <div id='contents'>
                <div>
                    <span className="info"></span>
                    <span>본 페이지는 나눔글꼴에 최적화 되어있습니다.</span>
                    <span>나눔글꼴설치</span>
                </div>
            </div>
        </div>
    )
}

export default Notice;