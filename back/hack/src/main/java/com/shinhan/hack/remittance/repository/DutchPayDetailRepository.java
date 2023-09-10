package com.shinhan.hack.remittance.repository;

import com.shinhan.hack.remittance.entity.DutchPayDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DutchPayDetailRepository extends JpaRepository<DutchPayDetail, Long> {

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE DutchPayDetail d SET d.remittanceState = true where d.friendId = :studentId and d.dutchPay.dutchId = :dutchId ")
    void dutchDetailStateUpdate(Long studentId, Long dutchId);
}
