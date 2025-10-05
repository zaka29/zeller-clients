import { useEffect, useState } from "react";
import { useZellerCustomers } from "./hooks/useZellerCustomers.ts";
import UserTypes from "./components/UserTypes.tsx";
import Users from "./components/Users.tsx";

export type Filter = "admin" | "manager";

function App() {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("admin");
  const [errorMessage, setErrorMessage] = useState("");
  const { data, loading, error } = useZellerCustomers();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Filter;
    setSelectedFilter(value);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <div className="grid h-full grid-cols-6 content-center gap-4">
      <div className="col-span-4 col-start-2">
        <div className="flex flex-col rounded border border-gray-100 p-4 shadow-md">
          {errorMessage && (
            <div className="mb-4 flex items-center justify-between rounded border border-red-500 bg-red-200 p-4 text-red-500">
              <p>{errorMessage}</p>
              <button
                className="rounded border p-1 text-xs"
                onClick={() => setErrorMessage("")}
              >
                close
              </button>
            </div>
          )}
          <UserTypes
            handleInputChange={handleInputChange}
            selectedFilter={selectedFilter}
          />
          {loading && <div>Loading...</div>}
          {data && data.length > 0 && <Users selectedFilter={selectedFilter} />}
        </div>
      </div>
    </div>
  );
}

export default App;
