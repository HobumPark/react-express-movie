import '../../../css/SearchResult/MovieViewTab/Crew.css';

function Crew(props){
    return(
        <div id='crew'>
            <div id='crew-image'>
                <a href="#">
                    {
                        props.img_name === ''?
                        <span>
                            <img src={`/images/crew/ico_noimage.png`} id='no-img'/>
                        </span>
                        :
                        props.role==='감독'?
                        <img src={`/images/crew/director/${props.img_name}.jpg`}/>:
                        <img src={`/images/crew/actor/${props.img_name}.jpg`}/>
                    }
                </a>
            </div>
            <div id='crew-info'>
                    <span><a href="#">{props.kor_name}</a></span>
                    <span>{props.eng_name}</span>
                    <span>{props.role}</span>
            </div>
        </div>
    )
}

export default Crew;