import java.util.ArrayList;
import java.util.Collections;

public class LambdaDemo {

    public static void main(String[] args) {

        ArrayList<String> names =
                new ArrayList<>();

        names.add("Hasini");
        names.add("Rishi");
        names.add("Varshini");

        Collections.sort(names,
                (a, b) -> a.compareTo(b));

        System.out.println(names);
    }
}