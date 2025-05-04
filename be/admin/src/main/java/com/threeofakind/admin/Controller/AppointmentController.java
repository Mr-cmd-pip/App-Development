package com.threeofakind.admin.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.threeofakind.admin.Entity.AppointmentEntity;
import com.threeofakind.admin.Service.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/insert")
    public ResponseEntity<Object> insertAppointment(@RequestBody AppointmentEntity appointmentEntity) {
        // Check if there are no conflicts with date and time
        AppointmentEntity existingAppointment = appointmentService
                .findByMeetDateAndMeetTime(appointmentEntity.getMeetDate(), appointmentEntity.getMeetTime());
        if (existingAppointment != null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Appointment already exists", "status", "error"));
        }
        return new ResponseEntity<>(appointmentService.insertAppointment(appointmentEntity), HttpStatus.CREATED);
    }

    @PostMapping("/getAllAppointmentOfStudent/{studentId}")
    public ResponseEntity<Object> getAllAppointmentOfStudent(@PathVariable Integer studentId) {
        return new ResponseEntity<>(appointmentService.findAppointmentsOfStudent(studentId), HttpStatus.OK);
    }

    @PutMapping("/cancelAppointment/{appointId}")
    public ResponseEntity<Object> cancelAppointment(@PathVariable Integer appointId) {
        AppointmentEntity appointment = appointmentService.findByAppointId(appointId);
        if (appointment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Appointment not found", "status", "error"));
        }

        // Update the status to "canceled"
        appointmentService.cancelAppointment(appointId);

        return ResponseEntity.ok(Map.of("message", "Appointment canceled successfully", "status", "success"));
    }

    @PostMapping("/getAllAppointments")
    public ResponseEntity<Object> getAllAppointments() {
        return new ResponseEntity<>(appointmentService.findAllAppointments(), HttpStatus.OK);
    }

    @PutMapping("/approveAppointment/{appointId}")
    public ResponseEntity<Object> approveAppointment(@PathVariable Integer appointId) {
        AppointmentEntity appointment = appointmentService.findByAppointId(appointId);
        if (appointment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Appointment not found", "status", "error"));
        }

        // Update the status to "approved"
        appointment.setStatus("approved");

        appointmentService.updateAppointment(appointment);

        return ResponseEntity.ok(Map.of("message", "Appointment approved successfully", "status", "success"));
    }

    @PutMapping("/declineAppointment/{appointId}")
    public ResponseEntity<Object> declineAppointment(@PathVariable Integer appointId) {
        AppointmentEntity appointment = appointmentService.findByAppointId(appointId);
        if (appointment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Appointment not found", "status", "error"));
        }

        // Update the status to "approved"
        appointment.setStatus("declined");

        appointmentService.updateAppointment(appointment);

        return ResponseEntity.ok(Map.of("message", "Appointment declined successfully", "status", "success"));
    }

    @PutMapping("/rescheduleAppointment/{appointId}")
    public ResponseEntity<Object> rescheduleAppointment(
            @PathVariable Integer appointId,
            @RequestBody Map<String, String> requestData) {

        AppointmentEntity appointment = appointmentService.findByAppointId(appointId);
        if (appointment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Appointment not found", "status", "error"));
        }

        String newDate = requestData.get("meetDate");
        String newTime = requestData.get("meetTime");

        // Check if the new date/time is already taken
        AppointmentEntity existingAppointment = appointmentService.findByMeetDateAndMeetTime(newDate, newTime);
        if (existingAppointment != null && !existingAppointment.getAppointId().equals(appointId)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Time slot already taken", "status", "error"));
        }

        // Update fields
        appointment.setMeetDate(newDate);
        appointment.setMeetTime(newTime);
        appointment.setStatus("approved");

        appointmentService.updateAppointment(appointment);

        return ResponseEntity.ok(Map.of("message", "Appointment rescheduled successfully", "status", "success"));
    }

}
