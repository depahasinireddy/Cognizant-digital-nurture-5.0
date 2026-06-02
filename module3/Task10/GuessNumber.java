import java.util.Random;
import java.util.Scanner;

public class GuessNumber {

    public static void main(String[] args) {

        Random random = new Random();

        int target = random.nextInt(100) + 1;

        Scanner sc = new Scanner(System.in);

        int guess = 0;

        while(guess != target) {

            System.out.print("Enter guess: ");

            guess = sc.nextInt();

            if(guess > target) {

                System.out.println("Too High");

            } else if(guess < target) {

                System.out.println("Too Low");

            } else {

                System.out.println("Correct!");
            }
        }

        sc.close();
    }
}