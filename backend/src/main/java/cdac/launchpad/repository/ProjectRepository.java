package cdac.launchpad.repository;

import cdac.launchpad.model.Project;
import cdac.launchpad.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findByProjectName(String projectName);
}
