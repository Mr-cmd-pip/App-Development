package com.threeofakind.admin.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.threeofakind.admin.Entity.AppointmentEntity;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {
    // Add this method
    AppointmentEntity findByAppointId(Integer appointId);

    AppointmentEntity findByStudentId(Integer studentId);

    AppointmentEntity findByMeetDateAndMeetTime(String meetDate, String meetTime);

}
