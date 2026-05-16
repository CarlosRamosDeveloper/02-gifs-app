import { mockGifs } from './mock-data/gifs.mock';

export const GifsApp = () => {
  return (
    <>
      <div className="content-center">
        <h1>Buscador de Gifs</h1>
        <p>Encuentra el gif perfecto para ti</p>
      </div>

      <div className="search-container">
        <input />
        <button>Buscar</button>
      </div>

      <div className="previous-searches">
        <h2>Búsquedas anteriores</h2>
        <ul className="previous-searches-list">
          <li>asd</li>
          <li>asd</li>
          <li>asd</li>
          <li>asd</li>
          <li>asd</li>
        </ul>
      </div>

      <div className="gifs-container">
        {mockGifs.map((gif) => (
          <div key={gif.id} className="gif-card">
            <img src={gif.url} alt={gif.title} />
            <h3>{gif.title}</h3>
            <p>
              {gif.width} x {gif.height} (15mb)
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
