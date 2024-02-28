import '../../css/common/PopUp.css'
import { useCookies } from 'react-cookie'
import moment from 'moment'

function PopUp(props){
    const [cookies, setCookie, removeCookie] = useCookies(['popup'])

    const oneDayClose=()=>{
        const expires =  moment().add('2','day').toDate()
        setCookie('popup', 'yes',{path:'/',expires:expires});
        props.closePopUp()
    }

    const closePopUp=()=>{
        props.closePopUp()
    }

    return(
        <div id='popup'>
            <a href='#'>
                <img src={'/images/popup/popup.jpg'}/>
            </a>
            <div id='btn-area'>
                <input type='checkbox' onClick={oneDayClose}/>
                <span>오늘그만보기</span>
                <button onClick={closePopUp}>
                    <img src={'/images/popup/close_pop.jpg'}/>
                </button>
            </div>
        </div>
    )
}

export default PopUp;