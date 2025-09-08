import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CarCard from '../Components/CarCard'

vi.mock('../utils/avatarGenerator', () => ({
  generateAvatarSVG: vi.fn(() => 'image/svg+xml;base64,PHN2Zy4uLg==')
}));

describe('CarCard Component', () => {
  const mockCar = {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 25000,
    color: 'White',
    imageUrl: 'https://avatars.dzeninfra.ru/get-zen_doc/2262910/pub_5f67c133b142594c53f9d8a7_5f67c242b142594c53fae2f0/scale_1200'
  };

  it('renders car information correctly', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('25000 ₽')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('displays placeholder when no image provided', () => {
    const carWithoutImage = { ...mockCar, imageUrl: undefined };
    render(<CarCard car={carWithoutImage} />);
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
  });

  it('formats price correctly with currency symbol', () => {
    render(<CarCard car={mockCar} />);
    const priceElement = screen.getByText('25000 ₽');
    expect(priceElement).toBeInTheDocument();
  });
});
