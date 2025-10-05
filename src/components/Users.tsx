import type { Filter } from "../App.tsx";

type UsersProps = {
  selectedFilter: Filter;
};

export default function Users({ selectedFilter }: UsersProps) {
  return (
    <div className="border-b border-gray-200 pt-4 text-gray-800">
      <h3 className="text-xl">
        {selectedFilter === "admin" ? "Admin Users" : "Manager Users"}
      </h3>
      <div className="py-4">
        <ul>
          <li className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100">
              J
            </span>
            <div className="flex flex-col">
              <span className="text-sm">John Doe</span>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
