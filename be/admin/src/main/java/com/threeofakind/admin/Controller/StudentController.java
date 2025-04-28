package com.threeofakind.admin.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.threeofakind.admin.Entity.StudentEntity;
import com.threeofakind.admin.Service.StudentService;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerStudent(@RequestBody StudentEntity student) {
        StudentEntity existingStudent = studentService.findByEmail(student.getEmail());
        if (existingStudent != null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists", "status", "error"));
        }
        return ResponseEntity.ok(studentService.registerStudent(student));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginStudent(@RequestBody StudentEntity student) {
        StudentEntity existingStudent = studentService.findByEmail(student.getEmail());
        if (existingStudent == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is not registered", "status", "error"));
        }
        if (!student.getPassword().equals(existingStudent.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid password", "status", "error"));
        }
        return ResponseEntity.ok(existingStudent);
    }

    @PostMapping("/updateProfile")
    public ResponseEntity<Object> updateProfile(@RequestBody Map<String, String> updateRequest) {
        String email = updateRequest.get("email");
        String newPassword = updateRequest.get("newPassword");

        StudentEntity existingStudent = studentService.findByEmail(email);
        if (existingStudent == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is not registered", "status", "error"));
        }

        existingStudent.setPassword(newPassword);
        studentService.registerStudent(existingStudent);

        return ResponseEntity.ok(Map.of("message", "Password updated successfully", "status", "success"));
    }

}
