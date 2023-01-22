import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useDetailDb } from '../../src/hooks/useDetailDb';
import MockReponse from '../mocks/responseMovieApi.json';

const mockedUsedNavigate = vi.fn();
const mockUsedSearchParams = vi.fn();
vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios');
  return {
    ...actual,
    default: {
      get: () => Promise.resolve({ data: MockReponse.results[0] }),
    },
  };
});

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
  useSearchParams: () => [new URLSearchParams(), mockUsedSearchParams],
}));

test('should search details db', async () => {
  const { result } = renderHook(() => useDetailDb({ apiKey: 'my_api_key', id: '1', type: 'movie' }));
  await waitFor(() => expect(result.current.data).toBeDefined());
  expect(result.current.data).toStrictEqual(MockReponse.results[0]);
});
