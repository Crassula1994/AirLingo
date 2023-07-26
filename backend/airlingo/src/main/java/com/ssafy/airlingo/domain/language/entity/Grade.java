package com.ssafy.airlingo.domain.language.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "grade")
@Entity
public class Grade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long gradeId;

	@Column(nullable = false, unique = true, length = 100)
	private String gradeName;

	@Column(nullable = false)
	private int gradeScore;

	public Grade(String gradeName, int gradeScore) {
		this.gradeName = gradeName;
		this.gradeScore = gradeScore;
	}
}
