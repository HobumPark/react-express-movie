
import '../../css/SearchResult/SearchResult.css'
import { useEffect,useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import MovieList from './MovieList';
import Pagination from './Pagination';
import best_movie from '../../images/search_result/tlt_r_best_movie.gif'
import best_star from '../../images/search_result/tlt_r_best_star.gif'
import box_office from '../../images/search_result/tlt_r_boxoffice.gif'
import bullet_arrow from '../../images/search_result/bullet_arrow.gif'
import img_noresult from '../../images/search_result/img_noresult.png'
import moment from 'moment';

function SearchResult(){
    const [empty, setEmpty] = useState(false)
    const [movieList, setMovieList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [movieCountPerPage,setMovieCountPerPage ] = useState(10)
    const [query,setQuery]=useState('')

    const [moviePopular,setMoviePopular]=useState([])
    const [actorPopular,setActorPopular]=useState([])
    const [boxOffice,setBoxOffice]=useState([])
    

    useEffect(() => {
      console.log("1",window.location)
      console.log("2",window.location.href)
      console.log("3",window.location.search)
      const queryObj=queryString.parse(window.location.search)
        //queryString이 파라미터와 값 구문분석해줌...
        //window.location.search구문분석
        console.log("4", queryObj)
        const query = queryObj.query
        setQuery(query)
        getMovies(query)
        getSearchBoxOfficeData()
    }, [])
    
    const getMovies = async(query) => {
        console.log(query)
        const result = await axios({
            method: 'get',
            url: `/api/v1/list_movies.json?query_term=${query}`,
            dataType: 'json',
        })
        console.log(result)
        console.log(result.data.movie_res)
        
        const movieList = result.data.movie_res
        console.log('movieList')
        console.log(movieList)
        if(movieList.length === 0){
            console.log('검색결과 존재하지 않음')
            setEmpty(true)
            return
        }

        console.log('editMovieList')
        console.log(movieList)
        setMovieList(movieList)
    }

    const currentMovieList = (movieList) => {
        const startIndex = (currentPage-1)*movieCountPerPage;
        const endIndex = startIndex+movieCountPerPage;
        const slicedList = movieList.slice(startIndex, endIndex)
        return slicedList
    }

    const getSearchBoxOfficeData=async()=>{
        console.log('getSearchBoxOfficeData')
        const result1 = await axios.get('/api/v1/get/movie_popular_search')
        const result2 = await axios.get('/api/v1/get/actor_popular_search')
        const result3 = await axios.get('/api/v1/get/box_office')
        console.log(result1)
        console.log(result2)
        console.log(result3)

        const editResult1=(result1.data.res).map(
            (data)=>({...data,refresh_time:moment(data.refresh_time).format('YYYY-MM-DD')})
        )
        const editResult2=(result2.data.res).map(
            (data)=>({...data,refresh_time:moment(data.refresh_time).format('YYYY-MM-DD')})
        )
        const editResult3=(result3.data.res).map(
            (data)=>({...data,refresh_time:moment(data.refresh_time).format('YYYY-MM-DD')})
        )

        setMoviePopular(editResult1)
        setActorPopular(editResult2)
        setBoxOffice(editResult3)

    }

    const result1=moviePopular.map(
        (data)=>(<div id='popular-row' key={data.rank_no}>
                    <span>{data.rank_no}</span>
                    <span>{data.movie_title}</span>
                    <span>{data.refresh_time}</span>
                </div>)
    )

    const result2=actorPopular.map(
        (data)=>(<div id='popular-row' key={data.rank_no}>
                    <span>{data.rank_no}</span>
                    <span>{data.movie_actor}</span>
                    <span>{data.refresh_time}</span>
                </div>)
    )

    const result3=boxOffice.map(
        (data)=>(<div id='popular-row' key={data.rank_no}>
                    <span>{data.rank_no}</span>
                    <span>{data.movie_title}</span>
                    <span>{data.refresh_time}</span>
                </div>)
    )

    return(
        <div id='search-result'>
            <div id='search-result-inner'>
                <div id='result-head'>
                    <div id='result-head-top'>
                    '<span>{query}</span>'에 대한 통합검색 결과입니다.
                    </div>
                    <div id='result-head-bottom'>
                        <input type='radio' name='radio-group1'/>
                        <label>전체</label>
                        <input type='radio' name='radio-group1'/>
                        <label>영화</label>
                        <input type='radio' name='radio-group1'/>
                        <label>영화인</label>
                        <input type='radio' name='radio-group1'/>
                        <label>영화제</label>
                        <input type='radio' name='radio-group1'/>
                        <label>영화사</label>
                        <input type='radio' name='radio-group1'/>
                        <label>극장</label>
                        <input type='radio' name='radio-group1'/>
                        <label>이미지</label>
                        <input type='radio' name='radio-group1'/>
                        <label>동영상</label>
                        <input type='radio' name='radio-group1'/>
                        <label>배역</label>
                    </div>
                </div>
                <div id='result-data' className='clearfix'>
                    {
                        empty===true? 
                        (
                        <div id='movie-data-list'>
                            <div id='empty'>
                                <img src={img_noresult} alt='no-result'/>
                                <span>검색결과가 존재하지 않습니다.</span>
                            </div>
                        </div>
                        ):
                        (
                            <div id='movie-data-list'>
                                <MovieList movieList={currentMovieList(movieList)} />
                                <Pagination
                                total={movieList.length}
                                movieCountPerPage={movieCountPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage} />
                            </div>
                        )
                    }
                            <div id='side-popuplar-rank'>
                                <div id='popular-movie-list'>
                                    <div id="head">
                                        <span>
                                            <img src={best_movie}  alt=""/>
                                        </span>
                                        <span id="see-more">
                                            <img src={bullet_arrow}/>
                                            <a href="#">더보기</a>
                                        </span>
                                    </div>
                                    <div id="contents">
                                        {result1}
                                    </div>
                                </div>
                                <div id='popular-movie-person'>
                                    <div id="head">
                                        <span>
                                            <img src={best_star}  alt=""/>
                                        </span>
                                        <span id="see-more">
                                            <img src={bullet_arrow}/>
                                            <a href="#">더보기</a>
                                        </span>
                                    </div>
                                    <div id="contents">
                                        {result2}
                                    </div> 
                                </div>
                                <div id='popular-box-office'>
                                    <div id="head">
                                        <span>
                                            <img src={box_office}  alt=""/>
                                        </span>
                                        <span id="see-more">
                                            <img src={bullet_arrow}/>
                                            <a href="#">더보기</a>
                                        </span>
                                    </div>
                                    <div id="contents">
                                        {result3}
                                    </div>  
                                </div>
                            </div>
                </div>
            </div>
            
        </div>
    )
}

export default SearchResult;