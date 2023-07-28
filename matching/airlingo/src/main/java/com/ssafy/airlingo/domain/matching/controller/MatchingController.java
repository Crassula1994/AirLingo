package com.ssafy.airlingo.domain.matching.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.matching.service.MatchingService;
import com.ssafy.airlingo.global.response.SingleResponseResult;

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
		content = @Content(schema = @Schema(implementation = SingleResponseResult.class)))})
@Slf4j
@Tag(name = "Matching Controller", description = "매칭 관련 컨트롤러")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/matching")
public class MatchingController {

	private final MatchingService matchingService;

	@Operation(summary = "Waiting Users size", description = "실시간 매칭중인 유저수")
	@GetMapping("/waiting-users")
	public SingleResponseResult countWaitingUsers() {
		int waitingUserSize = matchingService.countWaitingUsers();
		log.info("countWaitingUsers : {}", waitingUserSize);
		return new SingleResponseResult<>(waitingUserSize);
	}
}