// features/csvAnalysis/api/fetchAggregate.ts
import { API_BASE_URL } from '../../../shared/api/config';

type FetchAggregateParams = {
  file: File;
  rows: number;
  onChunk: (json: unknown) => void;
};

export async function fetchAggregate({ file, onChunk }: FetchAggregateParams): Promise<void> {
  const query = new URLSearchParams({ rows: "10000" });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/aggregate?${query.toString()}`, {
      method: 'POST',
      body: formData,
    });

    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      if (contentType?.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.message || 'Server error');
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is empty');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex;
      while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);

        if (line) {
          try {
            const json = JSON.parse(line);
            onChunk(json);
          } catch (e) {
            console.warn('Invalid JSON chunk:', line);
          }
        }
      }
    }

    const final = buffer.trim();
    if (final) {
      try {
        const json = JSON.parse(final);
        onChunk(json);
      } catch (e) {
        console.warn('Final chunk JSON parse error:', final);
      }
    }
  } catch (err) {
    console.error('fetchAggregate error:', err);
    throw new Error(err instanceof Error ? err.message : 'Unknown error during aggregation');
  }
}
