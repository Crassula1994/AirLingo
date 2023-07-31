package com.ssafy.airlingo.domain.study.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.study.service.StudyService;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "Study Controller", description = "스터디 관련 컨트롤러")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/study")
public class StudyController {

	private final StudyService studyService;

	@Operation(summary = "GetAllStudysByUserIdAndDate", description = "사용자 아이디와 날짜별로 스터디 리스트 조회")
	@GetMapping("/user/{userId}/date")
	public ResponseResult getStudyListByUserIdAndDate(@PathVariable Long userId,
		@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		log.info("GetAllStudysByUserIdAndDate");
		return new ListResponseResult<>(studyService.findStudyByUserIdAndDate(userId, date));
	}
}
