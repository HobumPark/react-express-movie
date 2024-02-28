
import '../../css/MoviePreview/MoviePreviewView.css'
import {useEffect,useState} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import moment from 'moment';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function MoviePreviewView(){
    const [edit,setEdit]=useState(false)
    const [no,setNo]=useState(0)
    const [title,setTitle]=useState('')
    const [contents,setContents]=useState('')
    const [writer,setWriter]=useState('')
    const [writeDate,setWriteDate]=useState('')
    const [attach,setAttach]=useState('')
    const [hits,setHits]=useState('')
    const [moviePreview,setMoviePreview]=useState('')
    const [fileName,setFileName]=useState('')
    
    useEffect(()=>{
        const search=window.location.search
        const {no}=queryString.parse(search)
        console.log(no)
        getMoviePreviewByNo(no)
    },[])

    const getMoviePreviewByNo=async(no)=>{
        axios.get(`/api/v4/movie_preview_view.json?no=${no}`)
        .then(response => {
        console.log(response);
        console.log(response.data.movie_preview_res);
        console.log(response.data.movie_preview_res[0]);
        const tempPreview=response.data.movie_preview_res[0]
        setMoviePreview(tempPreview)
        setNo(tempPreview.no)
        setTitle(tempPreview.title)
        setContents(tempPreview.contents)
        setWriter(tempPreview.writer)
        setWriteDate(tempPreview.write_date)
        setAttach(tempPreview.attach)
        setHits(tempPreview.hits)
        })
        .catch(error => {
        console.error(error);
        })
    }

    const updateView=async()=>{
        alert('수정!')

        const boardUpdate
        ={title:title,contents:contents,writer:'noname',
        write_date:'2023-01-01',attach:'Y',hits:0}

        if(edit===true){
            alert('수정요청!')
            await axios.put(`/api/v4/movie_preview_update`,boardUpdate)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            })
        }
        setEdit(!edit)
    }

    const deleteView=()=>{
        alert('삭제!')
    }

    const listView=()=>{
        alert('목록!')
        window.location.href='/movie/preview/list'
    }

    if(edit===false){
        return(
            <div id='movie-preview-view'>
                <div id='movie-preview-view-btn'>
                    <button id='update-btn' onClick={updateView}>수정</button>
                    <button id='delete-btn' onClick={deleteView}>삭제</button>
                    <button id='list-btn' onClick={listView}>목록</button>
                </div>
                <div id='movie-preview-view-title'>
                    <span>{no}</span>
                    <span>{title}</span>
                    <span>{writer}</span>
                    <span>{moment(writeDate).format('YYYY-MM-DD')}</span>
                    <span>{attach}</span>
                    <span>{hits}</span>
                </div>
                <div id='movie-preview-view-attach'>
                    <span>첨부</span>
                    <span>ㅁㅁㅁ</span>
                </div>
                <div id='movie-preview-view-contents'>
                    <div id='movie-preview-view-contents-inner'>
                        {contents}
                    </div>
                </div>
                <div id='movie-preview-view-prev-next'>
                    <div id='prev-title'>
                         
                    </div>
                    <div id='next-title'>
                         
                    </div>
                </div>
            </div>
        )
    }else if(edit===true){
        return(
            <div id='movie-preview-view'>
                <div id='movie-preview-view-btn'>
                    <button id='update-btn' onClick={updateView}>수정</button>
                    <button id='delete-btn' onClick={deleteView}>삭제</button>
                    <button id='list-btn' onClick={listView}>목록</button>
                </div>
                <div id='movie-preview-view-title'>
                    <span>{no}</span>
                    <span>
                        <input type='text' defaultValue={title}
                        onChange={(e)=>setTitle(e.target.value)}/>
                    </span>
                    <span>{writer}</span>
                    <span>{moment(writeDate).format('YYYY-MM-DD')}</span>
                    <span>{attach}</span>
                    <span>{hits}</span>
                </div>
                <div id='movie-preview-view-contents'>
                    <div id='movie-preview-view-contents-inner'>
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
                    </div>
                </div>
                <div id='movie-preview-view-prev-next'>
                    <div id='prev-title'>
                         
                    </div>
                    <div id='next-title'>
                         
                    </div>
                </div>
            </div>
        )
    }
    
}

export default MoviePreviewView;