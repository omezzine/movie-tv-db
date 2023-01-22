import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DbCard from '../../src/components/dbCard';
import MockReponse from '../mocks/responseMovieApi.json';
import React from 'react';
import { Movie } from '../../src/models/movie';

const movieMock: Movie = MockReponse.results[0] as Movie;

describe('DB Card test', () => {
  test('Should render correctly', () => {
    render(<DbCard data={movieMock} type="movie" onClick={vi.fn()} />);
    expect(screen.getByText(/^The Matrix/i)).toBeDefined();
    expect(screen.getByText(/^Set in the 22nd/i)).toBeDefined();
  });
  test('Should render correctly', () => {
    const onCardClick = vi.fn();
    const { container } = render(<DbCard data={movieMock} type="movie" onClick={onCardClick} />);
    fireEvent.click(container.querySelector('.card') as HTMLElement);
    expect(onCardClick).toHaveBeenCalledWith({ id: movieMock.id, type: 'movie' });
  });
});
