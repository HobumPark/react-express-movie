import '../../css/IndiTheater/IndiTheater.css'
import KakaoMap from './KakaoMap';

import {useState,useEffect} from 'react';
import axios from 'axios';

function IndiTheater(){

    const [theaterList,setTheaterList]=useState([]);
    useEffect(()=>{
        getTheaterList()
    },[])

    const getTheaterList=()=>{
        axios.get('/api/v4/indi-theater.json')
        .then(response => {
        console.log(response);
        console.log(response.data.theater_res);
        setTheaterList(response.data.theater_res);
        })
        .catch(error => {
        console.error(error);
        })    
    }

    const moveWebSite=()=>{

    }

    const theaterMap = theaterList.map(
    (data)=>(
        <div id='theater'>
            <div id='theater-info'>
                <div id='theater-info-left'>
                    <img src={`/images/indi/indi${data.no}.jpg`}/>
                </div>
                <div id='theater-info-right'>
                    <h1>{data.name}</h1>
                    <ul>
                        <li>
                            <b>주소:</b> 
                            <span>{data.address}</span>
                        </li>
                        <li>
                            <b>전화번호:</b> 
                            <span>{data.phone}</span>
                        </li>
                        <li>
                            <b>상영관:</b> 
                            <span>{data.room_count}관,</span>
                            <span>{data.audience_count}석</span>
                        </li>
                        <li>
                            <b>부가정보:</b> 
                            <span>{data.extra_info}</span>
                        </li>
                    </ul>
                    <button onClick={moveWebSite}>
                        웹사이트 이동
                    </button>
                </div>
            </div>
            <KakaoMap lat={data.lat} lng={data.lng} address={data.address}/> 
        </div>
        )
    )

    return(
        <div id='indi-theater'>
            <div id='indi-theater-head'>
                <span>독립영화관 리스트</span>
                <span>2020.10.29</span>
            </div>
            {theaterMap}
        </div>
    )
}

export default IndiTheater;