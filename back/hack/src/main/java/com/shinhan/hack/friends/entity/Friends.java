package com.shinhan.hack.friends.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.login.entity.Student;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Friends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_id")
    private Long fId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(nullable = false, name = "category_id")
    Category category;


    @Column(name = "freind_id")
    private Long friendId;
}
