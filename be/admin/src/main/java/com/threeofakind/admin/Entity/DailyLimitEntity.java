package com.threeofakind.admin.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_daily_limit")
public class DailyLimitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dailylimitid")
    private Integer dailylimitid;

    @Column(name = "dailylimit")
    private Integer dailylimit;

    public Integer getDailylimitid() {
        return dailylimitid;
    }

    public DailyLimitEntity() {
    }

    public void setDailylimitid(Integer dailylimitid) {
        this.dailylimitid = dailylimitid;
    }

    public Integer getDailylimit() {
        return dailylimit;
    }

    public void setDailylimit(Integer dailylimit) {
        this.dailylimit = dailylimit;
    }

}
