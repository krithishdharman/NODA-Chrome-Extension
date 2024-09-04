import java.util.*;
public class Main{
    static class Course {
        private String code;
        private String title;
        private String description;
        private int capacity;
        private int enrolled;
        public Course(String code, String title, String description, int capacity) {
            this.code = code;
            this.title = title;
            this.description = description;
            this.capacity = capacity;
            this.enrolled = 0;
        }
        public String getCode() {
            return code;
        }
        public String getTitle() {
            return title;
        }
        public String getDescription() {
            return description;
        }
        public int getCapacity() {
            return capacity;
        }
        public int getAvailableSlots() {
            return capacity - enrolled;
        }
        public boolean enrollStudent() {
            if (getAvailableSlots() > 0) {
                enrolled++;
                return true;
            }
            return false;
        }
        public boolean dropStudent() {
            if (enrolled > 0) {
                enrolled--;
                return true;
            }
            return false;
        }
        @Override
        public String toString() {
            return String.format("Code: %s, Title: %s, Description: %s, Capacity: %d, Available Slots: %d",
                    code, title, description, capacity, getAvailableSlots());
        }
    }
    static class Student {
        private String id;
        private String name;
        private Set<Course> registeredCourses;
        public Student(String id, String name) {
            this.id = id;
            this.name = name;
            this.registeredCourses = new HashSet<>();
        }
        public String getId() {
            return id;
        }
        public String getName() {
            return name;
        }
        public Set<Course> getRegisteredCourses() {
            return registeredCourses;
        }
        public boolean registerForCourse(Course course) {
            if (registeredCourses.size() < 5 && course.enrollStudent()) {
                registeredCourses.add(course);
                return true;
            }
            return false;
        }
        public boolean dropCourse(Course course) {
            if (registeredCourses.remove(course)) {
                return course.dropStudent();
            }
            return false;
        }
        @Override
        public String toString() {
            return String.format("ID: %s, Name: %s", id, name);
        }
    }
    static class CourseManager {
        private Map<String, Course> courses;
        private Map<String, Student> students;
        public CourseManager() {
            courses = new HashMap<>();
            students = new HashMap<>();
        }
        public void addCourse(Course course) {
            courses.put(course.getCode(), course);
        }
        public void addStudent(Student student) {
            students.put(student.getId(), student);
        }
        public void listCourses() {
            for (Course course : courses.values()) {
                System.out.println(course);
            }
        }
        public void registerStudent(String studentId, String courseCode) {
            Student student = students.get(studentId);
            Course course = courses.get(courseCode);
            if (student != null && course != null) {
                if (student.registerForCourse(course)) {
                    System.out.println("Student registered successfully.");
                } else {
                    System.out.println("Registration failed. Course may be full or student may have reached course limit.");
                }
            } else {
                System.out.println("Invalid student ID or course code.");
            }
        }
        public void dropStudent(String studentId, String courseCode) {
            Student student = students.get(studentId);
            Course course = courses.get(courseCode);
            if (student != null && course != null) {
                if (student.dropCourse(course)) {
                    System.out.println("Course dropped successfully.");
                } else {
                    System.out.println("Drop failed. Student was not registered or course has no enrolled students.");
                }
            } else {
                System.out.println("Invalid student ID or course code.");
            }
        }
    }
    public static void main(String[] args) {
        CourseManager manager = new CourseManager();
        manager.addCourse(new Course("CS101", "Introduction to Computer Science", "Basics of programming and computer science.", 30));
        manager.addCourse(new Course("MATH101", "Calculus I", "Introduction to differential calculus.", 25));
        manager.addStudent(new Student("S001", "Kavin"));
        manager.addStudent(new Student("S002", "Raja"));
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("\nCourse Management System");
            System.out.println("1. List Courses");
            System.out.println("2. Register for Course");
            System.out.println("3. Drop Course");
            System.out.println("4. Exit");
            System.out.print("Select an option: ");
            int option = scanner.nextInt();
            scanner.nextLine(); 
            switch (option) {
                case 1:
                    manager.listCourses();
                    break;
                case 2:
                    System.out.print("Enter student ID: ");
                    String studentId = scanner.nextLine();
                    System.out.print("Enter course code: ");
                    String courseCode = scanner.nextLine();
                    manager.registerStudent(studentId, courseCode);
                    break;
                case 3:
                    System.out.print("Enter student ID: ");
                    studentId = scanner.nextLine();
                    System.out.print("Enter course code: ");
                    courseCode = scanner.nextLine();
                    manager.dropStudent(studentId, courseCode);
                    break;
                case 4:
                    System.out.println("Exiting...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid option. Try again.");
            }
        }
    }
}
