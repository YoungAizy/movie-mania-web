

const SearchInfoBody = ({synopsis=""}) => {
  return (
    <div style={{padding:"12px 16px", textAlign:"center"}}>
        <div className="overview">
            <h3>Overview</h3>
            <p className="synopsis">{synopsis}</p>
        </div>
    </div>
  )
}

export default SearchInfoBody;