import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.tsx";

vi.mock("./hooks/useZellerCustomers", () => ({
  useZellerCustomers: vi.fn(),
}));

import { useZellerCustomers } from "./hooks/useZellerCustomers";

const mockUseZellerCustomers = vi.mocked(useZellerCustomers);

const mockData = {
  items: [
    {
      email: "david@gmail.com",
      id: "73bae2af-4fa4-4023-8829-1034604e7590",
      name: "David Miller",
      role: "ADMIN",
    },
    {
      email: "lynn@gmail.com",
      id: "f47813cf-0482-4326-afc9-12f53218ed06",
      name: "Lynn Warr",
      role: "MANAGER",
    },
  ],
};

describe("App component", () => {
  it("renders loading state first", () => {
    mockUseZellerCustomers.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(<App />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  describe("when data is loaded", () => {
    beforeEach(() => {
      mockUseZellerCustomers.mockReturnValue({
        data: { items: mockData.items },
        loading: false,
        error: null,
        refetch: vi.fn(),
      });
    });

    it("renders admin users by default", () => {
      render(<App />);

      expect(screen.getByText("Admin Users")).toBeInTheDocument();
      expect(screen.getByText("David Miller")).toBeInTheDocument();
      expect(screen.queryByText("Lynn Warr")).not.toBeInTheDocument();
    });

    it("switches to manager users when Manager filter selected", () => {
      render(<App />);

      fireEvent.click(screen.getByLabelText("Manager"));

      expect(screen.getByText("Manager Users")).toBeInTheDocument();
      expect(screen.getByText("Lynn Warr")).toBeInTheDocument();
      expect(screen.queryByText("David Miller")).not.toBeInTheDocument();
    });
  });

  it("renders error message when hook returns an error", () => {
    mockUseZellerCustomers.mockReturnValue({
      data: null,
      loading: false,
      error: "Network Error",
      refetch: vi.fn(),
    });

    render(<App />);

    expect(screen.getByText("Network Error")).toBeInTheDocument();

    fireEvent.click(screen.getByText("close"));
    expect(screen.queryByText("Network Error")).not.toBeInTheDocument();
  });
});
