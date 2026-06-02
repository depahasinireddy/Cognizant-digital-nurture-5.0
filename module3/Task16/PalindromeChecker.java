import java.util.Scanner;

public class PalindromeChecker {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter string: ");

        String input = sc.nextLine();

        input = input.replaceAll("[^a-zA-Z0-9]", "")
                     .toLowerCase();

        String reversed =
                new StringBuilder(input).reverse().toString();

        if(input.equals(reversed)) {

            System.out.println("Palindrome");

        } else {

            System.out.println("Not Palindrome");
        }

        sc.close();
    }
}