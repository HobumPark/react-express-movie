
import '../../css/MovieRunning/MovieRunning.css'
import { Routes,Route } from 'react-router-dom';
import Current from './Current.js';
import PreMovie from './PreMovie.js';
import MovieClip from './MovieClip.js';

function MovieRunning(){
    return(
        <div id='movie-running'>
            <Routes>
                <Route path='/current.naver' element={<Current/>}/>
                <Route path='/premovie.naver' element={<PreMovie />} />
                <Route path='/movieclip.naver' element={<MovieClip/>}/>
            </Routes> 
        </div>
    )
}

export default MovieRunning;