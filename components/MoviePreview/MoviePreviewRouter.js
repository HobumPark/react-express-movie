
import '../../css/MoviePreview/MoviePreviewRouter.css'
import MoviePreviewMain from './MoviePreviewMain.js';
import MoviePreviewView from './MoviePreviewView.js';
import MoviePreviewWrite from './MoviePreviewWrite.js';

import {Routes, Route} from 'react-router-dom';

function MoviePreviewRouter(){
    return(
        <div id='movie-preview-router'>
           <Routes>
                <Route path='/list' element={<MoviePreviewMain/>}/>
                <Route path='/view' element={<MoviePreviewView/>}/>
                <Route path='/write' element={<MoviePreviewWrite/>}/>
           </Routes> 
        </div>
    )
}

export default MoviePreviewRouter;