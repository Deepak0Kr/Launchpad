package cdac.launchpad.controller;

import cdac.launchpad.mailservice.MailService;
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

    @Autowired
    private MailService mailService;

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

    // Send OTP to the email
    @PostMapping("/send")
    public String sendEmail(@RequestParam String email) {
        // Generate a random OTP

        int otp = (int) Math.floor((Math.random() + 1) * 1000);

        // Save the OTP in the mail service (temporary storage)
        mailService.saveOtp(email, otp);

        // Send the OTP to the user via email
        mailService.sendEmail(email, "OTP", Integer.toString(otp));

        return "Email Sent Successfully!";
    }

    // Verify OTP
    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String email, @RequestParam int otp) {
        // Retrieve the OTP from MailService
        Integer storedOtp = mailService.getOtp(email);

        // Check if the OTP is correct
        if (storedOtp != null && storedOtp == otp) {
            // OTP verified, remove it from storage
            mailService.removeOtp(email);
            return "OTP Verified Successfully!";
        } else {
            return "Invalid OTP!";
        }
    }
}
