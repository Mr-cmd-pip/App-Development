package com.threeofakind.admin.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.threeofakind.admin.Entity.DailyLimitEntity;

@Repository
public interface DailyLimitRepository extends JpaRepository<DailyLimitEntity, Integer> {

}
