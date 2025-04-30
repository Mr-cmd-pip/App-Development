package com.threeofakind.admin.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.threeofakind.admin.Entity.AdminEntity;
import com.threeofakind.admin.Service.AdminService;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AdminEntity> login(@RequestBody AdminEntity loginRequest) {
        try {
            AdminEntity loggedInAdmin = adminService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(loggedInAdmin);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
    }

    // Get all admins
    @GetMapping
    public List<AdminEntity> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Get admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdminEntity> getAdminById(@PathVariable Integer id) {
        Optional<AdminEntity> admin = adminService.getAdminById(id);
        return admin.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new admin
    @PostMapping
    public AdminEntity createAdmin(@RequestBody AdminEntity admin) {
        return adminService.saveAdmin(admin);
    }

    // Update an admin
    @PutMapping("/{id}")
    public ResponseEntity<AdminEntity> updateAdmin(@PathVariable Integer id, @RequestBody AdminEntity newAdminDetails) {
        try {
            AdminEntity updatedAdmin = adminService.updateAdmin(id, newAdminDetails);
            return ResponseEntity.ok(updatedAdmin);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an admin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

}
