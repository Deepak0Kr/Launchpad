package cdac.launchpad.controller;

import cdac.launchpad.model.Project;
import cdac.launchpad.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/createProject")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        System.out.println(project);
        projectService.createProject(project);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/getProject/{projectName}")
    public ResponseEntity<Project> getProject(@PathVariable String projectName) {
        System.out.println(projectName);
        Project project = projectService.getProjectByName(projectName);
        return ResponseEntity.ok(project);
    }
}
