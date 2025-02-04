package cdac.launchpad.mailservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    // A simple Map to store OTPs temporarily
    private Map<String, Integer> otpStore = new HashMap<>();

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("deamonking05042002@gmail.com");

        mailSender.send(message);
    }

    // Save OTP for a given email
    public void saveOtp(String email, int otp) {
        otpStore.put(email, otp);
    }

    // Get OTP for a given email
    public Integer getOtp(String email) {
        return otpStore.get(email);
    }

    // Remove OTP after verification
    public void removeOtp(String email) {
        otpStore.remove(email);
    }
}
