package cdac.launchpad.controller;

import cdac.launchpad.buildService.BuildService;
import cdac.launchpad.model.Project;
import cdac.launchpad.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/createProject")
    public ResponseEntity<Map<String, String>> createProject(@RequestBody Project project) {
        System.out.println(project);
        Project createdProject = projectService.createProject(project);
        BuildService.startBuilding(createdProject); // Start the build process
        Map<String, String> response = new HashMap<>();
        response.put("id", createdProject.getProjectName()); // Use project name as ID
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getProject/{projectName}")
    public ResponseEntity<Project> getProject(@PathVariable String projectName) {
        System.out.println(projectName);
        Project project = projectService.getProjectByName(projectName);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/getBuildLogs/{projectName}")
    public ResponseEntity<String> getBuildLogs(@PathVariable String projectName) {
        String logs = BuildService.getBuildLogs(projectName);
        return ResponseEntity.ok(logs);
    }
}
