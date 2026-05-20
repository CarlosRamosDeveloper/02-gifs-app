import type { FC } from 'react';

interface Props {
  searches: string[];
  onLabelClicked: (terms: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClicked }) => {
  return (
    <div className="previous-searches">
      <h2>Búsquedas anteriores</h2>
      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li
            key={term}
            onClick={() => {
              onLabelClicked(term);
            }}
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};
