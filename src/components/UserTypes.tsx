import type { Filter } from "../App.tsx";

type UserTypesProps = {
  selectedFilter: Filter;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserTypes({
  handleInputChange,
  selectedFilter,
}: UserTypesProps) {
  return (
    <div className="text-gray-800">
      <h3 className="text-xl">User Types</h3>
      <div className="flex-col border-b border-gray-200 py-4">
        <label htmlFor="admin">
          <div
            className={`mb-2 flex items-center gap-2 rounded-md p-1.5 px-2 hover:cursor-pointer ${selectedFilter === "admin" ? "bg-blue-100" : "bg-white"}`}
          >
            <input
              onChange={handleInputChange}
              id="admin"
              type="radio"
              name="user_type"
              value="admin"
              checked={selectedFilter === "admin"}
            />
            <span className="text-sm">Admin</span>
          </div>
        </label>
        <label htmlFor="manager">
          <div
            className={`mb-2 flex items-center gap-2 rounded-md p-1.5 px-2 hover:cursor-pointer ${selectedFilter === "manager" ? "bg-blue-100" : "bg-white"}`}
          >
            <input
              onChange={handleInputChange}
              id="manager"
              type="radio"
              name="user_type"
              value="manager"
              checked={selectedFilter === "manager"}
            />
            <span className="text-sm">Manager</span>
          </div>
        </label>
      </div>
    </div>
  );
}
