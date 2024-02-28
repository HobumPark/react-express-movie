
import '../../css/MovieRanking/MovieRanking.css'
import { Routes,Route } from 'react-router-dom';
import MovieDirectory from './MovieDirectory.js';
import Ranking from './Ranking.js';

function MovieRanking(){
    return(
        <div id='movie-ranking'>
            <Routes>
                <Route path='/rank/rmovie.naver' element={<Ranking/>}/>
                <Route path='/browsing/bmovie_nation.naver' element={<MovieDirectory />} />
            </Routes> 
        </div>
    )
}

export default MovieRanking;