package com.shinhan.hack.login.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name="student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Student {

    @Id
    @Column(name = "student_id")
    private int studentId;

    @Column(name = "password")
    private String password;

    @Column(name = "bank_number")
    private int bankNumber;

    @Column(name = "balance")
    private int balance;

    @Column(name = "phone_id")
    private String phoneId;

}
