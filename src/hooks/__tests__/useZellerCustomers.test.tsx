import { renderHook, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { generateClient } from "aws-amplify/api";
import { useZellerCustomers } from "../useZellerCustomers.ts";

vi.mock("aws-amplify/api", () => {
  const mockGraphql = vi.fn();
  return {
    generateClient: vi.fn(() => ({
      graphql: mockGraphql,
    })),
  };
});

const mockGraphql =
  (generateClient as any).mock.results?.[0]?.value?.graphql || vi.fn();

describe("useZellerCustomers hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch list of zeller customers", async () => {
    const mockData = {
      data: {
        listZellerCustomers: {
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
        },
      },
    };

    mockGraphql.mockResolvedValueOnce(mockData);
    const { result } = renderHook(() => useZellerCustomers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData.data.listZellerCustomers);
    expect(result.current.error).toBe(null);
  });

  it("should handle errors correctly", async () => {
    mockGraphql.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useZellerCustomers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.data).toBe(null);
  });
});
