package com.shinhan.hack.smartId.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.login.entity.Student;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SmartId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Long cardId;

    @OneToOne
    @JoinColumn(nullable = false, name = "student_id")
    private Student student;

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

}
