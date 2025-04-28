package com.threeofakind.admin.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import com.threeofakind.admin.Repository.AdminRepository;
import com.threeofakind.admin.Entity.AdminEntity;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public AdminEntity login(String email, String password) {
        AdminEntity admin = adminRepository.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            return admin;
        } else {
            throw new NoSuchElementException("Invalid email or password");
        }
    }

    // Get all admins
    public List<AdminEntity> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get admin by ID
    public Optional<AdminEntity> getAdminById(Integer id) {
        return adminRepository.findById(id);
    }

    // Save new admin
    public AdminEntity saveAdmin(AdminEntity admin) {
        return adminRepository.save(admin);
    }

    // Update
    @SuppressWarnings("finally")
    public AdminEntity updateAdmin(int adminId, AdminEntity newAdminDetails) {
        AdminEntity admin = new AdminEntity();
        try {
            // 1.) Search the ID number of the admin that will be updated
            admin = adminRepository.findById(adminId).get();

            admin.setPassword(newAdminDetails.getPassword());
            admin.setEmail(newAdminDetails.getEmail());

        } catch (NoSuchElementException ex) {
            throw new NoSuchElementException("Admin " + adminId + " does not exist");
        } finally {
            return adminRepository.save(admin);
        }
    }

    // Delete admin by ID
    public void deleteAdmin(Integer id) {
        adminRepository.deleteById(id);
    }

}
