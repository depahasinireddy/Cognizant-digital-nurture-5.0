import java.util.HashMap;
import java.util.Scanner;

public class HashMapDemo {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        HashMap<Integer, String> students =
                new HashMap<>();

        students.put(101, "Hasini");
        students.put(102, "Gayani");
        students.put(103, "Sushma");

        System.out.print("Enter ID: ");

        int id = sc.nextInt();

        System.out.println(
                "Name = " + students.get(id));

        sc.close();
    }
}