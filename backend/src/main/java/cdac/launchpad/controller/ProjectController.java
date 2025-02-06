package cdac.launchpad.controller;

import cdac.launchpad.buildService.BuildService;
import cdac.launchpad.model.Project;
import cdac.launchpad.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private BuildService buildService;

    @PostMapping("/createProject")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        System.out.println(project);
        Project createdProject = projectService.createProject(project);
        return ResponseEntity.ok(createdProject);
    }

    @GetMapping("/getProject/{projectName}")
    public ResponseEntity<Project> getProject(@PathVariable String projectName) {
        System.out.println(projectName);
        Project project = projectService.getProjectByName(projectName);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/getProjects/{userId}")
    public ResponseEntity<List<Project>> getAllProject(@PathVariable Long userId) {
        List<Project> projects = projectService.getAllProjectByUserId(userId);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/getBuildLogs/{projectName}")
    public ResponseEntity<String> getBuildLogs(@PathVariable String projectName) {
        String logs = buildService.getBuildLogs(projectName);
        return ResponseEntity.ok(logs);
    }

    @PostMapping("/startBuild/{projectID}")
    public ResponseEntity<String> startBuild(@PathVariable Long projectID) {
        Project project = projectService.getProjectByID(projectID);
        buildService.startBuilding(project); // Start the build process
        return ResponseEntity.ok("build");
    }

    @DeleteMapping("/deleteProject/{projectID}")
    public ResponseEntity<Project> deleteProject(@PathVariable Long projectID) {
        return ResponseEntity.ok(projectService.deletProject(projectID));
    }
}
