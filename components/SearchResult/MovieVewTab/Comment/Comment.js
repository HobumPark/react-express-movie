import '../../../../css/SearchResult/MovieViewTab/Comment/Comment.css';
import {useEffect} from 'react';
import $ from 'jquery';
import axios from 'axios';
import {useState} from 'react';

function Comment(props){

  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [email,setEmail] = useState(false)
  const [count,setCount] = useState(0)

  useEffect(()=>{
    
  })        

  const checkAccessToken=async()=>{
    var result=null;
    console.log('checkAccessToken')
    const token = localStorage.getItem('token')
    if(token===null){
        console.log('토큰정보 존재하지 않음')
        return false
    }

    await axios({
        url:'/v1/user/access_token_info',
        method:'get',
        headers:{'Authorization':`Bearer ${token}`},
    }).then(
        response=>{
            console.log('checkAccessToken then')
            console.log(response)
            console.log(response.data.expires_in)
            const time_left=response.data.expires_in
            if(time_left > 0){
                console.log('time remain')
                result=true;
            }else{
                setIsLoggedIn(false)
                localStorage.removeItem('token')
                result=false;
            }
        }
    ).catch(error => {
        console.log('error')
        console.log(error)
        result=false
    })

    return result
  }

  const getUserInfo=()=>{
    console.log('getUserInfo')
    const token = localStorage.getItem('token')
    axios({
        url:'/v2/user/me',
        method:'get',
        headers:{'Authorization':`Bearer ${token}`},
    }).then(
        reponse=>{
            console.log('getKakaoToken')
            console.log(reponse)
            console.log(reponse.data)
            console.log(reponse.data.kakao_account)
            console.log(reponse.data.kakao_account.email)

        }
    )
  }

  const checkCommentHistory=()=>{
    const result=axios.get('/api/v2/get/comment/history')

  }



  const recommendComment=async()=>{
    alert('댓글 추천')
    var result=await checkAccessToken()
    alert(result)
    if(result===false){
      alert('로그인 하세요!')
      return
    }
    alert("rp_idx:"+props.rp_idx)
    prosIncrease(props.rp_idx)
    var txt=$("#recommendation-num").text()
    $("#recommendation-num").text(parseInt(txt)+1)
    alert(txt)
    $(this).removeClass("recommendation").addClass("recommendation-active")
    setCount(count+1)
  }
  
  const prosIncrease=async(rp_idx)=>{
    alert('prosIncrease')
    const result = await axios.put('/api/v2/increase/pros/'+rp_idx);
    console.log(result);
  }

  const nonRecommendComment=async()=>{
    alert('댓글 비추천')
    var result=await checkAccessToken()
    alert(result)
    if(result===false){
      alert('로그인 하세요!')
      return
    }
    alert("rp_idx:"+props.rp_idx)
    consIncrease(props.rp_idx)
  }
  const consIncrease=async(rp_idx)=>{
    const result = await axios.put('/api/v2/increase/cons/'+rp_idx);
    console.log(result);
    setCount(count+1)
    var recommendationNum = $('#recommendation-num').text()
    alert(recommendationNum)
    $('#recommendation-num').text(parseInt(recommendationNum)+1)
  }

  return(
    <div id='comment'>
        <div id='comment-row-01'>
            <div id='rating-star'>
                <span className="grey-star"></span>
                <span className="red-star" style={{width:props.rating*10+'%'}}></span>
            </div>
            <span>{props.rating}</span>
        </div>
        <div id='comment-row-02'>
            {props.comment}
        </div>
        <div id='comment-row-03'>
            <span className='nick-name'>{props.nickname}</span>
            <span className='write-date'>{props.write_date}</span>
            <div id='reco-non-reco-area'>
                <span className='recommendation' onClick={recommendComment}></span>
                <span id='recommendation-num'>{props.pros}</span>
                <span className='non-recommendation' onClick={nonRecommendComment}></span>
                <span id='non-recommendation-num'>{props.cons}</span>
            </div>
        </div>
    </div>
  )
}

export default Comment;