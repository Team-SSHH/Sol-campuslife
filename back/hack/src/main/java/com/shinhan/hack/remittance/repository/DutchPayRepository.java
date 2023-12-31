package com.shinhan.hack.remittance.repository;

import com.shinhan.hack.remittance.dto.DutchPayDetailDto;
import com.shinhan.hack.remittance.entity.DutchPay;
import com.shinhan.hack.remittance.entity.DutchPayDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DutchPayRepository extends JpaRepository<DutchPay, Long> {
    @Query(value = "SELECT d from DutchPay d where d.student.studentId = :studentId")
    List<DutchPay> findByStudentId(Long studentId);

    @Query(value = "SELECT d from DutchPayDetail d WHERE d.dutchPay.dutchId = :dutchId")
    List<DutchPayDetail> findByDutchId(Long dutchId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE DutchPay d SET d.dutchState = :state WHERE d.dutchId = :dutchId")
    void stateUpdate(Long dutchId, boolean state);
}
