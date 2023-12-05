import { useEffect, useRef, useState } from 'react'
import { Movie } from './components/Movie'
import { fetchMovies } from './services/movies'

function App() {
  const initial = useRef(true) // <--- initial render
  const timeout = useRef(null)
  const prevSearch = useRef('')
  const [ searching, setSearching ] = useState(false)
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])
  const btnText = searching
    ? <img style={{width: '20px'}} src='/public/loading.svg' />
    : <span>Buscar</span>
  
  const handleChange = (ev) => setSearch(ev.target.value)

  const searchMovies = async () => {
    setSearching(true)
    const movies = await fetchMovies(search)
      .catch(e => {
        console.error('error on get movies', e)
        setSearching(false)
      })

    setResults(movies)
    setSearching(false)
    prevSearch.current = search
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!search || search === prevSearch.current) return
    return searchMovies()
  }

  
  useEffect(() => {
    if (initial.current && !search) return
    initial.current = false
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      console.log('effect');
      searchMovies()
    }, 1000)
  }, [search])

  return (
    <div className='main-container'>
      <header>
        <h1>React Movies App</h1>
        <form className='search-form' onSubmit={handleSubmit}>
          {/* <input onChange={(ev) => setSearch(ev.target.value)} type="text" placeholder='Avengers...' /> */}
          <input onChange={handleChange} type="text" placeholder='Avengers...' />
          <button disabled={searching} type='submit'>{btnText}</button>
        </form>
      </header>

      <main className='movies'>
        { results?.length > 0 &&
          results.map(movie =>
            <Movie key={movie.id} movie={movie} />
          )
        }
      </main>
      
    </div>
  )
}

export default App
