import java.util.List;

record Person(String name, int age) {}

public class RecordDemo {

    public static void main(String[] args) {

        Person p1 = new Person("Hasini", 20);

        Person p2 = new Person("Sushma", 22);

        List<Person> people = List.of(p1, p2);

        people.stream()
              .filter(p -> p.age() >= 18)
              .forEach(System.out::println);
    }
}