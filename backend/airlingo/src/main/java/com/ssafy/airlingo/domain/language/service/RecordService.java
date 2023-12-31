package com.ssafy.airlingo.domain.language.service;

import java.util.List;

import com.ssafy.airlingo.domain.language.dto.request.EvaluateUserRequestDto;
import com.ssafy.airlingo.domain.language.dto.response.LearningNumberResponseDto;
import com.ssafy.airlingo.domain.language.dto.response.LearningStatisticResponseDto;
import com.ssafy.airlingo.domain.language.dto.response.LearningTimeResponseDto;
import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.Record;
import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.user.entity.User;

public interface RecordService {
	boolean evaluateUser(EvaluateUserRequestDto evaluateUserRequestDto);

	Record createNewRecordAndRenewUserRating(User user, Language language, Grade grade, Study study, float rating);

	LearningStatisticResponseDto getStatistic(Long userId);

}
