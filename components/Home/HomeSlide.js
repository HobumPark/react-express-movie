
import '../../css/Home/HomeSlide.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useEffect,useState} from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';

function HomeSlide(){
    const [movieRankList,setMovieRankList]=useState([])

    useEffect(()=>{
        
        getSlideRankData()

        setTimeout(()=>{
            slideHover()
        },2000)
  
    },[])

    const moveMovieView=(movieCode)=>{
        alert('상세보기 이동!:'+movieCode)
        window.location.href=`movie/view/main?id=${movieCode}&menu=1`
    }

    const settings={
        speed:500,
        slidesToShow:5,
        slidesToScroll:5,
        slideWidth:300,
    }
    const result = movieRankList.map(
        (data)=>(<div className='my-slide-element' key={data.movie_code} onClick={()=>moveMovieView(data.movie_code)}>
                    <div className='main-area'>
                        <span>{data.rank_no}</span>
                            <img src={`/images/cover/movie${data.movie_code}.jpg`} alt='슬라이드'/>
                        <h1>{data.title}</h1>
                    </div>
                    <div className='hidden-area'>
                        <div><h4>개봉</h4><span>{data.opening_date}</span></div>
                        <div><h4>장르</h4><span>{data.genre}</span></div>
                        <div><h4>등급</h4><span>{data.film_rating}</span></div>
                        <div><h4>감독</h4><span>{data.director}</span></div>
                        <div><h4>주연</h4><span>{data.main_actor}</span></div>
                        <div className='view-detail'>상세보기</div>
                    </div>
                </div>)
    )


    const slideHover=()=>{
        var slide=$(".my-slide-element")
        for(var i=0; i<slide.length; i++){

            slide.eq(i).on({
                'mouseover':function(e){
                    var hiddenArea=$(this).find('.hidden-area')
                    console.log(hiddenArea)
                    hiddenArea[0].style.display="block"
                },
                'mouseout':function(){
                    $(".hidden-area").hide()
                    console.log('out!')
                }
            })
        }
    }

    const getSlideRankData=async()=>{
        console.log('getSlideRankData')
        const result = await axios.get('/api/v1/home_slide.json')
        console.log(result)
        const tempList = result.data.movie_res
        const editResult = tempList.map(
            (data)=>({...data,opening_date:moment(data.opening_date).format('YYYY.MM.DD')})
        )

        setMovieRankList(editResult)

    }

    return(
        <div id='home-slide'>
            <iframe src={"https://kakaotv.daum.net/embed/player/cliplink/437215343?service=daum_movie&autoplay=1&mute=1&profile=HIGH&start=5&width=1354&height=730&serviceReferrer=https%3A%2F%2Fwww.google.co.kr%2F"}
            allow="autoplay; fullscreen; encrypted-media"
            />
            <Slider {...settings}>
                {result}
            </Slider>
        </div>
    )
}

export default HomeSlide;