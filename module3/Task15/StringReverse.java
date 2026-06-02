import java.util.Scanner;

public class StringReverse {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter string: ");

        String input = sc.nextLine();

        StringBuilder sb = new StringBuilder(input);

        System.out.println("Reversed = " + sb.reverse());

        sc.close();
    }
}