import '../../../../css/SearchResult/MovieViewTab/Comment/CommentList.css';
import Comment from './Comment.js';

function CommentList(props){

  const result = props.commentList.map(
    (data)=>(<Comment key={data.id}
      rp_idx={data.rp_idx}
      rating={data.rating}
      comment={data.comment}
      nickname={data.nickname}
      pros={data.pros}
      cons={data.cons}
      write_date={data.write_date}/>)
  )

  return(
    <div id='comment-list'>
        {result}
    </div>
  )
}

export default CommentList;