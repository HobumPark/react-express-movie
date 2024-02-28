import {useState,useEffect} from 'react';
import '../../css/SearchResult/MovieViewSlide.css'
import queryString from 'query-string';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import $ from 'jquery';

function MovieViewSlide(){
    const [slideState, setSlideState] = useState({
        current: 0,
        next: 0,
    });
    const [movieTitle, setMovieTitle]=useState('')
    const [slideLength,setSlideLength]=useState(0)
    const [movieSlideList,setMovieSlideList]=useState([])
    const [showAll,setShowAll]=useState(false)

    useEffect(()=>{
        getMovieSlideList()
        slideAllHover()
    },[])

    const getMovieSlideList=async()=>{
        console.log("1",window.location)
        console.log("2",window.location.href)
        console.log("3",window.location.search)
        const queryObj=queryString.parse(window.location.search)
        const id=queryObj.id

        const result = await axios.get(`/api/v1/movie_view_slide.json?id=${id}`)
        console.log('result')
        console.log(result)
        console.log('result.data.movie_res[0]')
        console.log(result.data.movie_res[0])
        const slideInfo=result.data.movie_res[0]
        console.log(slideInfo)
        setMovieTitle(slideInfo.movie_title)
        setSlideLength(slideInfo.slide_length)

        var tempList=[];
        for(var i=1; i<=slideInfo.slide_length; i++){
            tempList.push(`/images/movie_view_slide/movie${slideInfo.movie_id}_slide${i}.jpg`)
        }

        setMovieSlideList(tempList)
    }

    const settings1={
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        slideWidth:300,
        beforeChange: (current, next) => setSlideState({ current: next })
    }

    const settings2={
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        slideWidth:200,
        rows: 4,
        slidesPerRow:4,
        beforeChange: (current, next) => setSlideState({ current: next })
    }

    const closeSlide=()=>{
        alert('슬라이드 닫기!')
        console.log("1",window.location)
        console.log("2",window.location.href)
        console.log("3",window.location.search)
        const queryObj=queryString.parse(window.location.search)
        const id=queryObj.id
        window.location.href=`/movie/view/main?id=${id}&menu=1`
    }

    const showAllSlide=()=>{
        alert('showAllSlide!')
        setShowAll(false)
    }
    const closeAllSlide=()=>{
        alert('closeAllSlide!')
        setShowAll(true)
    }

    const slideAllHover=()=>{
        $("#movie-slide-all").on({
            'mouseover':function(){ 
                console.log('mouseover!')
                $(this).children('span').show()
            },
            'mouseout':function(){

            }
        })
    }

    const result1 = movieSlideList.map(
        (data,index)=>(<div id='movie-slide' key={index}>
                    <img src={data} alt={data}/>
        </div>)
    )

    const result2 = movieSlideList.map(
        (data,index)=>(<div id='movie-slide-all' key={index}>
                    <img src={data} alt={data}/>
                    <span></span>
        </div>)
    )
    return(
        <div id='movie-view-slide-wrap'>
             <div id='movie-view-slide'>
                <div id='movie-view-slide-header'>
                    <h1>{movieTitle}</h1>
                    <h2><span>{slideState.current+1}/{slideLength}</span></h2>
                    {
                    showAll===true?
                    <span className='show-all-open' onClick={showAllSlide}></span>:
                    <span className='show-all-close' onClick={closeAllSlide}></span>
                    }
                    
                    <span className='close-slide' onClick={closeSlide}></span>
                </div>
                <div id='movie-view-slide-contents'>
                    {
                        showAll===true?
                        <div id='multiple-slide'>
                            <Slider {...settings2}>
                                {result2}
                            </Slider>
                        </div>
                        :
                        <div id='one-slide'>
                            <Slider {...settings1}>
                                {result1}
                            </Slider>
                        </div>
                    }
                </div>
             </div>
        </div>
    )
}

export default MovieViewSlide;