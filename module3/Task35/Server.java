import java.net.ServerSocket;
import java.net.Socket;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Server {

    public static void main(String[] args) {

        try {

            ServerSocket server =
                    new ServerSocket(5000);

            System.out.println(
                    "Server Started...");

            System.out.println(
                    "Waiting for Client...");

            Socket socket =
                    server.accept();

            BufferedReader br =
                    new BufferedReader(
                            new InputStreamReader(
                                    socket.getInputStream()));

            String message =
                    br.readLine();

            System.out.println(
                    "Client Message: "
                    + message);

            socket.close();
            server.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}