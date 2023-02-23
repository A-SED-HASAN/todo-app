import React, { useState, useEffect } from 'react'
const Search = ({ bothList }) => {
  const [searchValue, setSearchValue] = useState('')
  const [filteredValue, setFilteredValue] = useState([])
  let array = []
  bothList.forEach((item) => {
    if (searchValue && item.title.includes(searchValue)) {
      array.push(item)
    }
  })

  useEffect(() => {
    setFilteredValue(array)
  }, [searchValue])

  return (
    <section className='section-center search'>
      <input
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
        value={searchValue}
        type='text'
        className='to-do-input'
        placeholder='Search 🔎'
      />

      {filteredValue.length > 0 && (
        <div className='search-container'>
          {filteredValue.map((item, index) => {
            const { id, title } = item
            return (
              <article key={id} className={'to-do-item'}>
                <p className='title'>
                  {index + 1} → {title}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Search
