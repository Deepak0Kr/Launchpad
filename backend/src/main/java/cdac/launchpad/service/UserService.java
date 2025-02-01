package cdac.launchpad.service;

import cdac.launchpad.model.User;
import cdac.launchpad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    public User registerUser(User user) {
        // Add validation logic here if needed
        return userRepository.save(user);
    }

    // Find a user by username
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Validate login credentials
    public boolean validateLogin(User user) {
        // Find the user by username
        User existingUser = userRepository.findByUsername(user.getUsername());

        // If user exists, compare passwords (in plain text)
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return true; // Login successful
        }
        return false; // Invalid credentials
    }
}
