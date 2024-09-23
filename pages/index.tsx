// pages/index.tsx
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import CompanySearch from '../components/CompanySearch';
import CompanyResults from '../components/CompanyResults';

export default function Home() {
  const { data: session } = useSession();
  const [results, setResults] = useState(null);

  const handleSearch = async (companyName) => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName }),
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <Layout>
      <h1>Company Analysis Portal</h1>
      {session ? (
        <>
          <CompanySearch onSearch={handleSearch} />
          <CompanyResults results={results} />
        </>
      ) : (
        <p>Please sign in to use the portal.</p>
      )}
    </Layout>
  );
}