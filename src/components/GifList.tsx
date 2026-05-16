import type { Gif } from '../mock-data/gifs.mock';
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
