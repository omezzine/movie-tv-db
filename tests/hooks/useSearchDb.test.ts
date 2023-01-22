import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useSearchDb } from '../../src/hooks/useSearchDb';
import MockReponse from '../mocks/responseMovieApi.json';

const mockedUsedNavigate = vi.fn();
const mockUsedSearchParams = vi.fn();
vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios');
  return {
    ...actual,
    default: {
      get: () => Promise.resolve({ data: MockReponse }),
    },
  };
});

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
  useSearchParams: () => [new URLSearchParams(), mockUsedSearchParams],
}));

test('should search db', async () => {
  const query = { query: 'search text', type: 'tv', page: '1' };
  const { result } = renderHook(() => useSearchDb({ apiKey: 'my_api_key', debounce: 1 }));

  expect(result.current.query.type).toBe('movie');
  act(() => {
    result.current.updateQuery(query as any);
  });

  await waitFor(() => expect(result.current.data).toBeDefined());
  expect(result.current.data?.count).toEqual(77);
  expect(result.current.data?.page).toEqual(1);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.query).toStrictEqual(query);
});

test('should reset data when empty', () => {
  const { result } = renderHook(() => useSearchDb({ apiKey: 'my_api_key', debounce: 1 }));

  expect(result.current.query.type).toBe('movie');
  act(() => {
    result.current.updateQuery({ query: '' });
  });
  expect(result.current.data).toBe(null);
});
