
import '../../../css/SearchResult/MovieViewTab/RatingContents.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';
import queryString from 'query-string';
import CommentList from './Comment/CommentList';
import moment from 'moment';

function RatingContents(){
    const [email,setEmail] = useState('')
    const [memberId,setMemberId] = useState('')
    const [nickName,setNickName] = useState('')
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [comment,setComment] = useState('')
    const [movieId,setMovieId] = useState('')
    const [commentList,setCommentList] = useState([])
    const [tabNo , setTabNo] = useState(3)
    const [commentPage,setCommentPage] = useState(1)

    useEffect(()=>{
        checkAccessToken()
        
        getMovieId()
        getCommentListLatest()
        
        setTimeout(()=>{
            redStarHover()
            makeInputBoxBig()
        },1000)
    },[])

    const checkAccessToken=()=>{
        console.log('checkAccessToken')
        const token = localStorage.getItem('token')
        if(token===null){
            console.log('토큰정보 존재하지 않음')
            return
        }

        axios({
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
                    setIsLoggedIn(true)
                    makeInputBoxBig()
                    getUserInfo()
                }else{
                    setIsLoggedIn(false)
                    localStorage.removeItem('token')
                }
            }
        ).catch(error => {
            console.log('error')
            console.log(error)
        })
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
                console.log(reponse.data.kakao_account)
                console.log(reponse.data.kakao_account.email)
                console.log(reponse.data.id)
                //console.log(reponse.data.properties.nickname)
                setMemberId(reponse.data.id)
                setNickName(reponse.data.properties.nickname)
            }
        )
    }

    const makeInputBoxBig=()=>{
        const textInfo='권리침해, 욕설, 특정 대상을 비하하는 내용,'+
        '청소년에게 유해한 내용 등을 게시할 경우 운영정책과'+
        '이용약관 및 관련 법률에 의해 제재 될 수 있습니다.'

        $("#comment-head #input-box-bottom-active").on('click',function(){
            alert('make big!')
            $("#comment-head #input-box-bottom-active").height('440px')
            $("#comment-head #input-box-bottom-active textarea").css({
                "width":"900px",
                "height":"330px"
            })
            $("#comment-head #input-box-bottom-active textarea").attr('placeholder',textInfo)
            $("#add-btn-area").css({
                "display":"block"
            })
            $(".emotion").css({
                "position":"relative",
                "top":"350px",
                "right":"10px"
            })
            //$(".emotion").addClass("move-bottom")
        })
    }

    const redStarHover=()=>{
        var idx=0;
        var hoverEvent=true;

        function mouseOver(){
                idx=$(this).index()
                console.log(idx)
                console.log('over')
                $("#star-grade>span").eq(idx)
                .removeClass("big-grey-star-left").removeClass("big-grey-star-right")
                if(idx%2==0){
                    $("#star-grade>span").eq(idx).addClass("big-red-star-left")
                    $("#rating-num").text(idx+1)
                    //0 - 1 , 1 - 2 , 2
                    for(var i=idx; i>=0; i--){
                        if(i%2==0){
                            $("#star-grade>span").eq(i)
                            .removeClass("big-grey-star-left").removeClass("big-grey-star-right")
                            $("#star-grade>span").eq(i).addClass("big-red-star-left")
                        }else if(i%2==1){
                            $("#star-grade>span").eq(i)
                            .removeClass("big-grey-star-left").removeClass("big-grey-star-right")
                            $("#star-grade>span").eq(i).addClass("big-red-star-right")
                        }
                    }
                }else if(idx%2==1){
                    $("#star-grade>span").eq(idx).addClass("big-red-star-right")
                    $("#rating-num").text(idx+1)
                    for(var i=idx; i>=0; i--){
                        if(i%2==0){
                            $("#star-grade>span").eq(i)
                            .removeClass("big-grey-star-left").removeClass("big-grey-star-right")
                            $("#star-grade>span").eq(i).addClass("big-red-star-left")
                        }else if(i%2==1){
                            $("#star-grade>span").eq(i)
                            .removeClass("big-grey-star-left").removeClass("big-grey-star-right")
                            $("#star-grade>span").eq(i).addClass("big-red-star-right")
                        }
                    }
                }
        }
        function mouseLeave(){
                console.log('out')
                $("#star-grade>span")
                .removeClass("big-red-star-left").removeClass("big-red-star-right")
                if(idx%2==0){
                    for(var i=idx; i>=0; i--){
                        if(i%2==0){
                            $("#star-grade>span").eq(i).addClass("big-grey-star-left")
                        }else if(i%2==1){
                            $("#star-grade>span").eq(i).addClass("big-grey-star-right")
                        } 
                    }
                }else if(idx%2==1){
                    for(var i=idx; i>=0; i--){
                        if(i%2==0){
                            $("#star-grade>span").eq(i).addClass("big-grey-star-left")
                        }else if(i%2==1){
                            $("#star-grade>span").eq(i).addClass("big-grey-star-right")
                        } 
                    }
                }
                $("#rating-num").text(0)
        }

        $("#star-grade>span").on({
            "mouseover":mouseOver,
            "mouseleave":mouseLeave,
            "click":function(){
                console.log('remove or add')
                    if(hoverEvent===true){
                        $("#star-grade>span").off("mouseover"); 
                        $("#star-grade>span").off("mouseleave"); 
                        hoverEvent=false
                    }else if(hoverEvent===false){
                        $("#star-grade>span").on("mouseover",mouseOver); 
                        $("#star-grade>span").on("mouseleave",mouseLeave); 
                        hoverEvent=true
                    }
                }
            }
        )
    }

    const getMovieId=()=>{
        console.log(window.location)
        console.log(window.location.search)
        const queryObj = queryString.parse(window.location.search)
        console.log(queryObj)
        console.log(queryObj.id)
        const id = parseInt(queryObj.id)
        setMovieId(id)
    }

    const inputBoxHandle=()=>{
        //alert('inputBoxHandle!')
        if(isLoggedIn===true){
            //alert('로그인 되어있음!')
        }else if(isLoggedIn===false){
            //alert('로그인 안되어있음!')
            var result=window.confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')
            if(result===true){
                window.location.href='/login'
            }
            
        }
    }

    const textAreaInput=(e)=>{
        console.log(e.target.value)
        setComment(e.target.value)
    }

    const enrollComment=async()=>{
        alert('등록!')
        if(comment===''){
            alert('댓글을 입력하세요!')
            return
        }
        setComment('')
        //영화 아이디, 사용자 아이디, 내용, 평점, 날짜
        let rating = document.getElementById('rating-num').innerText
        if(rating===''){
            alert('평점을 선택하세요!')
            return
        }
        console.log('등록평점')
        console.log(rating)
        rating=Number(rating)
        const commentInfo
        ={movie_id:movieId,member_id:memberId,nickname:nickName,comment:comment,rating:rating,pros:0,cons:0,write_date:'2023-07-01 12:30:20'}
        const result = await axios.post('/api/v3/post/comment',commentInfo)
        setCommentList([commentInfo,...commentList])
    }

    const getCommentListLatest=async()=>{
        const result = await axios.get('/api/v3/get/comment/latest')
        console.log('getCommentListLatest')
        console.log(result)
        console.log(result.data.comment_res)
        
        let tempCommentList = result.data.comment_res
        tempCommentList = tempCommentList.map(
            (data)=>({
                rp_idx:data.rp_idx,
                movie_id:data.movie_id,
                member_id:data.member_id,
                nickname:data.nickname,
                comment:data.comment,
                rating:data.rating,
                pros:data.pros,
                cons:data.cons,
                write_date:moment(data.write_date).format('YYYY.MM.DD hh:mm')
                })
        )
        setCommentList(tempCommentList)
    }

    const getCommentListOldest=async()=>{
        const recommendIdxList=[]
        const result = await axios.get('/api/v3/get/comment/oldest')
        console.log('getCommentListOldest')
        console.log(result)
        console.log(result.data.comment_res)

        if(isLoggedIn===true){
            const result=await axios.get(`/api/v3/get/comment/history/${memberId}`)
            //댓글 추천 비추천 이력 가지고옴
            for(var i=0; i<recommendIdxList.length; i++){

            }
        }

        let tempCommentList = result.data.comment_res
        tempCommentList = tempCommentList.map(
            (data)=>({
                rp_idx:data.rp_idx,
                movie_id:data.movie_id,
                member_id:data.member_id,
                nickname:data.nickname,
                comment:data.comment,
                rating:data.rating,
                pros:data.pros,
                cons:data.cons,
                write_date:moment(data.write_date).format('YYYY.MM.DD hh:mm')
                })
        )
        setCommentList(tempCommentList)
    }

    const getCommentListPros=async()=>{
        const recommendIdxList=[]
        const result = await axios.get('/api/v3/get/comment/pros')
        console.log('getCommentListPros')
        console.log(result)
        console.log(result.data.comment_res)

        if(isLoggedIn===true){
            const result=await axios.get(`/api/v3/get/comment/history/${memberId}`)
            //댓글 추천 비추천 이력 가지고옴
            for(var i=0; i<recommendIdxList.length; i++){

            }
        }

        let tempCommentList = result.data.comment_res
        tempCommentList = tempCommentList.map(
            (data)=>({
                rp_idx:data.rp_idx,
                movie_id:data.movie_id,
                member_id:data.member_id,
                nickname:data.nickname,
                comment:data.comment,
                rating:data.rating,
                pros:data.pros,
                cons:data.cons,
                write_date:moment(data.write_date).format('YYYY.MM.DD hh:mm')
                })
        )
        setCommentList(tempCommentList)
    }

    const setMenu=(choice)=>{
        $("#comment-list-contents>div").hide()
        if(choice===1){
            $("#comment-basic").show()
            setTabNo(1)
        }else if(choice===2){
            getCommentListPros()
            $("#comment-pros-cons").show()
            setTabNo(2)
        }else if(choice===3){
            getCommentListLatest()
            $("#comment-latest").show()
            setTabNo(3)
        }else if(choice===4){
            getCommentListOldest()
            $("#comment-oldest").show()
            setTabNo(4)
        }
        setCommentPage(1)
    }

    const getMoreComment=async()=>{
        console.log('getMoreComment')
        const result = await axios.get(`/api/v3/get/comment/more/${commentPage}`)
        console.log(result)
        const comment_array=result.data.comment_res
        if(comment_array.length===0){
            console.log('더 불러올 댓글 없음')
            return
        }
        setCommentPage(commentPage+1)
        
        const concatedList = commentList.concat(comment_array)
        setCommentList(concatedList)
    }

    return(
        <div id='rating-contents'>
           <div id='comment-head'>
                <h1>네티즌 평점 <b>9.1점</b><span>(명)</span></h1>
                {
                    isLoggedIn===false?
                    <a id='input-box'>
                        <span id='input-box-top'>
                            <div id='star-grade' className='big-grey-star'>
                                
                            </div>
                        </span>
                        <span id='input-box-bottom' onClick={inputBoxHandle}>
                            <span>로그인 해주세요</span>
                            <span className="emotion"></span>
                        </span>
                    </a>:
                    <a id='input-box'>
                        <span id='input-box-top'>
                            <div id='star-grade' className='big-grey-star'>
                                <span className='big-grey-star-left'></span>
                                <span className='big-grey-star-right'></span>
                                <span className='big-grey-star-left'></span>
                                <span className='big-grey-star-right'></span>
                                <span className='big-grey-star-left'></span>
                                <span className='big-grey-star-right'></span>
                                <span className='big-grey-star-left'></span>
                                <span className='big-grey-star-right'></span>
                                <span className='big-grey-star-left'></span>
                                <span className='big-grey-star-right'></span>
                            </div>
                            <span id='rating-num'>
                            </span>
                        </span>
                        <span id='input-box-bottom-active'>
                            <span>
                                <textarea readonly placeholder='댓글 입력'
                                value={comment}
                                onChange={textAreaInput}> 
                                </textarea>
                            </span>
                            <span className="emotion"></span>
                            <div id='add-btn-area'>
                                <span>※ 이 댓글에 대한 법적 책임은 작성자에게 귀속됩니다.</span>
                                <button onClick={enrollComment}>등록</button>
                            </div>
                        </span>
                    </a>
                }
                
            </div>
            <div id='comment-list'>
                <div id='comment-list-head'>
                    <ul>
                        <li onClick={()=>setMenu(1)} className={tabNo===1? 'rating-tab-active':''}>추천댓글</li>
                        <li onClick={()=>setMenu(2)} className={tabNo===2? 'rating-tab-active':''}>찬반순</li>
                        <li onClick={()=>setMenu(3)} className={tabNo===3? 'rating-tab-active':''}>최신순</li>
                        <li onClick={()=>setMenu(4)} className={tabNo===4? 'rating-tab-active':''}>과거순</li>
                    </ul>
                </div>
                <div id='comment-list-contents'>
                    <div id='comment-basic'>
                        <CommentList commentList={commentList}/>
                    </div>
                    <div id='comment-pros-cons'>
                        <CommentList commentList={commentList}/>
                    </div>
                    <div id='comment-latest'>
                        <CommentList commentList={commentList}/>
                    </div>
                    <div id='comment-oldest'>
                        <CommentList commentList={commentList}/>
                    </div>
                </div>
                <div id='see-more-comment'>
                    <span id='see-more-btn' onClick={getMoreComment}>평점 더보기</span>
                    <span className="arrow-down"></span>
                </div>
            </div>
        </div>
    )
}
export default RatingContents;