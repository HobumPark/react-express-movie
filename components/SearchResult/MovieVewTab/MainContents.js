
import '../../../css/SearchResult/MovieViewTab/MainContents.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';

function MainContents(props){
    const [movieSummary,setMovieSummary]=useState('')
    const [actorDirector,setActorDirector]=useState([])
    const [actor,setActor]=useState([])
    const [director,setDirector]=useState([])
    const [mainActor,setMainActor]=useState([])
    const [crewList,setCrewList]=useState([])

    useEffect(()=>{

        console.log("1",window.location)
        console.log("2",window.location.href)
        console.log("3",window.location.search)
        const queryObj=queryString.parse(window.location.search)
          //queryString이 파라미터와 값 구문분석해줌...
          //window.location.search구문분석
          console.log("4", queryObj)
          const id = parseInt(queryObj.id)

        getMovieDirectorActorInfo(id)
        getMovieSummaryInfo(id)
    },[])

    const getMovieDirectorActorInfo=async(id)=>{
        console.log('movie_direct_actor')
        console.log(id)

        const result = await axios.get(`/api/v1/movie_director_actor.json?id=${id}`)
        
        console.log(result)
        console.log(result.data.movie_res[0])
        const temp_data=result.data.movie_res[0]
        console.log('temp_data1')
        console.log(temp_data)

        temp_data.actor_info = JSON.parse(temp_data.actor_info)
        temp_data.director_info = JSON.parse(temp_data.director_info)
        temp_data.main_actor_info = JSON.parse(temp_data.main_actor_info)
        console.log('temp_data2')
        console.log(temp_data)

        const driector=temp_data.director_info.director;
        const mainActor=temp_data.main_actor_info.main_actor;
        const actor=temp_data.actor_info.actor;

        setDirector(driector)
        setMainActor(mainActor)
        setActor(actor)
        
        makeCrewList(driector,mainActor,actor)
    }

    const getMovieSummaryInfo=async(id)=>{
        
        console.log('getMovieSummaryInfo')
        console.log(id)

        const result = await axios.get(`/api/v1/movie_summary.json?id=${id}`)
        console.log(result)
        console.log(result.data.movie_res)
        const tempMovieSummary=result.data.movie_res[0].summary
        setMovieSummary(tempMovieSummary)
        document.getElementById("main-contents-summary-text").innerHTML=tempMovieSummary
    }

    const makeCrewList=(driector,mainActor,actor)=>{
        var total=7
        var tempList = []
        for(var i=0; i<driector.length; i++){
            if(total==0){
                break;
            }
            tempList.push(driector[i])
            total--
        }
        for(var i=0; i<mainActor.length; i++){
            if(total==0){
                break;
            }
            tempList.push(mainActor[i])
            total--
        }
        for(var i=0; i<actor.length; i++){
            if(total==0){
                break;
            }
            tempList.push(actor[i])
            total--
        }
        console.log('crewList')
        console.log(tempList)
        setCrewList(tempList)
    }

    const seeMoreSummary=()=>{
        //alert("seeMoreSummary!")
        //document.getElementById("main-contents-summary-text").style.height="290px";
        document.getElementById("main-contents-summary").style.height="auto";
        document.getElementById("main-contents-summary-text").style.height="auto";
        //document.getElementById("main-contents-summary").style.height="320px";
        document.getElementById("see-more-btn").style.display="none";
    }

    const result = crewList.map(
            (data,index)=>(<div id='main-crew' key={index}>
                    <a href="#">
                        {
                            data.role==='감독'?
                            <img src={`/images/crew/director/${data.img_name}.jpg`}/>:
                            <img src={`/images/crew/actor/${data.img_name}.jpg`}/>
                        }  
                    </a>
                    <span>{data.kor_name}</span>
                    <span>{data.role}</span>
                 </div>)); 

   
    return(
        <div id='main-contents'>
            <div id='main-contents-summary'>
               <div id='main-contents-summary-text'>

               </div>
               <div id='see-more-btn' onClick={seeMoreSummary}>
                더보기<span className="arrow-down"></span>
               </div>
            </div>
            <div id='main-contents-crew'>
                <h1>
                    출연진 <a> 더보기<span className='more-right-arrow'></span> </a>
                </h1>
                <div id='main-contents-crew-contents'>
                    {result}
                </div>
            </div>
            <div id='main-contents-movie-photo'>
                <h1>영상/포토 <a>더보기<span className='more-right-arrow'></span></a></h1>
                <div id='main-contents-movie-photo-contents'>
                    <div id='movie-photo-row-01'>
                        <div>
                            <img src={`/images/movie_photo/movie${props.movieId}_detail1.jpg`}/>
                        </div>
                        <div>
                            <img src={`/images/movie_photo/movie${props.movieId}_detail2.jpg`}/>
                        </div>
                    </div>  
                    <div id='movie-photo-row-02'>
                        <div>
                            <img src={`/images/movie_photo/movie${props.movieId}_detail3.jpg`}/>
                        </div>
                        <div>
                            <img src={`/images/movie_photo/movie${props.movieId}_detail4.jpg`}/>
                        </div>
                        <div>
                            <img src={`/images/movie_photo/movie${props.movieId}_detail5.jpg`}/>
                        </div>
                        <div>
                            <img src={`/images/movie_photo/movie${props.movieId}_detail6.jpg`}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainContents;