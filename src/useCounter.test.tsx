import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useCounter } from './useCounter';

describe('useCounter test', () => {
  it('increment count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('decrement count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(-1);
  });
});
