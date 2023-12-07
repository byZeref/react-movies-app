import { useEffect, useRef, useState } from "react"
import { mapMovies } from "../utils/movies"
import { fetchMovies } from "../services/movies"
import { notify } from "../utils/notify"

export const useMovies = (search) => {
  const initial = useRef(true) // <--- initial render
  const prevSearch = useRef('')
  const timeout = useRef(null)
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])

  const searchMovies = async () => {
    if (!search || search === prevSearch.current) return
    setSearching(true)
    const { data } = await fetchMovies(search)
      .catch(e => {
        console.error('error on get movies', e)
        notify('error')
      })
      .finally(() => setSearching(false))

    console.log('all good', data)
    if (data?.Response === 'True') {
      const movies = mapMovies(data)
      setResults(movies)
      prevSearch.current = search
      notify('success')
    }
  }

  useEffect(() => {
    // if (initial.current && !search) return
    // initial.current = false
    if (!search) {
      clearTimeout(timeout.current)
      setResults([])
      return
    }
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      console.log('effect')
      searchMovies()
    }, 1000)
  }, [search])

  return { results, searching, searchMovies }
}