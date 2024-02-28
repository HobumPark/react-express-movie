
import '../../css/Home/HomeContents01.css';
import spotLight from '../../images/home/spot-light.jpg'

import running_movie01 from '../../images/home/running_movie/running_movie01.jpg'
import running_movie02 from '../../images/home/running_movie/running_movie02.jpg'
import running_movie03 from '../../images/home/running_movie/running_movie03.jpg'
import running_movie04 from '../../images/home/running_movie/running_movie04.jpg'
import { useEffect } from 'react';
import $ from 'jquery';


function HomeContents01(){

    useEffect(() => {
        user_rating_display_init()
        movie_rank_hover_display_init()
        movie_rank_hover_display()
    }, [])

    const user_rating_display_init = () => {
        for (var i = 1; i <= 4; i++){
            const selector1=`#running-movie0${i} .user_rating_cont01`
            console.log(selector1)
            var rating = document.querySelector(selector1).innerText
            rating = parseFloat(rating)
            console.log(rating)    

            const selector2 = `#running-movie0${i} .rank_red_cont01`
            var rank_width = 73 * (rating/10)
            document.querySelector(selector2).style.width = rank_width+"px"
        }
    }
    const movie_rank_hover_display_init=()=>{
        var movieImg=$("#contents>div>#running-movie-img")
        var movieComments=$("#contents>div>#running-movie-contents>#comment")
        var contentsDiv=$("#contents>div")
        $(movieImg).hide()
        $(movieComments).hide()
        $(contentsDiv).css("height","30px")
        $(contentsDiv).find("#running-movie-contents").css("height","0px")
    }
    const movie_rank_hover_display=()=>{
        $("#home-contents01 #contents>div").on({
            "mouseenter":function(){
                var idx=$(this).index()
                console.log(idx)
                var contentsDiv=$("#home-contents01 #contents>div")
                $(contentsDiv).eq(idx).css("height","110px")
                $(contentsDiv).eq(idx).find("#running-movie-img").show()
                $(contentsDiv).eq(idx).find("#running-movie-contents").css("height","50px")
                $(contentsDiv).eq(idx).find("#comment").css("height","80px").show()
                $(contentsDiv).eq(idx).find(".rank_red_cont01").css("left","196px")
                $(contentsDiv).eq(idx).find(".rank_grey_cont01").css("left","196px")
                $(contentsDiv).eq(idx).find(".user_rating_cont01").css("left","296px")
                $(contentsDiv).eq(idx).find("#running-movie-contents").css("width","85%")
            },
            "mouseleave": function () {
                var idx=$(this).index()
                console.log(idx)
                var contentsDiv=$("#home-contents01 #contents>div")
                $(contentsDiv).find("#running-movie-img").hide()
                $(contentsDiv).find("#comment").hide()
                $(contentsDiv).eq(idx).find("#running-movie-contents").css("height","0px")
                $(contentsDiv).css("height","30px")
                $(contentsDiv).eq(idx).find(".rank_red_cont01").css("left","270px")
                $(contentsDiv).eq(idx).find(".rank_grey_cont01").css("left","270px")
                $(contentsDiv).eq(idx).find(".user_rating_cont01").css("left","370px")
                $(contentsDiv).find("#running-movie-contents").css("width","100%")
                
            }
        })
    }

    return(
        <div id='home-contents01'>
            <div id='running-movie-rank'>
                <div id='head'>
                    <span className='running-movie-rank'></span>
                </div>
                <div id='contents'>
                    <div id='running-movie01'>
                        <div id='running-movie-img'>
                            <img src={running_movie01} alt="개봉영화01"/>
                        </div>
                        <div id='running-movie-contents'>
                            <div id='info'>
                                <span>더 퍼스트 슬램덩크</span>
                                <span className="rank_grey_cont01"></span>
                                <span className="rank_red_cont01"></span>
                                <span className="user_rating_cont01">9.52</span>
                            </div>
                            <div id='comment'>
                                <span>너희들은 안 늙었구나..</span>
                                <span>첫타임으로 보고왔는데</span>
                                <span>이노우에 다케히코가</span>
                            </div>
                        </div>
                    </div>
                    <div id='running-movie02'>
                        <div id='running-movie-img'>
                            <img src={running_movie02} alt="개봉영화02"/>
                        </div>
                        <div id='running-movie-contents'>
                            <div id='info'>
                                <span>시간을 꿈꾸는 소녀</span>
                                <span className="rank_grey_cont01"></span>
                                <span className="rank_red_cont01"></span>
                                <span className="user_rating_cont01">8.43</span>
                            </div>
                            <div id='comment'>
                                <span>운명을 거스르는 방법은</span>
                                <span>무속인과 대학생의</span>
                                <span>자유의지 라는건 존재하는가</span>
                            </div>
                        </div>
                    </div>
                    <div id='running-movie03'>
                        <div id='running-movie-img'>
                            <img src={running_movie03} alt="개봉영화03"/>
                        </div>
                        <div id='running-movie-contents'>
                            <div id='info'>
                                <span>올빼미</span>
                                <span className="rank_grey_cont01"></span>
                                <span className="rank_red_cont01"></span>
                                <span className="user_rating_cont01">9.34</span>
                            </div>
                            <div id='comment'>
                                <span>운명을 거스르는 방법은</span>
                                <span>무속인과 대학생의</span>
                                <span>자유의지 라는건 존재하는가</span>
                            </div>
                        </div>
                    </div>
                    <div id='running-movie04'>
                        <div id='running-movie-img'>
                            <img src={running_movie04} alt="개봉영화04"/>
                        </div>
                        <div id='running-movie-contents'>
                            <div id='info'>
                                <span>스위치</span>
                                <span className="rank_grey_cont01"></span>
                                <span className="rank_red_cont01"></span>
                                <span className="user_rating_cont01">8.48</span>
                            </div>
                            <div id='comment'>
                                <span>운명을 거스르는 방법은</span>
                                <span>무속인과 대학생의</span>
                                <span>자유의지 라는건 존재하는가</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='spot-light'>
                <div id='head'>
                    <span className='spot-light'></span>
                </div>   
                <div id='contents'>
                    <img src={spotLight} alt='스포트라이트'/>
                </div>
            </div>
        </div>
    )
}

export default HomeContents01;