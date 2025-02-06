package cdac.launchpad.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import cdac.launchpad.model.BuildLog;

public interface BuildLogRepository extends JpaRepository<BuildLog, Long> {
    List<BuildLog> findByProjectId(String projectId);
}

