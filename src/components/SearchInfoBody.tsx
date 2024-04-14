import React from 'react'

const SearchInfoBody = ({synopsis}) => {
  return (
    <div style={{padding:12}}>
        <div className="overview">
            <h3>Overview</h3>
            <p>{synopsis}</p>
        </div>
    </div>
  )
}

export default SearchInfoBody