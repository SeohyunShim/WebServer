<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="webserver.User" %>
<%@ page import="javax.servlet.http.HttpSession" %>

<%@ page import="java.time.LocalDate" %>
<% LocalDate today = LocalDate.now(); %>

<%-- 세션에서 사용자 정보 가져오기 --%>
<% HttpSession sessionObj = request.getSession(); %>
<% User user = (User) sessionObj.getAttribute("user"); %>   

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="./css/common.css" rel="stylesheet" type="text/css">
<link href="./css/user.css" rel="stylesheet" type="text/css">
<title>아르바이트 근태 관리 시스템</title>
</head>
    <body>
        <div id="wrap">
        	<input type="hidden" id="user-id" value=<%= user.getUserID() %>>
        	<input type="hidden" id="user-wage" value=<%= user.getUserWage() %>>
        
            <header>
                <div class="header-left">
                    <p><span><%= user.getUserJob() %></span> / <span><%= user.getUserName() %></span></p>
                    님 어서 오세요!
                </div>
                <div class="header-right">
        			<a href="signOut" id="logout-button"><img src="resources/logout.png" /></a>
                </div>
            </header>

            <div id="contents">
				<div class="work-container">
				    <p>출근<span class="today"><%= today.toString() %></span></p>
				    <button id="goToWorkButton" class="work-button" onclick="postGoToWork()">출근하기</button>
				    <div id="goToWorkTime" style="display: <%= (request.getAttribute("goToWorkTime") != null) ? "block" : "none" %>;">
				        <%= request.getAttribute("goToWorkTime") %>
				    </div>
				</div>
				
				<div class="end-container">
				    <p>퇴근<span class="today"><%= today.toString() %></span></p>
				    <button id="getOffWorkButton" class="end-button" onclick="postGetOffWork()">퇴근하기</button>
				    <div id="getOffWorkTime" style="display: <%= (request.getAttribute("getOffWorkTime") != null) ? "block" : "none" %>;">
				        <%= request.getAttribute("getOffWorkTime") %>
				    </div>
				</div>

                <div class="salary-container">
                    <p>이번 달 예상 급여</p>
                    <div>
                        <img src="resources/dollar.png" />
				        <span id="salaryAmount">0 원</span>
                    </div>
                </div>

                <div class="calendar-container">
                	<div class="buttonContainer">
  						<button class="prevMonthButton"></button>
  						<p></p>
  						<button class="nextMonthButton"></button>
					</div>
                    <div class="days">
                        <div class="day">SUN</div>
                        <div class="day">MON</div>
                        <div class="day">TUE</div>
                        <div class="day">WED</div>
                        <div class="day">THU</div>
                        <div class="day">FRI</div>
                        <div class="day">SAT</div>
                    </div>
                    <div class="dates">
                        <!-- <div class="date">
                            1
                            <div class="time">09:00 - 14:00</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </body>

    <script src="./js/user.js"></script>
</html>