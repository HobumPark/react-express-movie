
import '../../css/MoviePointReview/MoviePointReview.css'
import { Routes,Route } from 'react-router-dom';
import MoviePoint from './MoviePoint.js';
import MovieReview from './MovieReview.js';

function MoviePointReview(){
    return(
        <div id='movie-point-review'>
            <Routes>
                <Route path='/point/af' element={<MoviePoint/>}/>
                <Route path='/board/review' element={<MovieReview />} />
            </Routes> 
        </div>
    )
}

export default MoviePointReview;