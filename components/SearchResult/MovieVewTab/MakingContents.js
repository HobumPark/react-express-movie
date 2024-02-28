
import '../../../css/SearchResult/MovieViewTab/MakingContents.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import Crew from './Crew.js';
import queryString from 'query-string';

function MakingContents(){

    const [actor,setActor]=useState([])
    const [director,setDirector]=useState([])
    const [mainActor,setMainActor]=useState([])

    const [maker,setMaker]=useState([])
    const [director2,setDirector2]=useState([])
    const [original,setOriginal]=useState([])
    const [scenario,setScenario]=useState([])
    const [filming,setFilming]=useState([])
    const [music,setMusic]=useState([])
    const [edit,setEdit]=useState([])
    const [art,setArt]=useState([])

    const [distributer,setDistributer]=useState([])
    const [importCompany,setImportCompany]=useState([])
    const [provider,setProvider]=useState([])
    

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
        getMakerInfo(id)
        getMovieCompanyInfo(id)
    },[])

    const getMovieDirectorActorInfo=async(id)=>{
        const result = await axios.get(`/api/v1/movie_director_actor.json?id=${id}`)
        console.log('movie_direct_actor')
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
    }

    const getMakerInfo=async(id)=>{
        console.log('getMakerInfo')
          await axios.get(`/api/v1/maker_info.json?id=${id}`)
          .then(response => {
            console.log(response);
            console.log(response.data.movie_res[0])
            console.log(response.data.movie_res[0].maker_info)
            const temp_maker=JSON.parse(response.data.movie_res[0].maker_info)
            console.log(temp_maker.maker)
            setMaker(temp_maker.maker)
            setDirector2(temp_maker.director)
            setOriginal(temp_maker.original)
            setScenario(temp_maker.scenario)
            setFilming(temp_maker.filming)
            setMusic(temp_maker.music)
            setEdit(temp_maker.edit)
            setArt(temp_maker.art)
          })
          .catch(error => {
            console.error(error);
          })
        
    }

    const getMovieCompanyInfo=async(id)=>{
        console.log('getMovieCompanyInfo')
          await axios.get(`/api/v1/movie_company_info.json?id=${id}`)
          .then(response => {
            console.log(response);
            console.log(response.data.movie_res[0])
            console.log(response.data.movie_res[0].movie_company_info)
            const temp_movie_company=JSON.parse(response.data.movie_res[0].movie_company_info)
            console.log(temp_movie_company.distributer)
            setDistributer(temp_movie_company.distributer)
            setImportCompany(temp_movie_company.import)
            setProvider(temp_movie_company.provider)
          })
          .catch(error => {
            console.error(error);
          })
        
    }

    const directorList = director.map(
        (data)=>(<Crew role={data.role} 
            img_name={data.img_name}
            kor_name={data.kor_name}
            eng_name={data.eng_name}/>)
    )

    const mainActorList = mainActor.map(
        (data)=>(<Crew role={data.role} 
            img_name={data.img_name}
            kor_name={data.kor_name}
            eng_name={data.eng_name}/>)
    )

    const actorList = actor.map(
        (data)=>(<Crew role={data.role} 
            img_name={data.img_name}
            kor_name={data.kor_name}
            eng_name={data.eng_name}/>)
    )

    const makerList = maker.map(
        (data)=>(<div id='maker-element'>
            <span>{data.kor_name}</span>
            <span>{data.eng_name}</span>
        </div>)
    )

    const director2List = director2.map(
        (data)=>(<div id='director-element'>
            <span>{data.kor_name}</span>
            <span>{data.eng_name}</span>
        </div>)
    )

    const originalList = original.map(
        (data)=>(<div id='original-element'>
            <span>{data.kor_name}</span>
            <span>{data.eng_name}</span>
        </div>)
    )

    const scenariolList = scenario.map(
        (data)=>(<div id='scenario-element'>
            <span>{data.kor_name}</span>
            <span>{data.eng_name}</span>
        </div>)
    )

    const filmingList = filming.map(
        (data)=>(<div id='shot-element'>
            <span>{data.kor_name}</span>
            <span>{data.eng_name}</span>
        </div>)
    )

    const musicList = music.map(
        (data)=>(<div id='music-element'>
            <span>{data.kor_name}</span>
            <span>{data.eng_name}</span>
        </div>)
    )

    const editList = edit.map(
        (data)=>(<div id='edit-element'>
            <span>{data.kor_name}</span>
            <span>{data.eng_name}</span>
        </div>)
    )

    const artList = art.map(
        (data)=>(<div id='art-element'>
            <span>{data.kor_name}</span>
            <span>{data.eng_name}</span>
        </div>)
    )

    const distributerList = distributer.map(
        (data)=>(<div id='distributer-element'>
            <span id='distributer-head'>배급</span>
            <span>{data.company}</span>
        </div>)
    )

    const importCompanyList = importCompany.map(
        (data)=>(<div id='import-element'>
            <span id='import-head'>수입</span>
            <span>{data.company}</span>
        </div>)
    )

    const providerList = provider.map(
        (data)=>(<div id='provider-element'>
            <span id='provider-head'>제공</span>
            <span>{data.company}</span>
        </div>)
    )

    return(
        <div id='making-contents'>
            <div id='director'>
                <h1>감독</h1>
                <div id='director-contents'>
                    {directorList}
                </div>
            </div>
            <div id='main-actor'>
                <h1>주연</h1>    
                <div id='main-actor-contents'>
                    {mainActorList}
                </div>
            </div>
            <div id='actor'>
                <h1>출연</h1>
                <div id='actor-contents'>
                    {actorList}
                </div>
            </div>
            <div id='maker'>
                <h1>제작진</h1>
                <div id='maker-contents'>
                    <div id='maker-list'>
                        <span id='maker-head'>제작</span>{makerList}
                    </div>
                    <div id='director-list'>
                        <span id='director-head'>기획</span>{director2List}
                    </div>
                    <div id='original-list'>
                        <span id='original-head'>원작</span>{originalList}
                    </div>
                    <div id='scenario-list'>
                        <span id='scenario-head'>각본</span>{scenariolList}
                    </div>
                    <div id='shoot-list'>
                        <span id='shoot-head'>촬영</span>{filmingList}
                    </div>
                    <div id='music-list'>
                        <span id='msuic-head'>음악</span>{musicList}
                    </div>
                    <div id='edit-list'>
                        <span id='scenario-head'>편집</span>{editList}
                    </div>
                    <div id='art-list'>
                        <span id='art-head'>미술</span>{artList}
                    </div>
                </div>
            </div>
            <div id='movie-company'>
                <h1>영화사</h1>
                <div>
                    <div id='distributer-list'>
                        {distributerList}
                    </div>
                    <div id='import-list'>
                        {importCompanyList}
                    </div>
                    <div id='provider-list'>
                        {providerList}
                    </div>
                </div> 
            </div>
        </div>
    )
}
export default MakingContents;