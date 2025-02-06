package cdac.launchpad.controller;

import cdac.launchpad.buildService.BuildService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buildlogs")
@CrossOrigin(origins = "http://localhost:5173")
public class BuildLogController {

    private final BuildService buildService;

    public BuildLogController(BuildService buildService) {
        this.buildService = buildService;
    }

    @GetMapping("/{buildId}")
    public String getBuildLogs(@PathVariable String buildId) {
        return buildService.getBuildLogs(buildId);
    }

//    @GetMapping("/{buildId}")
//    public String getBuildLogs(@PathVariable String buildId) {
//        return BuildService.getBuildLogs(buildId); // Fetch logs from memory or file
//    }
}