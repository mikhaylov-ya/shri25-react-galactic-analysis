import { API_BASE_URL } from "../../../shared/api/config";

type FetchReportParams = {
  size: number;
  withErrors?: 'on' | 'off';
  maxSpend?: string;
};

export const fetchReport = async (params: FetchReportParams): Promise<Blob> => {
  const { size, withErrors = 'off', maxSpend = '1000' } = params;

  const query = new URLSearchParams({
    size: size.toString(),
    withErrors,
    maxSpend,
  });

  try {
    const response = await fetch(`${API_BASE_URL}/report?${query.toString()}`, {
      method: 'GET',
    });

    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      if (contentType?.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.message || 'Unknown server error');
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (contentType?.includes('text/csv') || contentType?.includes('application/octet-stream')) {
      return await response.blob();
    } else {
      throw new Error(`Unexpected response type ${contentType}`);
    }
  } catch (err) {
    console.error('fetchReport error:', err);
    throw new Error(
      err instanceof Error ? err.message : 'Unexpected error during fetchReport'
    );
  }
}
