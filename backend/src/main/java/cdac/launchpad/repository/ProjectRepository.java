package cdac.launchpad.repository;

import cdac.launchpad.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findByProjectName(String projectName);

    List<Project> getAllByUserId(Long userId);
}
