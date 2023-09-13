package com.shinhan.hack.Error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    MEMBER_DONT_HAVE_MONEY(HttpStatus.BAD_REQUEST, "계좌 잔액 부족"),
    ALREADY_PAY_MONEY(HttpStatus.BAD_REQUEST, "이미 더치페이 하셨습니다."),
    ALREADY_FRIEND(HttpStatus.BAD_REQUEST, "이미 친구입니다."),
    ALREADY_CATEGORY(HttpStatus.BAD_REQUEST, "이미 존재하는 카테고리입니다."),
    BASIC_CATEGORY(HttpStatus.BAD_REQUEST, "기본 카테고리입니다."),
    DIFFERENT_STUDENT_CATEGORY(HttpStatus.BAD_REQUEST, "다른 학생의 카테고리입니다."),


    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    LOGIN_FAIL(HttpStatus.UNAUTHORIZED, "로그인 실패, 아이디와 비밀번호를 확인해 주세요."),

    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 학생 정보를 찾을 수 없습니다."),
    FRIEND_NOT_FOUNT(HttpStatus.NOT_FOUND, "해당 친구 정보를 찾을 수 없습니다."),
    DUTCH_DETAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "더치페이 내역이 없습니다."),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "카테고리를 찾을 수 없습니다."),
    MEMBER_IS_EMPTY(HttpStatus.NOT_FOUND, "학생이 존재하지 않습니다."),


    /* 409 CONFLICT : Response의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다")
    ;
    private final HttpStatus httpStatus;
    private final String detail;
}
