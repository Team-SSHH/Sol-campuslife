package com.shinhan.hack.login.entity;

import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.freinds.entity.Freinds;
import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.remittance.entity.DutchPay;
import com.shinhan.hack.smartId.entity.SmartId;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity(name = "student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Student {

    @Id
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "bank_number", nullable = false)
    private Long bankNumber;

    @Column(name = "balance", nullable = false)
    private Long balance;

    @Column(name = "phone_id", nullable = false)
    private String phoneId;

    @OneToOne(mappedBy = "student")
    SmartId smartId;

    @OneToMany(mappedBy = "student")
    List<Freinds> freindsList;

    @OneToMany(mappedBy = "student")
    List<Category> categoryList;

    @OneToMany(mappedBy = "student_id")
    List<History> historyList;

    @OneToMany(mappedBy = "student")
    List<DutchPay> dutchPays;


}
