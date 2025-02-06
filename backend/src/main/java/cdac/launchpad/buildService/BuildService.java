package cdac.launchpad.buildService;

import cdac.launchpad.model.Project;
import cdac.launchpad.model.BuildLog;
import cdac.launchpad.repository.BuildLogRepository;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class BuildService {

    private final BuildLogRepository buildLogRepository;

    public BuildService(BuildLogRepository buildLogRepository) {
        this.buildLogRepository = buildLogRepository;
    }

    public void startBuilding(Project project) {
        try {
            String command = "docker run -e GIT_REPOSITORY_URL=" + project.getRepoLink() +
                    " -e PROJECT_ID=" + project.getProjectName() + " --rm buildcont";
            ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", command);
            builder.redirectErrorStream(true);
            Process process = builder.start();

            // Read the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder buildLogs = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                buildLogs.append(line).append("\n");
                System.out.println(line); // Optional: Print to console
            }

            int exitCode = process.waitFor();
            System.out.println("Exit Code: " + exitCode);

            // Save logs to the database
            BuildLog buildLog = new BuildLog(project.getProjectName(), buildLogs.toString());
            buildLogRepository.save(buildLog);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public String getBuildLogs(String projectId) {
        return buildLogRepository.findByProjectId(projectId)
                .stream()
                .map(BuildLog::getLogData)
                .reduce("", (logs1, logs2) -> logs1 + "\n" + logs2);
    }
}
