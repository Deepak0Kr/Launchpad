package cdac.launchpad.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectType;

    @Column(unique = true)
    private String projectName;
    private String repoLink;
    private Long userId;
}
