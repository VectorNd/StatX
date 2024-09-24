import React, { useContext, useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";

const CompanySearch = () => {
  const [input, setInput] = useState("");
  const [companies, setCompanies] = useState([]);
  const { jwt } = useContext(AuthContext);

  const handleSearch = async () => {
      try {
      const response = await fetch(
        `${SERVER_ENDPOINT}/api/v1/company/searchCompanies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ input }),
        }
      );
      const parsedResponse = await response.json();

      if (parsedResponse.status != "SUCCESS") {
        throw new Error("Network response was not ok");
      }
      setCompanies(parsedResponse.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const selectCompany = (company) => {
    console.log("Selected company:", company);
  };

  
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a company"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {companies.map((company) => (
          <li key={company._id} onClick={() => selectCompany(company)}>
            {company.name} ({company.code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanySearch;
