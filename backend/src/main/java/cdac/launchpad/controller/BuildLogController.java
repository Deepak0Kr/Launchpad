package cdac.launchpad.controller;

import cdac.launchpad.buildService.BuildService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buildlogs")
@CrossOrigin(origins = "http://localhost:5173")
public class BuildLogController {

    @GetMapping("/{buildId}")
    public String getBuildLogs(@PathVariable String buildId) {
        return BuildService.getBuildLogs(buildId); // Fetch logs from memory or file
    }
}