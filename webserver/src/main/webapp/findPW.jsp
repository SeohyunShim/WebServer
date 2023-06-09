<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link href="./css/common.css" rel="stylesheet" type="text/css">
<link href="./css/find.css" rel="stylesheet" type="text/css">
<meta charset="UTF-8">
<title>아르바이트 근태 관리 시스템</title>
</head>
<body>
        <h1>비밀번호를 잊어버리셨나요?</h1>
        <h4>가입 시 사용한 정보를 입력해 주세요.</h4>

        <form onsubmit="return findPW(event)">
            <input
                type="text"
                id="id"
                placeholder="아이디"
                required
            />
            <input type="text" id="name" placeholder="이름" required />
            <input
                type="text"
                id="phone"
                placeholder="핸드폰"
                pattern="\d{3}-\d{3,4}-\d{4}"
                title="전화번호 형식은 010-0000-0000이어야 합니다."
                required
            />
            <button type="submit">비밀번호 찾기</button>
        </form>

    <script src="./js/find.js"></script>
</body>
</html>