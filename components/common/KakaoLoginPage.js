import '../../css/common/KakaoLoginPage.css'
import {useEffect} from 'react';
import queryString from 'query-string'
import { REDIRECT_URI,REST_API_KEY } from './KakaoLoginData';
import axios from 'axios';
function KakaoLoginPage(){

    useEffect(()=>{
        console.log(window.location)
        const search=window.location.search
        const queryObj=queryString.parse(search)
        console.log(queryObj)
        const KAKAO_CODE = queryObj.code
        getKakaoToken(KAKAO_CODE)
    },[])

    const getKakaoToken=async(KAKAO_CODE)=>{
        console.log('getKakaoToken')
        console.log(KAKAO_CODE)
        console.log(REST_API_KEY)
        console.log(REDIRECT_URI)
        axios({
            method:'post',
            url:`/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            body:`grant_type=authorization_code&client_id=${REST_API_KEY}$redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        }).then(
            response=>{
                console.log('getKakaoToken then')
                console.log(response)
                console.log(response.data.access_token)
                localStorage.setItem('token',response.data.access_token)
                getUserInfo()
            }
        )
        
    }

    const getUserInfo=()=>{
        console.log('getUserInfo')
        const token = localStorage.getItem('token')
        axios({
            url:'/v2/user/me',
            method:'get',
            headers:{'Authorization':`Bearer ${token}`},
        }).then(
            data=>{
                console.log('getKakaoToken')
                console.log(data)
                window.location.href=localStorage.getItem('page')
            }
        )
    }

    return(
        <div id='kakao-login'>  

        </div>
    )
}

export default KakaoLoginPage;