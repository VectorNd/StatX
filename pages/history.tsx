// pages/history.tsx
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import SearchHistory from '../components/SearchHistory';

export default function History() {
  const { data: session } = useSession();
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    if (session) {
      fetch('/api/history')
        .then((res) => res.json())
        .then((data) => setSearches(data));
    }
  }, [session]);

  return (
    <Layout>
      <h1>Search History</h1>
      {session ? (
        <SearchHistory searches={searches} />
      ) : (
        <p>Please sign in to view your search history.</p>
      )}
    </Layout>
  );
}