
import '../../css/SearchResult/Pagination.css'

function Pagination(props) {
    const {total,movieCountPerPage,currentPage}=props
    const endPage= Math.ceil(total/movieCountPerPage)
    let pageNumbers = []
    for(var i=1; i<=endPage; i++){
        pageNumbers.push(i)
    }

    const result = pageNumbers.map(
        (page) => (<span id='page'
        onClick={()=>pageClick(page)}
        className={currentPage===page? 'active':''}>{page}</span>)
    )

    const pageClick = (page) => {
        //alert(page)
        props.setCurrentPage(page)
    }

    return (
        <div id='pagination'>
            <div id='pagination-inner'>
                <span id='page'>이전</span>
                    {result}
                <span id='page'>다음</span>
            </div>
        </div>
    )
}

export default Pagination;