package com.shinhan.hack.remittance.repository;

import com.shinhan.hack.remittance.entity.DutchPayDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DutchPayDetailRepository extends JpaRepository<DutchPayDetail, Long> {

}
