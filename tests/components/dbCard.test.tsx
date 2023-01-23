import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DbCard from '../../src/components/dbCard';
import MockReponse from '../mocks/responseMovieApi.json';
import React from 'react';
import { Movie } from '../../src/models/movie';
import renderer from 'react-test-renderer';

const movieMock: Movie = MockReponse.results[0] as Movie;

describe('DB Card test', () => {
  test('Should match snapshot', () => {
    const dbCard = renderer.create(<DbCard data={movieMock} type="movie" onClick={vi.fn()} />).toJSON();
    expect(dbCard).toMatchSnapshot();
  });

  test('Should render correctly', () => {
    render(<DbCard data={movieMock} type="movie" onClick={vi.fn()} />);
    expect(screen.getByText(/^The Matrix/i)).toBeDefined();
    expect(screen.getByText(/^Set in the 22nd/i)).toBeDefined();
  });

  test('Should render empty image if no image available', () => {
    const movieMockwithoutiMage: Movie = MockReponse.results[1] as Movie;
    const { container } = render(<DbCard data={movieMockwithoutiMage} type="movie" onClick={vi.fn()} />);
    expect(container.querySelector('img')?.getAttribute('src')).toContain('No-Image-Placeholder.svg.png');
  });

  test('Should call callback when clicked', () => {
    const onCardClick = vi.fn();
    const { container } = render(<DbCard data={movieMock} type="movie" onClick={onCardClick} />);
    fireEvent.click(container.querySelector('.card') as HTMLElement);
    expect(onCardClick).toHaveBeenCalledWith({ id: movieMock.id, type: 'movie' });
  });
});
