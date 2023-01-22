import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import useTitle from '../../src/hooks/useTitle';

test('should update  title', async () => {
  const title = 'test';
  renderHook(() => useTitle(title));
  expect(document.title).toBe(title);
});
