import type { Gif } from '../mock-data/gifs.mock';

interface Props {
  gif: Gif;
}

export const GifCard = ({ gif }: Props) => {
  return (
    <div key={gif.id} className="gif-card">
      <img src={gif.url} alt={gif.title} />
      <h3>{gif.title}</h3>
      <p>
        {gif.width} x {gif.height} (15mb)
      </p>
    </div>
  );
};
