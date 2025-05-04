package com.threeofakind.admin.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threeofakind.admin.Entity.DailyLimitEntity;
import com.threeofakind.admin.Repository.DailyLimitRepository;

@Service
public class DailyLimitService {

    @Autowired
    private DailyLimitRepository dailyLimitRepository;

    public DailyLimitEntity insert(Integer dailylimit) {
        DailyLimitEntity dailyLimitEntity = new DailyLimitEntity();
        dailyLimitEntity.setDailylimit(dailylimit);
        return dailyLimitRepository.save(dailyLimitEntity);
    }

    public DailyLimitEntity update(Integer dailylimitid, Integer dailyLimit) {
        DailyLimitEntity Dail = dailyLimitRepository.findById(dailylimitid).get();
        Dail.setDailylimit(dailyLimit);
        return dailyLimitRepository.save(Dail);
    }

    public Iterable<DailyLimitEntity> findAll() {
        return dailyLimitRepository.findAll();
    }

}
