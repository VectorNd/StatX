// components/CompanySearch.tsx
import { useState } from 'react';

export default function CompanySearch({ onSearch }) {
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(companyName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Enter company name"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}