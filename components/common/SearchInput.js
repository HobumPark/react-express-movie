
import '../../css/common/SearchInput.css'
import { useState,useEffect } from 'react';
import promo_npay from '../../images/search_input/promo_npay_200108.png';
import axios from 'axios';
import { REST_API_KEY,REDIRECT_URI_HOME } from './KakaoLoginData';

function SearchInput() {

    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [loading,setLoading]=useState(false)
    const [query, setQuery]=useState('')
    const [autoComplete, setAutoComplete] = useState(false)
    const [popupShow, setPopUpShow] = useState(false)
    const [searchRecommendList,setSearchRecommendList]=useState([])

    useEffect(()=>{
        console.log(isLoggedIn)
        checkAccessToken()
        setTimeout(()=>{
            setLoading(true)
        },200)
    })

    const searchMovie=()=>{
        if(query.trim()===''){
            alert('검색어를 입력하세요!')
            return
        }
        window.location.href=`/search?query=${query}`
    }

    const queryChange=async(e)=>{
        console.log(e.target.value)
        setQuery(e.target.value)

        const search_word=e.target.value
        if(search_word.trim()===''){
            return
        }

        const result = await axios.get('/api/v1/get/recommend_search_word/'+search_word);
        console.log(result);
        console.log(result.data.movie_res);
        const movieList=result.data.movie_res;
        if(movieList.length !== 0){
            var searchWorldList=document.getElementById("search-word-list");
            searchWorldList.style.display="block";
            setSearchRecommendList(result.data.movie_res);
        }
    }

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchMovie(); // Enter 입력이 되면 클릭 이벤트 실행
          }
    }

    const autoCompleteSet = () => {
        setAutoComplete(!autoComplete)
    }

    const moreServiceFunc = () =>{
        //alert('more service!')
        setPopUpShow(!popupShow)
    }

    const moveLogin=()=>{
        window.localStorage.setItem('page',window.location.href)
        window.location.href='/login'
    }

    const logoutAction=()=>{
        console.log('logoutAction')
        const token = localStorage.getItem('token')
        console.log(token)
        axios({
            method:'post',
            url:`/v1/user/logout`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${token}`
            },//body:`grant_type=authorization_code&client_id=${REST_API_KEY}$redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        }).then(
            response=>{
                console.log('logoutAction then')
                console.log(response)
                setIsLoggedIn(false)
                window.localStorage.removeItem('page')
                window.localStorage.removeItem('token')
                //window.location.href=window.location.href
            }
        )
    }

    const logoutActionSession=()=>{
        console.log('logoutActionSession')
        const token = localStorage.getItem('token')
        console.log(token)
        axios({
            method:'post',
            url:`/v1/user/logout`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${token}`
            },//body:`grant_type=authorization_code&client_id=${REST_API_KEY}$redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        }).then(
            (res)=>{
                console.log('logoutAction then')

                // 세션 정리
                console.log(res)
                setIsLoggedIn(false)
                window.localStorage.removeItem('page')
                window.localStorage.removeItem('token')
                //window.location.href=window.location.href
                signOut();
            }
        )
    }

    const signOut=()=>{
        console.log('signOut!');
        axios({
            method: "delete",
            data: {},
            dataType:'text',
            url: '/v1/user/logout',
          }).then((req,res)=>{
            console.log(req)
            req.session.destroy();
          });
    }
    /*
    function signOut() {
        $.ajax({
            type: "delete",
            url: '/user/logout',
            data: {},
            dataType:'text',
            success: function(res) {
            location.reload();
            }
        });
    }
    */

    const logoutOauthAction=()=>{
        console.log('logoutOauthAction!')
        const token = localStorage.getItem('token')
        console.log(token)
        axios({
            method:'get',
            url:`/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI_HOME}`,
            //body:`grant_type=authorization_code&client_id=${REST_API_KEY}$redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        }).then(
            response=>{
                console.log('logoutAction then!')
                console.log(response)
                setIsLoggedIn(false)
                window.localStorage.removeItem('page')
                window.localStorage.removeItem('token')
                
                //window.location.href=window.location.href
            }
        )
    }

    const unlinkAction=()=>{
        console.log('unlinkAction')
        const token = localStorage.getItem('token')
        console.log(token)
        axios({
            method:'post',
            url:`/v1/user/unlink`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${token}`
            },//body:`grant_type=authorization_code&client_id=${REST_API_KEY}$redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        }).then(
            response=>{
                console.log('logoutAction then')
                console.log(response)
                setIsLoggedIn(false)
                window.localStorage.removeItem('page')
                window.localStorage.removeItem('token')
                //window.location.href=window.location.href
            }
        )
    }

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

    const handleOnFocus=async(e)=>{
        console.log('focus');
        console.log(e.target.value)
        setQuery(e.target.value)

        const search_word=e.target.value
        if(search_word.trim()===''){
            return
        }

        const result = await axios.get('/api/v1/get/recommend_search_word/'+search_word);
        console.log(result);
        console.log(result.data.movie_res);
        const movieList=result.data.movie_res;
        if(movieList.length !== 0){
            var searchWorldList=document.getElementById("search-word-list");
            searchWorldList.style.display="block";
            setSearchRecommendList(result.data.movie_res);
        }

    }

    const handleOnBlur=()=>{
        console.log('blur');
        var searchWorldList=document.getElementById("search-word-list");
        searchWorldList.style.display="none";
    }

    const searchListHover=()=>{
        var searchWord=document.getElementById("search-word")
        searchWord.addEventListener('mouseover',function(){
            alert('mouseover!')
        })
    }

    const moveView=(id)=>{
        alert('이동!')
        window.location.href=`/movie/view/main?id=${id}&menu=${id}`
    }

    const searchWordListResult=searchRecommendList.map(
        (data)=>(<div id='search-word' onClick={()=>moveView(data.movie_code)}>
            <span><img src={`/images/cover/movie${data.movie_code}.jpg`}/></span>
            <span>{data.title}</span>
                </div>)
    )

    return(
        <div id='search-input'>
            <div id='search-input-left'>
                {
                loading===false?
                '':
                isLoggedIn===false ? 
                <div id='login-info-wrap'>
                    <button id='login-btn' onClick={moveLogin}>로그인</button>
                    <span className="more-service" onClick={moreServiceFunc}></span>
                </div>
                :
                <div id='login-info-wrap'>
                    {/* {<button id='logout-btn' onClick={unlinkAction} >로그아웃</button>} */}
                    {/* <button id='logout-btn' onClick={logoutOauthAction} >로그아웃</button> */}
                    <button id='logout-btn' onClick={logoutActionSession} >로그아웃</button>
                    <span className="more-service" onClick={moreServiceFunc}></span>
                </div>
                }
                
                
                {popupShow===true?<span className="popup-up-arrow"></span>:''}
                {popupShow===true?
                <div id="more-service-popup">
                    <div id="favorite">
                        <div id="favorite-top">
                            <span className="setting"></span>
                        </div>
                        <div id="favorite-bottom">
                            <div>
                                <div class="add-favorite"></div>
                                <span>추가</span>
                            </div>
                            <div>
                                <div class="add-favorite"></div>
                                <span>추가</span>
                            </div>
                            <div>
                                <div class="add-favorite"></div>
                                <span>추가</span>
                            </div>
                            <div>
                                <div class="add-favorite"></div>
                                <span>추가</span>
                            </div>
                        </div>
                    </div>
                    <div id="search-area">
                        <div id="search-area-top"> 
                            <input type="text" className="search-input"
                            placeholder="더 많은 서비스를 간편하게 시작하세요"/>
                        </div>
                        <div id="search-area-bottom">
                            <div>
                                <ul>
                                    <li>
                                        <a href="#">까페</a>
                                    </li>
                                    <li>
                                        <a href="#">뉴스</a>
                                    </li>
                                    <li>
                                        <a href="#">지도</a>
                                    </li>
                                    <li>
                                        <a href="#">스포츠</a>
                                    </li>
                                    <li>
                                        <a href="#">게임</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href="#">블로그</a>
                                    </li>
                                    <li>
                                        <a href="#">포스트</a>
                                    </li>
                                    <li>
                                        <a href="#">사전</a>
                                    </li>
                                    <li>
                                        <a href="#">지식iN</a>
                                    </li>
                                    <li>
                                        <a href="#">날씨</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href="#">매일</a>
                                    </li>
                                    <li>
                                        <a href="#">증권</a>
                                    </li>
                                    <li>
                                        <a href="#">부동산</a>
                                    </li>
                                    <li>
                                        <a href="#">VIBE</a>
                                    </li>
                                    <li>
                                        <a href="#">책</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href="#">쇼핑</a>
                                    </li>
                                    <li>
                                        <a href="#">웹툰</a>
                                    </li>
                                    <li>
                                        <a href="#">영화</a>
                                    </li>
                                    <li>
                                        <a href="#">MYBOX</a>
                                    </li>
                                    <li>
                                        <a href="#">웹소설</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="banner">
                        <img src={promo_npay}/>
                    </div>
                    <div id="service-all">
                        <a href="#">
                            전체 서비스 보기
                        </a>
                    </div>
                </div>
                :''}        
            </div>
            <div id='search-input-right'>
                <input type='text' onChange={queryChange}
                    onKeyUp={handleOnKeyPress} 
                    onFocus={handleOnFocus}
                    
                    placeholder="영화검색"/>
                <div id='search-word-list'>
                    {searchWordListResult}
                </div>
                <span className="auto-complete"
                onClick={autoCompleteSet}>
                    <span className={autoComplete === false ?
                        "search-arrow-down" : "search-arrow-up"}>
                    </span>
                </span>
                <button onClick={searchMovie}
                id='search-btn'></button>
            </div>
        </div>
    )
}

export default SearchInput;