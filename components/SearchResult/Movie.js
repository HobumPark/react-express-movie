

import { useEffect } from 'react'
import '../../css/SearchResult/Movie.css'
import moment from 'moment';
function Movie(props) {

    useEffect(() => {
        const selector1=('.movie'+props.movie_code)+" .user_rating"
        console.log(selector1)
        var rating = document.querySelector(selector1).innerText
        rating = parseFloat(rating)
        console.log(rating)    

        const selector2 = ('.movie' + props.movie_code) + " .rank_red"
        var rank_width = 73 * (rating/10)
        document.querySelector(selector2).style.width = rank_width+"px"
    },[])
    
    const moment_date = moment(props.opening_date).format('YYYY-MM-DD')
    console.log('moment')
    console.log(moment_date)

    const actorArr = props.main_actor.split("|")
    console.log('actorArr')
    console.log(actorArr)
    const actorList = actorArr.map(
        (actor)=>(<span id='actor'>{actor}</span>)
    )    
    console.log('actorList')
    console.log(actorList)

    return (
        <div id='movie' className={'movie'+props.movie_code}>
            <div id='movie-left'>
                <a href={`/movie/view/main?id=${props.movie_code}&menu=1`}>
                    <img src={`/images/cover/movie${props.movie_code}.jpg`} alt='커버이미지'/>
                </a>
            </div>
            <div id='movie-right'>
                <div id='movie-title'>
                    <a href={props.link}>
                        <span>
                            <a href={`/movie/view/main?id=${props.movie_code}&menu=1`}>
                                {props.title}
                            </a>
                        </span>
                    </a>
                </div>
                <div id='movie-rating'>
                    <span className="rank_grey"></span>
                    <span className="rank_red"></span>
                    <span className="user_rating">{props.audience_rating}</span>
                </div>
                <div id='movie-genre'>
                    {moment_date} 개봉
                </div>
                <div id='movie-director-actor'>
                    <span id='movie-director'>
                        감독:{props.director}
                    </span>
                    <span id='movie-actor'>
                        출연:{actorList}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Movie;