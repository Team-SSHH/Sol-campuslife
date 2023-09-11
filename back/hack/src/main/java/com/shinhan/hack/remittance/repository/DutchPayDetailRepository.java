package com.shinhan.hack.remittance.repository;

import com.shinhan.hack.remittance.entity.DutchPayDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface DutchPayDetailRepository extends JpaRepository<DutchPayDetail, Long> {

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE DutchPayDetail d SET d.remittanceState = true where d.friendId = :studentId and d.dutchPay.dutchId = :dutchId")
    void dutchDetailStateUpdate(Long studentId, Long dutchId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE DutchPayDetail d SET d.remittanceTime = :now WHERE d.friendId = :studentId and d.dutchPay.dutchId = :dutchId")
    void dutchDetailTimeUpdate(Long studentId, Long dutchId, LocalDateTime now);

    @Query(value = "SELECT d from DutchPayDetail d WHERE d.dutchPay.dutchId = :dutchId and d.friendId = :friendId")
    Optional<DutchPayDetail> findByDutchIdAndFriendId(Long dutchId, Long friendId);
}
