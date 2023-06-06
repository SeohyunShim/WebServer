<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*" %>
<%@ page import="java.time.LocalDate" %>
<%@ page import="webserver.User" %>
<%@ page import="webserver.UserDAO" %>
<%@ page import="webserver.Work" %>
<%@ page import="webserver.WorkDAO" %>

<!DOCTYPE html>
<html>
<%
UserDAO userDao = new UserDAO(); 
WorkDAO workDao = new WorkDAO();
DecimalFormat formatter = new DecimalFormat("###,###,###");	//금액 표현 형식
User user = (User) session.getAttribute("user");
List<User> users = userDao.getAll();
List<User> employees = new ArrayList<>(); //승인된 회원
List<User> waitings = new ArrayList<>();  //아직 승인되지 않은 회원

for(User e : users){
	//관리자와 같은 직장에 다니는 회원 list
	if(e.getUserJob() == user.getUserJob()){
		//user가 admin이 아닌 회원 list
		if(!e.isAdmin()){
			if(Objects.equals(e.getUserPermission(),"T")){  //employees에 승인된 회원 추가
				employees.add(e);
			} else if(Objects.equals(e.getUserPermission(),"F")){  //waitings에 승인되지 않은 회원 추가
				waitings.add(e);
			}
		}
	}
}
%>
    <head>
        <title>관리자 페이지</title>
        <link rel="stylesheet" href="./css/common.css" />
        <link rel="stylesheet" href="./css/admin.css" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
        <div id="wrap">
            <header>
                <div class="header-left">
                    <p><span><%= user.getUserJob() %></span> / <span><%= user.getUserName() %></span></p>
                    님 어서 오세요!
                </div>
                <div class="header-right">
        			<a href="signOut" id="logout-button"><img src="resources/logout.png" /></a>
                </div>
            </header>

            <div class="list-top">
                <h2>직원 목록</h2>

                <button class="waiting-list-button" onclick="openListPopup()">
                    등록 대기
                    <span><%= waitings.size() %></span>
                </button>
            </div>

            <div class="list">
                <div class="list-header">
                    <div></div>
                    <div>이름</div>
                    <div>전화번호</div>
                    <div>시급</div>
                    <div>금월 급여 합계</div>
                    <div></div>
                    <div></div>
                </div>
                <ul class="list-body">
                    
                    <!-- employer 계정과 같은 직장에 다니는 employees list 출력 -->
                    <%
                    for(User e: employees){
                    	List<Work> works = workDao.getUserWork(e.getUserID());
                    	//이번달에 일한만큼 월급 계산
                    	LocalDate now = LocalDate.now();
                    	int pay = 0;
                    	int workTimeSum = 0;
                    	for(Work w: works){ 
                    		if(Objects.equals(w.getDate().getYear(), now.getYear()) && Objects.equals(w.getDate().getMonth(), now.getMonth())){
                        		System.out.println(w.getWork_time());
                    			workTimeSum += w.getWork_time();
                    		}
                    	}
                    	if(workTimeSum != 0){
                    		pay = workTimeSum/60 * e.getUserWage();
                    	}
                    %>
                    <li id="list-item-<%= e.getUserID() %>">
                        <div class="list-info">
                            <div>
                                <img
                                    class="list-image-user"
                                    src="resources/person.png"
                                    alt="person"
                                />
                            </div>
                            <div><%= e.getUserName() %></div>
                            <div><%= e.getUserPhone() %></div>
                            <div><span><%= formatter.format(e.getUserWage()) %></span>원</div>
                            <div><span><%= formatter.format(pay) %></span>원</div>
                            <div><button class="view-button">VIEW</button></div>
                            <div>
                                <img
                                    class="list-image-menu"
                                    src="resources/menu.png"
                                    alt="menu"
                                    onclick="togglePopupMenu(event)"
                                />
                                <div class="popup-menu">
                                    <button
                                        class="menu-item"
                                        onclick="openEditPopup(event)"
                                        value="<%= e.getUserID() %>"
                                    >
                                        수정하기
                                    </button>
                                    <button class="menu-item" value="<%= e.getUserID() %>"  onclick="deleteUser(event)">
                                        삭제하기
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="list-table">
                            <div class="calendar-container">
                                <p></p>
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
                                </div>
                            </div>
                        </div>
                    </li>
                <% } %>

                </ul>
            </div>

            <div id="addEmployeeForm" class="modal">
                <div class="modal-content">
                    <h2>알바생 정보 추가</h2>
                    <form id="addForm">
                        <input
                            type="text"
                            id="name"
                            placeholder="이름"
                            required
                        />

                        <input
                            type="text"
                            id="phone"
                            placeholder="전화번호 (010-0000-0000)"
                            pattern="\d{3}-\d{3,4}-\d{4}"
                            required
                        />

                        <input
                            type="text"
                            id="wage"
                            placeholder="시급"
                            required
                        />

                        <div class="form-button-wrap">
                            <button id="submit" type="button">추가</button>
                            <button id="close" type="button">닫기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div id="editEmployeePopup" class="modal">
            <div class="modal-content">
                <h2>알바생 정보 수정</h2>
                <form id="editForm" onsubmit="return updateUser()">
                    <input
                        type="text"
                        id="editName"
                        name="editName"
                        placeholder="이름"
                        required="required"
                    />
                    <input
                        type="text"
                        id="editPhone"
                        name="editPhone"
                        placeholder="전화번호 (010-0000-0000)"
                        pattern="\d{3}-\d{3,4}-\d{4}"
                        required="required"
                    />
                    <input
                        type="text"
                        id="editWage"
                        name="editWage"
                        placeholder="시급"
                        required="required"
                    />
                    <input
                        type="hidden"
                        id="editID"
                        name="editID"
                        placeholder="아이디"
                        required
                    />

                    <div class="form-button-wrap">
                        <button id="update" type="submit">수정</button>
                        <button id="closeEditPopup" type="button">닫기</button>
                    </div>
                </form>
            </div>
        </div>

        <div id="waitingListPopup" class="modal">
            <div class="modal-content">
                <div class="waiting-list">
                    <!-- employer 계정과 같은 직장에 승인 요청한 대기자 list 출력 -->
                	<%
                	String position = "직원";
                	for(User w: waitings){
                		if(Objects.equals(w.getUserAdmin(), "manager")){
                			position = "매니저";
                		}else if(Objects.equals(w.getUserAdmin(), "employee")){
                			position = "직원";
                		}
                	%>
                    <div class="waiting-item">
                        <div class="waiting-info">
                            <div class="waiting-profile">
                                <img
                                    src="./resources/user-1.png"
                                    alt="Profile Picture"
                                />
                            </div>
                            <div class="waiting-details">
                                <div class="waiting-title">
                                    <%= w.getUserName() %> 님이 회원 등록 대기 중입니다.
                                </div>
                                <div class="waiting-subtitle">직급: <%= position %></div>
                                <div class="waiting-date">
                                    신청일: 2023-05-20
                                </div>
                            </div>
                        </div>
                        <div class="waiting-actions">
                            <button class="reject-button" value="<%= w.getUserID() %>"  onclick="denyUser()">거절</button>
                            <button class="approve-button" value="<%= w.getUserID() %>"  onclick="permitUser()">수락</button>
                        </div>
                    </div>
                    <% } %>
                </div>
                
                <div class="form-button-wrap">
                    <button id="closeListPopup" type="button">닫기</button>
                </div>
            </div>
        </div>
        
    </body>

    <script src="./js/admin.js"></script>
</html>
