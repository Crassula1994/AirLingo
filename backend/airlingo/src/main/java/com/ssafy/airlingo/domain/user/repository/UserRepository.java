package com.ssafy.airlingo.domain.user.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	// 입력받은 ID, PW를 기반으로 User 조회
	User findUserByUserLoginIdAndUserPassword(String userLoginId, String userPassword);
}
