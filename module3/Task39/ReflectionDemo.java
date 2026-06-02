import java.lang.reflect.Method;

public class ReflectionDemo {

    public static void main(String[] args) {

        try {

            Class<?> cls = Class.forName("Student");

            System.out.println("Class Name: " + cls.getName());

            Method[] methods = cls.getDeclaredMethods();

            System.out.println("\nMethods Available:");

            for (Method m : methods) {
                System.out.println(m.getName());
            }

            Object obj = cls.getDeclaredConstructor().newInstance();

            Method method1 = cls.getMethod("show");
            method1.invoke(obj);

            Method method2 = cls.getMethod("display", int.class);
            method2.invoke(obj, 101);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}