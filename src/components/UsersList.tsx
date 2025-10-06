import type { Filter } from "../App.tsx";
import type { ZellerCustomer } from "../hooks/useZellerCustomers.ts";

type UserListProps = {
  users: ZellerCustomer[];
  selectedFilter: Filter;
};

export default function UserList({ selectedFilter, users }: UserListProps) {
  const filteredUsers = users
    .filter(
      (user: ZellerCustomer) => user.role.toLowerCase() === selectedFilter,
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="pt-4 text-gray-800">
      <h3 className="text-xl">
        {selectedFilter === "admin" ? "Admin Users" : "Manager Users"}
      </h3>
      <div className="py-4">
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id} className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100">
                {[...user.name].shift()}
              </span>
              <div className="flex flex-col">
                <span className="text-sm">{user.name}</span>
                <span className="text-xs text-gray-400 capitalize">
                  {user.role.toLowerCase()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
