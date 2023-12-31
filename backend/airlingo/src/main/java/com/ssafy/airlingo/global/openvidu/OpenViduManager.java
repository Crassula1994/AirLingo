package com.ssafy.airlingo.global.openvidu;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.study.repository.OpenviduSessionIdRepository;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.RecordingProperties;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenViduManager {
	@Value("${openviduUrl}")
	private String OPENVIDU_URL;

	@Value("${openviduSecret}")
	private String OPENVIDU_SECRET;

	private OpenVidu openVidu;
	private final OpenviduSessionIdRepository openviduSessionIdRepository;

	@PostConstruct
	public void init() {
		this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	// 매칭이 완료되면 OpenVidu의 sessionId를 반환하는 메서드
	public String createSession() throws OpenViduJavaClientException, OpenViduHttpException {
		SessionProperties properties = new SessionProperties.Builder().build();
		log.info("OPENVIDU_URL : {}", OPENVIDU_URL);
		log.info("OPENVIDU_SECRET : {}", OPENVIDU_SECRET);
		Session session = openVidu.createSession(properties);
		return session.getSessionId();
	}

	// SessionId를 받으면 Token(정확히는 WebSocket URL)을 반환해줌
	// ex) ws://localhost:4443?sessionId=ses_IZ8LrzVok5&token=tok_S1O1nsgOupusFnpJ
	public String getToken(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = openVidu.getActiveSession(sessionId);
		if (session == null) {
			throw new RuntimeException("NOT_EXIST_ACCOUNT");
		}
		ConnectionProperties properties = new ConnectionProperties.Builder().build();
		Connection connection = session.createConnection(properties);
		return connection.getToken();
	}

	public Recording startRecording(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
		RecordingProperties properties = new RecordingProperties.Builder()
			.hasAudio(true)
			.hasVideo(false)
			.build();
		if (openviduSessionIdRepository.existsSessionId(sessionId))
			return null;
		Recording recording = openVidu.startRecording(sessionId, properties);
		openviduSessionIdRepository.saveSessionId(sessionId);
		log.info(recording.getId());
		log.info(recording.getSessionId());
		return recording;
	}

	public Recording stopRecording(String recordingId) throws OpenViduJavaClientException, OpenViduHttpException {
		if (!openviduSessionIdRepository.existsSessionId(recordingId))
			return null;

		Recording recording = openVidu.stopRecording(recordingId);
		openviduSessionIdRepository.deleteSessionId(recordingId);
		log.info(recording.getId() + " " + recordingId);
		return recording;
	}
}
