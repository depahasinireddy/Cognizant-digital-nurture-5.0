import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JdbcSelectDemo {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/college";
        String username = "root";
        String password = "root123";

        try {

            Connection con =
                    DriverManager.getConnection(
                            url,
                            username,
                            password);

            System.out.println("Database Connected Successfully");

            Statement st = con.createStatement();

            ResultSet rs =
                    st.executeQuery(
                            "SELECT * FROM students");

            while (rs.next()) {

                int id = rs.getInt("id");
                String name = rs.getString("name");

                System.out.println(id + " " + name);
            }

            con.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}