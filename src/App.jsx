import { Movie } from './components/Movie'
import { ToastContainer } from 'react-toastify';
import { useMovies } from './hooks/movies'
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('')
  const { results, searching, searchMovies } = useMovies(search)
  const btnText = searching
    ? <img style={{width: '20px'}} src='/public/loading.svg' />
    : <span>Buscar</span>

  
  const handleChange = (ev) => {
    const { value } = ev.target
    if (value.startsWith(' ')) return // <-- not working
    setSearch(value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    return searchMovies()
  }

  return (
    <div className='main-container'>
      <ToastContainer />
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
