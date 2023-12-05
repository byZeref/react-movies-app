const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const fetchMovies = async (search) => {
  const data = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`)
    .then(res => res.json())
    .catch(e => {
      throw new Error(e)
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
      return mapped
    }
}