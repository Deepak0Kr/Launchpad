package cdac.launchpad.service;

import cdac.launchpad.buildService.BuildService;
import cdac.launchpad.model.Project;
import cdac.launchpad.model.User;
import cdac.launchpad.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project) {
        // Add validation logic here if needed
        Project saveProject = projectRepository.save(project);

        return saveProject;
    }

    public Project getProjectByName(String projectName) {
        // Add validation logic here if needed
        return projectRepository.findByProjectName(projectName);
    }

    public List<Project> getAllProjectByUserId(Long userId) {
        // Add validation logic here if needed
        return projectRepository.getAllByUserId(userId);
    }


}
