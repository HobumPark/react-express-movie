
import '../../css/Home/HomeContents03.css';
import photo_movie01 from '../../images/home/photo_movie/photo01.jpg'
import photo_movie02 from '../../images/home/photo_movie/photo02.jpg'
import photo_movie03 from '../../images/home/photo_movie/photo03.jpg'
import photo_movie04 from '../../images/home/photo_movie/photo04.jpg'
import photo_movie05 from '../../images/home/photo_movie/photo05.jpg'
import photo_movie06 from '../../images/home/photo_movie/photo06.gif'

function HomeContents03(){
    return(
        <div id='home-contents03'>
            <div id='head'>
                <span className='photo'></span>
            </div>
            <div id='contents'>
                <div>
                    <img src={photo_movie01} alt=""/>
                    <span>강남좀비</span>
                    <span>처절한 사투</span>
                </div>
                <div>
                    <img src={photo_movie02} alt=""/>
                    <span>처음 꽃향기를 만난순간</span>
                    <span>감성 로맨스</span>
                </div>
                <div>
                    <img src={photo_movie03} alt=""/>
                    <span>눈의여왕:5스노우 프린세스와 미러랜드의 비밀</span>
                    <span>얼어붙은 세상</span>
                </div>
                <div>
                    <img src={photo_movie04} alt=""/>
                    <span>교섭</span>
                    <span>인질을 살려라</span>
                </div>
                <div>
                    <img src={photo_movie05} alt=""/>
                    <span>돌핀보이</span>
                    <span>오션어드벤처</span>
                </div>
                <div>
                    <img src={photo_movie06} alt=""/>
                    <span>메간</span>
                    <span>영원한 친구</span>
                </div>
            </div>
        </div>
    )
}

export default HomeContents03;