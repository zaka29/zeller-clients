import { useState, useEffect } from "react";
import { ListZellerCustomers } from "../graphql/queries.ts";
import { generateClient } from "aws-amplify/api";

export type ZellerCustomer = {
  email: string;
  id: string;
  name: string;
  role: string;
};

type ListZellerCustomersResponse = {
  items: ZellerCustomer[];
};

type Result = {
  data: ListZellerCustomersResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const client = generateClient();

export function useZellerCustomers(): Result {
  const [data, setData] = useState<ListZellerCustomersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchZellerCustomers = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await client.graphql<ListZellerCustomersResponse>({
        query: ListZellerCustomers,
      });

      if ("errors" in result && result.errors?.length) {
        const message = result.errors.map((e) => e.message).join(", ");
        throw new Error(message);
      }

      if ("data" in result && result.data?.listZellerCustomers) {
        setData(result.data.listZellerCustomers);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "errors" in err && Array.isArray(err.errors)
            ? err.errors.map((e) => e.message).join(", ")
            : "Failed to fetch customers";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchZellerCustomers();
  }, []);

  return { data, loading, error, refetch: fetchZellerCustomers };
}
