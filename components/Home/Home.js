
import '../../css/Home/Home.css'
import HomeSlide from './HomeSlide';
import HomeContents01 from './HomeContents01';
import HomeContents02 from './HomeContents02';
import HomeContents03 from './HomeContents03';
import Notice from './Notice';
import {useState,useEffect} from 'react';
import PopUp from '../../components/common/PopUp.js';
import { useCookies } from 'react-cookie';

function Home(){
    const [isPopUp,setIsPopUp]=useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['popup']);

    useEffect(()=>{
        cookieCheck()
    },[])

    const cookieCheck=()=>{
        if(cookies.popup==='yes'){
            //alert('yes!')
            setIsPopUp(false);
        }else{
            //alert('no')
        }
    }

    const closePopUp=()=>{
      setIsPopUp(false);
    }

    return(
        <div id='home'>
            {
                isPopUp===true? <PopUp closePopUp={closePopUp}/>:''
            }
            <HomeSlide/>
            <HomeContents01/>
            <HomeContents02/>
            <HomeContents03/>
            <Notice/>
        </div>
    )
}

export default Home;