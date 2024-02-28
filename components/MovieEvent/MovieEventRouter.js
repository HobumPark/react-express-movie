
import '../../css/MovieEvent/MovieEventRouter.css'
import MovieEventList from './MovieEventList.js';
import {Routes, Route} from 'react-router-dom';
function MovieEventRouter(){
    return(
        <div id='movie-event-router'>
           <Routes>
                <Route path='/list' element={<MovieEventList/>}/>
           </Routes> 
        </div>
    )
}

export default MovieEventRouter;