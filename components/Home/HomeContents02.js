
import '../../css/Home/HomeContents02.css';
import pre_movie01 from '../../images/home/pre_movie/pre_movie01.jpg'
import pre_movie02 from '../../images/home/pre_movie/pre_movie02.jpg'
import pre_movie03 from '../../images/home/pre_movie/pre_movie03.jpg'
import pre_movie04 from '../../images/home/pre_movie/pre_movie04.jpg'

function HomeContents02(){
    return(
        <div id='home-contents02'>
            <div id='head'>
                <span className='icon pre-movie'></span>
                <a href="#">
                    더보기
                    <span className='right-arrow'></span>
                </a>
            </div>
            <div id='contents'>
                <div>
                    <img src={pre_movie01} alt=""/>
                    <span>천룡팔부:교봉전</span>
                    <span>메인 예고편</span>
                </div>
                <div>
                    <img src={pre_movie02} alt=""/>
                    <span>어메이징 모리스</span>
                    <span>2차 예고편</span>
                </div>
                <div>
                    <img src={pre_movie03} alt=""/>
                    <span>오늘밤, 세계에서 이 사랑이 사라진다 해도</span>
                    <span>뮤직 비디오</span>
                </div>
                <div>
                    <img src={pre_movie04} alt=""/>
                    <span>문맨</span>
                    <span>제작기 영상</span>
                </div>
            </div>
        </div>
    )
}

export default HomeContents02;