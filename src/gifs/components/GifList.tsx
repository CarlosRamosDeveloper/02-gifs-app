import type { Gif } from '../interfaces/gif.interface';
import { GifCard } from './GifCard';

interface Props {
  gifs: Gif[];
}

export const GifList = ({ gifs }: Props) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <GifCard gif={gif} />
      ))}
    </div>
  );
};
