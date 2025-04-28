package com.threeofakind.admin.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.threeofakind.admin.Repository.StudentRepository;
import com.threeofakind.admin.Entity.StudentEntity;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Register a new student account
    public StudentEntity registerStudent(StudentEntity student) {
        return studentRepository.save(student);
    }

    public StudentEntity findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
}
