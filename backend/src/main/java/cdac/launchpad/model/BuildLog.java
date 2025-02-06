package cdac.launchpad.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class BuildLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String projectId;

    private LocalDateTime startTime;

    @Lob // Large Object for long text
    @Column(nullable = false, columnDefinition = "TEXT")
    private String logData;

    public BuildLog(String projectId, String logData) {
        this.projectId = projectId;
        this.logData = logData;
        this.startTime = LocalDateTime.now();
    }

    public BuildLog() {} // Default constructor
}

