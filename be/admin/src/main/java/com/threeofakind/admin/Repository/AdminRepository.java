package com.threeofakind.admin.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.threeofakind.admin.Entity.AdminEntity; // Change the entity class to AdminEntity

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {

    // Custom query methods can be added here if needed
    AdminEntity findByEmail(String email);

}
