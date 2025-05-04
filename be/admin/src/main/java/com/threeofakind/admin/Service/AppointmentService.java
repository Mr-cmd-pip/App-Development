/*************  ✨ Windsurf Command ⭐  *************/
package com.threeofakind.admin.Service;

import com.threeofakind.admin.Entity.AppointmentEntity;
import com.threeofakind.admin.Repository.AppointmentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public AppointmentEntity insertAppointment(AppointmentEntity appointmentEntity) {
        return appointmentRepository.save(appointmentEntity);
    }

    public AppointmentEntity findByMeetDateAndMeetTime(String meetDate, String meetTime) {
        return appointmentRepository.findByMeetDateAndMeetTime(meetDate, meetTime);
    }

    public AppointmentEntity findByStudentId(Integer studentId) {
        return appointmentRepository.findByStudentId(studentId);
    }

    public List<AppointmentEntity> findAppointmentsOfStudent(Integer studentId) {
        List<AppointmentEntity> allAppointments = appointmentRepository.findAll();
        List<AppointmentEntity> studentAppointments = new ArrayList<>();

        for (AppointmentEntity appointment : allAppointments) {
            if (appointment.getStudentId().equals(studentId)) {
                studentAppointments.add(appointment);
            }
        }

        return studentAppointments;
    }

    public AppointmentEntity findByAppointId(Integer appointId) {
        Optional<AppointmentEntity> appointment = appointmentRepository.findById(appointId);
        return appointment.orElse(null); // Return null if appointment is not found
    }

    // Method to update the status of the appointment to "canceled"
    public void cancelAppointment(Integer appointId) {
        // Find the appointment by ID
        Optional<AppointmentEntity> appointmentOpt = appointmentRepository.findById(appointId);
        if (appointmentOpt.isPresent()) {
            AppointmentEntity appointment = appointmentOpt.get();
            // Set the status to "canceled"
            appointment.setStatus("canceled");
            // Save the updated appointment back to the repository
            appointmentRepository.save(appointment);
        }
    }

    public List<AppointmentEntity> findAllAppointments() {
        return appointmentRepository.findAll();
    }

    public void updateAppointment(AppointmentEntity appointment) {
        appointmentRepository.save(appointment);
    }

}