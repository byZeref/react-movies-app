import { useState } from 'react'
import { movies } from './mocks/movies'

const API_URL = 'http://www.omdbapi.com/'
const API_KEY = '7ecc9a91'

// TODO extract logic and components

function App() {
  const [ searching, setSearching ] = useState(false)
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])
  const btnText = searching ? <img style={{width: '20px'}} src='/public/loading.svg' /> : 'Buscar'
  
  const handleChange = (ev) => setSearch(ev.target.value)

  const fetchMovies = async () => {
    setSearching(true)
    const data = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`)
      .then(res => res.json())
      .catch(e => {
        console.error('error on get movies', e)
        setSearching(false)
      })
      
    if (data.Response === 'True') {
      const mapped = data.Search.map(({imdbID, Title, Year, Poster}) => {
        return {
          id: imdbID,
          title: Title,
          year: Year,
          image: Poster
        }
      })
      setResults(mapped)
      setSearching(false)
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!search) return
    return fetchMovies()
  }

  return (
    <div className='main-container'>
      <header>
        <h1>React Movies App</h1>
        <form className='search-form' onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" placeholder='Avengers...' />
          <button disabled={searching} type='submit'>{btnText}</button>
        </form>
      </header>

      <main className='movies'>
        { results.length > 0 &&
          results.map(({id, title, year, image}) =>
            (
              <div key={id} className='card'>
                <div className='title'>
                  <h4>{title}</h4>
                  <p>{year}</p>
                </div>
                <div className='image'>
                  <img src={image} alt="" />
                </div>
              </div>
            )
          )
        }
      </main>
      
    </div>
  )
}

export default App
