
import '../../../css/SearchResult/MovieViewTab/MoviePhotoContents.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import $ from 'jquery';

function MoviePhotoContents(){
    const [movieClip,setMovieClip]=useState([])
    const [moviePhoto,setMoviePhoto]=useState([])
    const [isHovering, setIsHovering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [movieId,setMovieId]=useState('');

    useEffect(()=>{

        console.log("1",window.location)
        console.log("2",window.location.href)
        console.log("3",window.location.search)
        const queryObj=queryString.parse(window.location.search)
        //queryString이 파라미터와 값 구문분석해줌...
        //window.location.search구문분석
        console.log("4", queryObj)
        const id = parseInt(queryObj.id)

        getMovieSlideList(id)
        getMoviePhotoList(id)
    },[])

    const getMovieSlideList=async(id)=>{
        await axios.get(`/api/v1/movie_clip_slide.json?id=${id}`)
        .then(response=>{
                console.log(response)
                console.log(response.data)
                console.log(response.data.movie_res[0])
                console.log(response.data.movie_res[0].movie_clip_list)
                const temp_movie_clip=JSON.parse(response.data.movie_res[0].movie_clip_list)
                setMovieClip(temp_movie_clip.movie_clip_list)
        })
    }

    const getMoviePhotoList=async(id)=>{
        console.log('getMoviePhotoList')
        await axios.get(`/api/v1/movie_photo.json?id=${id}`)
        .then(response=>{
                console.log(response)
                console.log(response.data)
                console.log(response.data.movie_res[0])
                console.log(response.data.movie_res[0].photo_length)
                const length=response.data.movie_res[0].photo_length
                let photoList = []
                for(var i=1; i<=length; i++){
                    photoList.push(`/images/movie_photo/movie${id}_inner${i}.jpg`)
                }
                setMoviePhoto(photoList)
        })  
    }

    const handleMouseOver = () => {
        console.log('mouseover')
        setIsHovering(true);
    };
    
    const handleMouseOut = () => {
        console.log('mouseout')
        setIsHovering(false);
    };

    const moviePlay=()=>{
        alert('재생!')
        
        setIsPlaying(true)
        setTimeout(()=>{
            var mainMovie=document.getElementById('iframe-movie')
            //var mainMovie=$('iframe-movie')
            console.log(mainMovie);
            var link=`https://play-tv.kakao.com/embed/player/cliplink/${movieId}?service=player_share&autoplay=1`
            //mainMovie.attr('src',link)
            mainMovie.src=link
        },200)
    }
    
    const movieSlideClick=(event)=>{
        alert('무비 클립 클릭!')
        $("#movie-clip-main-thumb>.movie-play-active-line").hide()
        $(`.${event.target.className}`).next().next().show()

        if(isPlaying===true){
            setIsPlaying(false)
            setTimeout(()=>{
                //var mainImg=$("#main-movie-thumb-img-element")
                //mainImg.attr('src',`/images/thumb/${event.target.id}.jpg`)
                var mainImg=document.getElementById('main-movie-thumb-img-element')
                mainImg.setAttribute('src',`/images/thumb/${event.target.id}.jpg`)
                setMovieId(event.target.className)
            },200)
            
            return
        }
        console.log(event)
        console.log(event.target)
        console.log(event.target.id)
        console.log(event.target.className)
        var mainImg=$("#main-movie-thumb-img-element")
        mainImg.attr('src',`/images/thumb/${event.target.id}.jpg`)
        //var mainImg=document.getElementById('main-movie-thumb-img-element')
        //mainImg.setAttribute('src',`/images/thumb/${event.target.id}.jpg`)
        setMovieId(event.target.className)
        alert(event.target.className)
    }

    const movieClipList=movieClip.map(
        (data,index)=><div key={index+1} id='movie-clip' onClick={movieSlideClick}>
            <div id='movie-clip-main'>
                <div id='movie-clip-main-thumb'>
                    <img src={`/images/thumb/${data.img}.jpg`} id={data.img} className={data.link}/>
                    <span className='movie-play'></span>
                    <span className='movie-play-active-line'></span>
                </div>
            </div>
            <div id='movie-clip-desc'>
                <div id='movie-clip-desc-title'>
                    {data.title}
                </div>
                <div id='movie-clip-desc-info'>
                    <span>{data.date}</span>
                    <span>재생{data.hits}</span>
                </div>
            </div>
        </div>
    )

    const moviePhotoList=moviePhoto.map(
        (data)=>(<div id='movie-photo'>
                    <img src={data}/>
                </div>)
    )

    const settings={
        speed:500,
        slidesToShow:3,
        slidesToScroll:3,
        slideWidth:300,
    }

        return(
            <div id='movie-photo-contents'>
                <div id='movie-photo-contents-movie'>
                    <h1>영상</h1>
                    {
                        movieClip.length !== 0? 
                        <div id='main-movie'>
                        <div id='main-movie-thumb'>
                            {
                            isPlaying===false? 
                            <div id='main-movie-thumb-img'>
                                <img src='/images/thumb/movie1_thumb1.jpg' id='main-movie-thumb-img-element'/>
                                <span className={isHovering ? "movie-play-big-active" : "movie-play-big"} 
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                onClick={moviePlay}></span>
                            </div>
                            :
                            <iframe title={`${movieClip[0].title}`}
                            id='iframe-movie'
                            width="95%" height="95%" 
                            src={`https://play-tv.kakao.com/embed/player/cliplink/${movieClip[0].link}?service=player_share&autoplay=1`}
                            allowfullscreen frameborder="0" 
                            scrolling="no"
                            allow="autoplay; fullscreen; encrypted-media">
                            </iframe>
                            }
                        </div>
                        <div id='main-movie-title'>
                            <h1>{ movieClip[0].title }</h1>
                        </div>
                        <div id='main-movie-info'>
                            <span>{ movieClip[0].date }</span>
                            <span>재생 { movieClip[0].hits }</span>
                        </div>
                    </div>:<div id='main-movie'></div>
                    }
 
                    <div id='slide-movie'>
                        <Slider {...settings}>
                            {movieClipList}
                        </Slider>
                    </div>
                </div>
                <div id='movie-photo-contents-photo'>
                    <h1>포토</h1>
                    {moviePhotoList}
                </div>
            </div>
        )
}
export default MoviePhotoContents;