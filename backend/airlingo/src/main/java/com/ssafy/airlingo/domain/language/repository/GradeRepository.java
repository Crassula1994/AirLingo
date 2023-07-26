package com.ssafy.airlingo.domain.language.repository;

import com.ssafy.airlingo.domain.language.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade, Long> {
	Grade findByGradeName(String gradeName);
}

