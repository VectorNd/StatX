// components/SearchHistory.tsx
import Link from 'next/link';

export default function SearchHistory({ searches }) {
  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {searches.map((search) => (
          <li key={search._id}>
            <Link href={`/search/${search._id}`}>
              {search.companyName} - {new Date(search.timestamp).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}