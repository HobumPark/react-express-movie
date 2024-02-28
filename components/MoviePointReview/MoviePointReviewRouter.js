
import '../../css/MoviePointReview/MoviePointReviewRouter.css'
import { Routes,Route } from 'react-router-dom';
import MoviePoint from './MoviePoint.js';
import MovieReview from './MovieReview.js';

function MoviePointReviewRouter(){
    return(
        <div id='movie-point-review'>
            <Routes>
                <Route path='/point/af' element={<MoviePoint/>}/>
                <Route path='/board/review' element={<MovieReview />} />
            </Routes> 
        </div>
    )
}

export default MoviePointReviewRouter;