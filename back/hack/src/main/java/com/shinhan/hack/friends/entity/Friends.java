package com.shinhan.hack.friends.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.smartId.entity.SmartId;
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
    @JoinColumn(nullable = false, name = "category_id", referencedColumnName = "category_id")
    Category category;

    @ManyToOne
    @JoinColumn(nullable = false, name = "student_id", referencedColumnName = "student_id")
    Student student;

    @ManyToOne
    @JoinColumn(name = "friend_id")
    private Student friend;

////    @JsonIgnore
//    @ManyToOne // or @OneToOne depending on your model.
//    @JoinColumn(nullable = false, name = "smart_id", referencedColumnName = "card_id")
//    SmartId smartId;
}
