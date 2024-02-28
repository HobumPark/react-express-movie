
import '../../css/SearchResult/MovieViewRouter.css'
import {useEffect,useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import moment from 'moment';
import MainContents from './MovieVewTab/MainContents';
import MakingContents from './MovieVewTab/MakingContents';
import MoviePhotoContents from './MovieVewTab/MoviePhotoContents';
import RatingContents from './MovieVewTab/RatingContents';

const menuList={
    0:<MainContents/>,
    1:<MakingContents/>,
    2:<MoviePhotoContents/>,
    3:<RatingContents/>
}

function MovieViewRouter(){
    const [menu,setMenu]=useState(1)
    const [movieDetail,setMovieDetail]=useState('')
    const [movieId,setMovieId]=useState(0)
    useEffect(() => {
        console.log("1",window.location)
        console.log("2",window.location.href)
        console.log("3",window.location.search)
        const queryObj=queryString.parse(window.location.search)
          //queryString이 파라미터와 값 구문분석해줌...
          //window.location.search구문분석
          console.log("4", queryObj)
          const id = parseInt(queryObj.id)
          const menu = parseInt(queryObj.menu)
          console.log('id',id)
          console.log('menu',menu)
          setMenu(menu)
          getMovieDetails(id)
          setMovieId(id)
      }, [])

      const selectMainContents=async()=>{
        setMenu(0)

      }
      const selectMakingContents=async()=>{
        window.location.href='movie/view/'
      }
      const selectMoviePhotoContents=async()=>{
        window.location.href='movie/view/crew'
      }
      const selectRatingContents=async()=>{
        window.location.href='movie/view/crew'
      }

      const getMovieDetails=async(id)=>{
        console.log('getMoviesDetail')
        console.log(id)
        const result = await axios({
            method: 'get',
            url: `/api/v1/movie_details.json?id=${id}`,
            dataType: 'json',
        })
        console.log(result)
        console.log(result.data.movie_res[0])
        let temp_date = result.data.movie_res[0].opening_date
        temp_date=moment(temp_date).format('YYYY.MM.DD');
        console.log(temp_date)  
        result.data.movie_res[0].opening_date=temp_date
        
        var tempAttendacne= result.data.movie_res[0].attendance
        tempAttendacne = tempAttendacne.toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        result.data.movie_res[0].attendance=tempAttendacne
        //숫자 사이 콤마찍기
        setMovieDetail(result.data.movie_res[0])
      }

      const goWatcha=()=>{
        alert('왓챠 이동')
      }

      const goWave=()=>{
        alert('웨이브 이동')
      }

    return(
        <div id='movie-view'>
            <div id='movie-info'>
                <div id='movie-cover'>
                    <a href={`/movie/slide?id=${movieDetail.movie_code}`}>
                        <img src={`/images/cover/movie${movieDetail.movie_code}.jpg`}/>
                        <span className='zoom'></span>
                    </a>
                </div>
                <div id='movie-desc'>
                    <div id='movie-desc-head'>
                        <h1>{movieDetail.title}</h1>
                        <h2>{movieDetail.eng_title}, <span>{movieDetail.make_year}</span></h2>
                    </div>
                    <div id='movie-desc-info'>
                        <ul id='movie-desc-left'>
                            <li>
                                <span>개봉</span>
                                <span>
                                    {movieDetail.opening_date}
                                </span>
                            </li>
                            <li>
                                <span>장르</span>
                                <span>
                                    <span id='genre-list'>{movieDetail.genre}</span>
                                </span>
                            </li>
                            <li>
                                <span>국가</span>
                                <span>
                                    <span id='country-list'>{movieDetail.country}</span>
                                </span>
                            </li>
                            <li>
                                <span>등급</span>
                                <span>{movieDetail.film_rating}</span>
                            </li>
                            <li>
                                <span>러닝타임</span>
                                <span>{movieDetail.running_time}분</span>
                            </li>
                        </ul>
                        <ul id='movie-desc-right'>
                            <li><span>평점</span><span><span className='one-red-star'></span>{movieDetail.audience_rating}</span></li>
                            <li><span>누적관객</span><span>{movieDetail.attendance}명</span></li>
                            <li><span>박스오피스</span><span>{movieDetail.box_office}위</span></li>
                            <li><span>쿠키영상</span><span></span></li>
                            <li><span>영화정보<span className='info'></span></span></li>
                        </ul>
                    </div>
                    <div id='see-movie'>
                        <button onClick={goWatcha}>
                            <span className='watcha'></span>왓챠
                        </button>
                        <button onClick={goWave}>
                            <span className='wave'></span>웨이브
                        </button>
                    </div>
                </div>
            </div>
            <div id='movie-tab'>
                <div id='movie-tab-btn'>
                    <a href={`/movie/view/main?id=${movieDetail.movie_code}&menu=1`}
                    className={menu===1? 'tab_active':''}>주요정보</a>
                    <a href={`/movie/view/crew?id=${movieDetail.movie_code}&menu=2`}
                    className={menu===2? 'tab_active':''}>출연/제작</a>
                    <a href={`/movie/view/contents?id=${movieDetail.movie_code}&menu=3`}
                    className={menu===3? 'tab_active':''}>영상/포토</a>
                    <a href={`/movie/view/grade?id=${movieDetail.movie_code}&menu=4`}
                    className={menu===4? 'tab_active':''}>평점</a>
                </div>
                <div id='movie-tab-contents'>
                <Routes>
                    <Route path='/main' element={<MainContents movieId={movieId}/>}/>
                    <Route path='/crew' element={<MakingContents/>}/>
                    <Route path='/contents' element={<MoviePhotoContents/>}/>
                    <Route path='/grade' element={<RatingContents/>}/>
                </Routes>
                </div>
            </div>
        </div>
    )
}

export default MovieViewRouter;