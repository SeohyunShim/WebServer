<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link href="./css/common.css" rel="stylesheet" type="text/css">
<link href="./css/sign.css" rel="stylesheet" type="text/css">
<meta charset="UTF-8">
<title>아르바이트 근태 관리 시스템</title>
</head>

    <body>
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <form id="signUp" onsubmit="return signUp()">
                    <h1>회원가입</h1>
                    <div class="radio-wrap">
                        <input
                            type="radio"
                            id="employer"
                            name="admin"
                            value="employer"
                            checked
                        />
                        <label for="employer" style="margin-right: 10px"
                            >관리자</label
                        >
                        <input
                            type="radio"
                            id="employee"
                            name="admin"
                            value="employee"
                        />
                        <label for="employee">직원</label>
                    </div>

                    <input
                        id="up-id"
                        name="up-id"
                        type="text"
                        placeholder="아이디"
					    pattern=".{6,}"
					    title="아이디는 6글자 이상이어야 합니다."
                        required
                    />
                    <input
                        id="up-pw"
                        name="up-pw"
                        type="password"
					    placeholder="비밀번호"
					    pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
					    title="비밀번호는 숫자와 영어를 혼합하여 8글자 이상이어야 합니다."
                        required
                    />
                    <input
                        id="up-name"
                        name="up-name"
                        type="text"
                        placeholder="이름"
                        required
                    />
                    <input
                        id="up-phone"
                        name="up-phone"
                        type="text"
                        placeholder="전화번호 (010-0000-0000)"
                        pattern="\d{3}-\d{3,4}-\d{4}"
   						title="전화번호 형식은 010-0000-0000이어야 합니다."
                        required
                    />
                    <input
                        id="up-job"
                        name="up-job"
                        type="text"
                        placeholder="직장"
                        required
                    />
                    <select id="up-admin" name="up-admin">
                        <option selected disabled>직급</option>
                        <option value="employee">직원</option>
                        <option value="manager">매니저</option>
                    </select>
                    <button type="submit" id="Signup">회원가입</button>
                    <p id="switchSignIn">이미 아이디가 있으신가요?</p>
                </form>
            </div>
            <div class="form-container sign-in-container" required>
				<form id="form" name="form" onsubmit="return signIn()">
                    <h1>로그인</h1>
                    <input
                        id="userID"
                        name="userID"
                        type="text"
                        placeholder="아이디"
                        required
                    />
                    <input
                        id="userPW"
                        name="userPW"
                        type="password"
                        placeholder="비밀번호"
                        required
                    />
                    <p id="forgot">
                        <a
                            href="./findID.jsp"
                            onclick="window.open(this.href, 'blank', 'width=600, height=410'); return false;"
                        >
                            아이디 찾기
                        </a>
                        /
                        <a
                            href="./findPW.jsp"
                            onclick="window.open(this.href, 'blank', 'width=600, height=460'); return false;"
                        >
                            비밀번호 찾기
                        </a>
                    </p>
                    <button type="submit" name="Signin" id="Signin">
                        로그인
                    </button>
                    <p id="switchSignUp">아이디가 없으신가요?</p>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left"></div>
                    <div class="overlay-panel overlay-right"></div>
                </div>
            </div>
        </div>
    </body>
    
<script src="./js/sign.js" type="text/javascript"></script>
</html>