export function Movie({movie}) {
  const { title, year, image } = movie

  return (
    <div className='card'>
      <div className='title'>
        <h4>{title}</h4>
        <p>{year}</p>
      </div>
      <div className='image'>
        <img src={image} alt="" />
      </div>
    </div>
  )
}