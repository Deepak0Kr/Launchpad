package cdac.launchpad.buildService;

import cdac.launchpad.model.Project;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class BuildService {

    // In-memory storage for build logs
    private static final Map<String, String> buildLogsStorage = new HashMap<>();

    public static void startBuilding(Project project) {
        try {
            String command = "docker run -e GIT_REPOSITORY_URL=" + project.getRepoLink() + " -e PROJECT_ID=" + project.getProjectName() + " --rm buildcont";
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

            // Store the build logs in memory
            buildLogsStorage.put(project.getProjectName(), buildLogs.toString());

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
    // Method to retrieve build logs by project ID
    public static String getBuildLogs(String projectId) {
        return buildLogsStorage.getOrDefault(projectId, "No logs found for this project.");
    }
}