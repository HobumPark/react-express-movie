
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/common/Header.js';
import Footer from './components/common/Footer.js';

import SearchInput from './components/common/SearchInput.js';

import Home from './components/Home/Home.js';
import Login from './components/common/Login.js';
import KakaoLoginPage from './components/common/KakaoLoginPage.js';
import SearchResult from './components/SearchResult/SearchResult.js';
import MovieViewRouter from './components/SearchResult/MovieViewRouter.js';
import MovieViewSlide from './components/SearchResult/MovieViewSlide';

import MovieRunning from './components/MovieRunning/MovieRunning.js';
import MovieRanking from './components/MovieRanking/MovieRanking.js';
import MoviePointReviewRouter from './components/MoviePointReview/MoviePointReviewRouter.js';
import MoviePreviewRouter from './components/MoviePreview/MoviePreviewRouter.js';
import MovieEventRouter from './components/MovieEvent/MovieEventRouter.js';
import Download from './components/download/Download.js';
import IndiTheater from './components/IndiTheater/IndiTheater.js';

import btn_top from './images/home/btn_top.png';
import React from 'react';
import { createContext } from 'react';

export const ThemeContext = createContext('light');

function App(){

    return(
      <ThemeContext.Provider value='dark'>
      <div id='App'>
        <BrowserRouter>
          
          <Header/>
          <div id='main'>
            <SearchInput/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/search' element={<SearchResult />} />
                <Route path='/login' element={<Login />} />
                <Route path='/kakao' element={<KakaoLoginPage />} />
                <Route path='/movie/view/*' element={<MovieViewRouter/>} />
                <Route path='/movie/slide' element={<MovieViewSlide />} />
                <Route path='/movie/running/*' element={<MovieRunning />} />
                <Route path='/movie/sdb/*' element={<MovieRanking />} />
                <Route path='/movie/preview/*' element={<MoviePreviewRouter/>} />
                <Route path='/movie/event/*' element={<MovieEventRouter/>} />
                <Route path='/movie/*/list.naver' element={<MoviePointReviewRouter/>} />
                <Route path='/download' element={<Download />} />
                <Route path='/movie/indi' element={<IndiTheater />} />
            </Routes> 
            <Footer/>
          </div>
          <div id="top">
                <img src={btn_top} alt='탑'/>
          </div>
         </BrowserRouter>
      </div>
      </ThemeContext.Provider>
  )
}

export default App;
