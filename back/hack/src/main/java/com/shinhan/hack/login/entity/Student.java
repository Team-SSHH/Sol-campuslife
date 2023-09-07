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
    private Long studentId;

    @Column(name = "password")
    private String password;

    @Column(name = "bank_number")
    private Long bankNumber;

    @Column(name = "balance")
    private Long balance;

    @Column(name = "phone_id")
    private String phoneId;

}
