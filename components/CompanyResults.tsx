// components/CompanyResults.tsx
export default function CompanyResults({ results }) {
    if (!results) return null;
  
    return (
      <div>
        <h2>Analysis Results</h2>
        <p>Companies in the same country: {results.companiesInCountry}</p>
        <p>Companies with greater diversity: {results.companiesWithGreaterDiversity}</p>
        {/* Add more result displays here */}
      </div>
    );
  }