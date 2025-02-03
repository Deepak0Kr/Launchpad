package cdac.launchpad.buildService;

import cdac.launchpad.model.Project;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class BuildService {

    public static void startBuilding(Project project){
        try {
            String command = "docker run -e GIT_REPOSITORY_URL="+project.getRepoLink()+" -e PROJECT_ID="+project.getProjectName()+" --rm buildcont";
            ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", command); // Replace "dir" with your command
            builder.redirectErrorStream(true);
            Process process = builder.start();

            // Read the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            System.out.println("Exit Code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

}
