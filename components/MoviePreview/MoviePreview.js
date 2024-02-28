
import '../../css/MoviePreview/MoviePreview.css'

function MoviePreview(props){
    const {no,title,writer,write_date,attach,hits}=props
    return(
        <div id='movie-preview'>
            <span>{no}</span>
            <span>
                <a href={`/movie/preview/view?no=${no}`}>{title}</a>
            </span>
            <span>{writer}</span>
            <span>{write_date}</span>
            <span>{attach}</span>
            <span>{hits}</span>
        </div>
    )
}

export default MoviePreview;