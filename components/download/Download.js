
import '../../css/download/Download.css'
import QRCode from 'qrcode.react';

function Download(){
    return(
        <div id='download'>
            <h1>다운로드</h1>
            <QRCode value={'http://www.cine21.com/'}/>
        </div>
    )
}

export default Download;