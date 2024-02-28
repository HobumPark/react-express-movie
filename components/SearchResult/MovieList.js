
import '../../css/SearchResult/MovieList.css'
import Movie from './Movie';

function MovieList(props) {

    const result = props.movieList.map(
        (data,index) => (<Movie
            key={data.id}
            movie_code={data.movie_code}
            link={data.link}
            title={data.title}
            audience_rating={data.audience_rating}
            opening_date={data.opening_date}
            director={data.director}
            main_actor={data.main_actor}/>)
    )
    return (
        <div id='movie-list'>
            {result}
        </div>
    )
}

export default MovieList;