export const mapMovies = (data) => {
  const mapped = data.Search.map(({ imdbID, Title, Year, Poster }) => {
    return {
      id: imdbID,
      title: Title,
      year: Year,
      image: Poster
    }
  })
  return mapped
}