import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class InsertUpdateDemo {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/college";
        String username = "root";
        String password = "root123"; // Replace with your MySQL password

        try {

            Connection con =
                    DriverManager.getConnection(
                            url,
                            username,
                            password);

            System.out.println("Database Connected");

            // INSERT
            String insertQuery =
                    "INSERT INTO students(id,name) VALUES(?,?)";

            PreparedStatement insertPs =
                    con.prepareStatement(insertQuery);

            insertPs.setInt(1, 5);
            insertPs.setString(2, "Hasini");

            int insertRows = insertPs.executeUpdate();

            System.out.println(
                    insertRows + " row inserted");

            // UPDATE
            String updateQuery =
                    "UPDATE students SET name=? WHERE id=?";

            PreparedStatement updatePs =
                    con.prepareStatement(updateQuery);

            updatePs.setString(1, "Hasini Devi");
            updatePs.setInt(2, 4);

            int updateRows = updatePs.executeUpdate();

            System.out.println(
                    updateRows + " row updated");

            con.close();

            System.out.println("Connection Closed");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}