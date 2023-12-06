import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "./Registration"; // Update the import path as necessary
import { UserContext } from './UserContext'; // Update the import path as necessary

// Mock UserContext and navigation functions
const mockSetUser = jest.fn();
const mockUser = {};
const mockOnFormSwitch = jest.fn(); // Mock function for onFormSwitch


describe("Registration Component Tests", () => {
    it("renders username, password, and repeat password input fields and register button", () => {
        render(
            <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                <Register />
            </UserContext.Provider>
        );
        expect(screen.getByLabelText(/Enter Username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter Password:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Repeat Password:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    it("simulates user input and form submission", async () => {
        render(
            <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                <Register />
            </UserContext.Provider>
        );
        fireEvent.change(screen.getByLabelText(/Enter Username:/i), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByLabelText(/Enter Password:/i), { target: { value: 'newpassword123' } });
        fireEvent.change(screen.getByLabelText(/Repeat Password:/i), { target: { value: 'newpassword123' } });
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));
        // You may need to add additional assertions here depending on your implementation
    });

    it("displays error message for password mismatch", async () => {
        render(
            <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                <Register />
            </UserContext.Provider>
        );
        fireEvent.change(screen.getByLabelText(/Enter Username:/i), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByLabelText(/Enter Password:/i), { target: { value: 'newpassword123' } });
        fireEvent.change(screen.getByLabelText(/Repeat Password:/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));
        expect(await screen.findByText(/Password doesn't match/i)).toBeInTheDocument();
    });

    it("navigates from register to login page", async () => {
        render(
            <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                <Register onFormSwitch={mockOnFormSwitch} />
            </UserContext.Provider>
        );

        fireEvent.click(screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'button' && content.includes('Already have an account? Login here');
        }));

        expect(mockOnFormSwitch).toHaveBeenCalledWith('login'); // Check if the mock function was called with the correct argument
        // Additional assertions for navigation should be added here based on your routing implementation
    });
});
