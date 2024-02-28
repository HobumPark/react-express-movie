
import '../../css/MoviePreview/Pagination.css'

function Pagination(props){
    //pageGroup:1 , 1~10
    //pageGroup:2 , 11~20
    //pageGroup:3 , 21
    const {total,boardPerPage,currentPage}=props
    let totalPageGroup= Math.ceil(Math.ceil(total/boardPerPage)/boardPerPage)//총 페이지 그룹 수 (3)
    let currentPageGroup = Math.ceil(currentPage/boardPerPage)//현재 페이지 그룹 (1,2,3)
    let totalPage = Math.ceil(total/boardPerPage)//총 페이지 갯수 21개
    let endPage = Math.ceil(currentPage/boardPerPage)*boardPerPage//현재 끝페이지 (10,20,...)
    let startPage = endPage-(boardPerPage-1) //현재 시작페이지 (1,11,...)

    if(endPage>=totalPage){
        endPage=totalPage;
    }

    let pageNumbers=[]
    for(var i=startPage; i<=endPage; i++){
        pageNumbers.push(i)
    }
    const pageMap=pageNumbers.map(
        (page)=>(<span id='page' className={page===currentPage? 'active-page':''}
        onClick={()=>pageClick(page)}>{page}</span>)
    )

    const pageClick=(page)=>{
        alert('페이지클릭!:'+page)
        props.pageMove(page)
    }

    const prevPage=()=>{
        const prevPage=currentPage-1
        if(prevPage<1){
            return
        }
        props.pageMove(prevPage)
    }

    const nextPage=()=>{
        const nextPage=currentPage+1
        if(nextPage>totalPage){
            return
        }
        props.pageMove(nextPage)
    }

    return(
        <div id='pagination'>
            <span id='page' onClick={()=>prevPage()}>&lt;</span>
                {pageMap}
                    {
                    totalPageGroup !== currentPageGroup? 
                    <span id='page'>...</span>:''
                    }
            <span id='page' onClick={()=>nextPage()}>&gt;</span>
        </div>
    )
}

export default Pagination;