
import '../../css/MoviePreview/MoviePreviewWrite.css'
import axios from 'axios';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useState,useEffect} from 'react';
import moment  from 'moment';

function MoviePreviewWrite(){
    const [title,setTitle]=useState('');
    const [contents,setContents]=useState('');
    const [selectedFile,setSelectedFile]=useState('');

    const moviePreviewWrite=async()=>{
        sendFile()
        //boardWrite()
    }

    const boardWrite=async()=>{
        alert('글쓰기!')
        if(title.trim()===''){
            alert('제목을 입력하세요!')
            return
        } else if(contents.trim()===''){
            alert('내용을 입력하세요!')
            return
        }
        const boardWrite
        ={title:title,contents:contents,writer:'noname',
        write_date:'2023-01-01',attach:'Y',hits:0}

        await axios.post(`/api/v4/movie_preview_write`,boardWrite)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const moviePreviewCancle=()=>{
        window.location.href='/movie/preview/list'
    }

    const sendFile=async()=>{
        alert('파일전송!')
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('addtime', moment().format('YYYYMMDDHHmmss'));

        await axios.post("/api/v4/file_upload", formData).then(res => {
            console.log(res)
            console.log(res.data.savefile)
            const saveFileName=res.data.savefile
            alert('성공')
        }).catch(err => {
            alert('실패')
        })
    }

    const handleFileInput=(e)=>{
        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0])
    }

    return(
        <div id='movie-preview-write'>
            <div id='movie-preview-write-title'>
                <span>
                    <b>제목: </b>  
                    <input type='text' placeholder='제목' id='write-input'
                    onChange={(e)=>setTitle(e.target.value)}/>
                </span>
                <span id='movie-preview-write-btn'>
                    <button onClick={moviePreviewWrite}>등록</button>
                    <button onClick={moviePreviewCancle}>취소</button>
                </span>
            </div>
            <div id='movie-preview-write-info'>
                <span>
                    <b>글쓴이:</b>
                </span>
                <span>
                    <b>글쓴날짜:</b>
                </span>
            </div>
            <div id='movie-preview-write-contents'>
                <CKEditor
                        editor={ClassicEditor}
                        data={contents}
                        onChange={(event, editor) => {
                            setContents(editor.getData());
                            console.log({ event, editor, contents });
                          }}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                }}/>
                <div id='file-attach'>
                    <input type='file' onChange={e=>handleFileInput(e)}/>
                </div>
            </div>
        </div>
    )
}

export default MoviePreviewWrite;