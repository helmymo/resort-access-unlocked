import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '@/components/Auth/RegisterForm';

// Mock next/router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe('RegisterForm', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockPush.mockClear();
  });

  it('renders all form fields and submit button', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows error for invalid email format', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows error for weak password', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'weak' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'weak' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows error if passwords do not match', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123' } }); // Different password
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits form and redirects on successful registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'Password123!' }),
    });
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/login'));
  });

  it('shows API error message on failed registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'User already exists' }),
    });

    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/user already exists/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

   it('shows generic error message if API error has no message', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}), // No message property
    });

    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows generic error message on network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
