import java.net.Socket;
import java.io.PrintWriter;

public class Client {

    public static void main(String[] args) {

        try {

            Socket socket =
                    new Socket(
                            "localhost",
                            5000);

            PrintWriter pw =
                    new PrintWriter(
                            socket.getOutputStream(),
                            true);

            pw.println("Hello Server");

            System.out.println(
                    "Message Sent");

            socket.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}