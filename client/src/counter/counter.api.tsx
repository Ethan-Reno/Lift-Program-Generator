// A mock function to mimic making an async request for data
interface FetchCountResponse {
  data: number;
}

export function fetchCount(amount = 1): Promise<FetchCountResponse> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}