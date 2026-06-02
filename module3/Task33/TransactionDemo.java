import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class TransactionDemo {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/college";
        String user = "root";
        String password = "root123";

        try {

            Connection con =
                    DriverManager.getConnection(
                            url,
                            user,
                            password);

            // Start transaction
            con.setAutoCommit(false);

            // Remove 1000 from Account 1
            PreparedStatement debit =
                    con.prepareStatement(
                    "UPDATE accounts SET balance = balance - 1000 WHERE id = 1");

            // Add 1000 to Account 2
            PreparedStatement credit =
                    con.prepareStatement(
                    "UPDATE accounts SET balance = balance + 1000 WHERE id = 2");

            debit.executeUpdate();
            credit.executeUpdate();

            // Save changes
            con.commit();

            System.out.println("Transaction Successful");

            con.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}