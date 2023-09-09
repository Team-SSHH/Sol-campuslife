package com.shinhan.hack.login.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.remittance.entity.DutchPay;
<<<<<<< HEAD
//import com.shinhan.hack.smartId.entity.SmartId;
=======
>>>>>>> 22111be5d98afdbc7fb9116bc18601ce671e525e
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

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "university", nullable = false)
    @Builder.Default
    private String university = "건국대학교";

    @Column(name = "major", nullable = false)
    private String major;

    @Column(name = "grade", nullable = false)
    private Long grade;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "nationality", nullable = false)
    private String nationality;

    @Column(name = "bank_number", nullable = false)
    private Long bankNumber;

    @Column(name = "balance", nullable = false)
    private Long balance;

    @Column(name = "phone_id", nullable = false)
    private String phoneId;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;
}
