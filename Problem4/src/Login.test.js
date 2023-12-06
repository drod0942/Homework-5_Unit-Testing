
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login.jsx"; // Update the import path as necessary
import { UserContext } from './UserContext'; // Update the import path as necessary


const mockSetUser = jest.fn(); // Mock the setUser function
const mockUser = {}; // Replace with a mock user object as needed

describe("Login Component Tests", () => {
    it("renders username and password input fields and login button", () => {
        render(
            <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                <Login />
            </UserContext.Provider>
        );
        expect(screen.getByLabelText(/Enter Username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter Password:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    it("simulates user input and form submission", async () => {
        render(
            <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                <Login />
            </UserContext.Provider>
        );
        fireEvent.change(screen.getByLabelText(/Enter Username:/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Enter Password:/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));
        // You may need to add additional assertions here depending on your implementation
    });

    it("displays error message for incorrect password", async () => {
        render(
            <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                <Login />
            </UserContext.Provider>
        );
        fireEvent.change(screen.getByLabelText(/Enter Username:/i), { target: { value: 'alNora' } });
        fireEvent.change(screen.getByLabelText(/Enter Password:/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));
        expect(await screen.findByText(/Password does not match/i)).toBeInTheDocument();
    });
});