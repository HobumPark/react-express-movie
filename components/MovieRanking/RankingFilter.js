import '../../css/MovieRanking/RankingFilter.css'
import {useEffect,useState} from 'react';
import axios from 'axios';

function RankingFilter(props){

    const [releaseNo,setReleaseNo]=useState(1);
    const [genreNo,setGenreNo]=useState(1);
    const [periodNo,setPeriodNo]=useState(2);

    /* 상위탭 */
    const domesticRelease=()=>{
        alert('국내개봉!')
        setReleaseNo(1)
        props.domesticRelease()
    }

    const providerRelease=()=>{
        alert('배급사!')
        setReleaseNo(2)
    }

    const makerRelease=()=>{
        alert('제작사!')
        setReleaseNo(3)
    }

    const historyRelease=()=>{
        alert('역대!')
        setReleaseNo(4)

    }

    const foreignRelease=()=>{
        alert('해외개봉!')
        setReleaseNo(5)
        props.foreignRelease()
    }
    /* 하위탭1 */
    const genreAction=()=>{
        alert('액션/SF')
    }

    /* 하위탭2 */
    const weeklyRanking=()=>{
        alert('주간랭킹!')
        setPeriodNo(2)
        props.weeklyRanking()
    }

    const monthlyRanking=()=>{
        alert('월간랭킹!')     
        setPeriodNo(3)
        props.monthlyRanking()
    }

    const yearlyRanking=()=>{
        alert('년간랭킹!')     
        setPeriodNo(6)
        props.yearlyRanking()
    }

    const searchMovie=()=>{
        alert('조회!')
        props.searchMovie()
    }

    return(
        <div id='ranking-filter'>
             <div id='tab-btn'>
                <button className={releaseNo==1? "release-active" : ""} onClick={domesticRelease}>국내개봉</button>
                <button className={releaseNo==2? "release-active" : ""} onClick={providerRelease}>배급사</button>
                <button className={releaseNo==3? "release-active" : ""} onClick={makerRelease}>제작사</button>
                <button className={releaseNo==4? "release-active" : ""} onClick={historyRelease}>역대</button>
                <button className={releaseNo==5? "release-active" : ""} onClick={foreignRelease}>해외</button>
             </div>
             <div id='contents'>
                <div id='genre-list'>
                    <b>장르</b>
                    <ul>
                        <li className='genre-active'>전체</li>
                        <li>액션/SF</li>
                        <li>멜로/드라마</li>
                        <li>코미디</li>
                        <li>공포/스릴러</li>
                        <li>애니메이션</li>
                        <li>기타</li>
                    </ul>
                </div>
                <div id='counting-period-list'>
                    <b>집계기간</b>
                    <ul>
                        <li>어제</li>
                        <li className={periodNo==2? "period-active" : ""} onClick={weeklyRanking}>일주일</li>
                        <li className={periodNo==3? "period-active" : ""} onClick={monthlyRanking}>1개월</li>
                        <li>2개월</li>
                        <li>6개월</li>
                        <li className={periodNo==6? "period-active" : ""} onClick={yearlyRanking}>1년</li>
                    </ul>
                </div>
                <div id='btn-list'>
                    <button onClick={searchMovie}>조회</button>
                </div>
             </div>
        </div>
    )
}

export default RankingFilter;