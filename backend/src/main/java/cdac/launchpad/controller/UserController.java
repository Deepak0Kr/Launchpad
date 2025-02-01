package cdac.launchpad.controller;

import cdac.launchpad.model.User;
import cdac.launchpad.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        // Find the user by username and validate password
        User loggedInUser = null;
        if (userService.validateLogin(user)) {
            // Fetch the user details if login is successful
            loggedInUser = userService.findByUsername(user.getUsername());
        }

        // If login successful, return the user data, else return null
        return ResponseEntity.ok(loggedInUser);
    }
}
