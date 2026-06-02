public class VirtualThreadDemo {

    public static void main(String[] args) {

        long startTime = System.currentTimeMillis();

        for (int i = 1; i <= 100000; i++) {

            int threadNumber = i;

            Thread.startVirtualThread(() -> {
                System.out.println("Virtual Thread " + threadNumber +
                                   " running on " +
                                   Thread.currentThread());
            });
        }

        long endTime = System.currentTimeMillis();

        System.out.println("\nTime Taken: "
                + (endTime - startTime) + " ms");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}