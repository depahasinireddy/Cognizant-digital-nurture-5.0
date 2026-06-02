import java.util.concurrent.*;

public class ExecutorCallableDemo {

    public static void main(String[] args) {

        ExecutorService executor =
                Executors.newFixedThreadPool(3);

        Callable<Integer> task1 = () -> {
            return 10 * 10;
        };

        Callable<Integer> task2 = () -> {
            return 20 * 20;
        };

        Callable<Integer> task3 = () -> {
            return 30 * 30;
        };

        try {

            Future<Integer> result1 =
                    executor.submit(task1);

            Future<Integer> result2 =
                    executor.submit(task2);

            Future<Integer> result3 =
                    executor.submit(task3);

            System.out.println("Result 1: "
                    + result1.get());

            System.out.println("Result 2: "
                    + result2.get());

            System.out.println("Result 3: "
                    + result3.get());

        } catch (Exception e) {
            e.printStackTrace();
        }

        executor.shutdown();
    }
}