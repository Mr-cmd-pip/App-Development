package com.threeofakind.admin.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.threeofakind.admin.Entity.DailyLimitEntity;

import org.springframework.web.bind.annotation.*;
import com.threeofakind.admin.Service.DailyLimitService;

@RestController
@RequestMapping("/dailyLimit")
@CrossOrigin(origins = "http://localhost:3000")
public class DailyLimitController {
    @Autowired
    private DailyLimitService dailyLimitService;

    @PostMapping("/insert")
    public ResponseEntity<Object> insert(@RequestBody DailyLimitEntity request) {
        return ResponseEntity.ok(dailyLimitService.insert(request.getDailylimit()));
    }

    @PutMapping("/update/{dailylimitid}")
    public ResponseEntity<Object> update(@PathVariable Integer dailylimitid, @RequestBody DailyLimitEntity request) {
        return ResponseEntity.ok(dailyLimitService.update(dailylimitid, request.getDailylimit()));
    }

    @GetMapping("/get")
    public ResponseEntity<Object> get() {
        return ResponseEntity.ok(dailyLimitService.findAll());
    }

}
