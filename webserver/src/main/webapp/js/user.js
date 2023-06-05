window.onload = function () {
    // generateDates 함수를 호출하여 날짜를 생성하고 적용
    generateDates();
};

// 날짜를 생성하고 적용하는 함수
function generateDates() {
    // 날짜 컨테이너 요소를 가져옴
    var datesContainer = document.querySelector(".dates");

    // 현재 날짜를 가져옴
    var currentDate = new Date();

    // 현재 년도와 월을 가져옴
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();

    // <p> 요소를 가져와서 년도와 월을 적용
    var pElement = document.querySelector(".calendar-container p");
    pElement.textContent = currentYear + ". " + currentMonth + ".";

    // 현재 달의 첫째 날을 설정
    var firstDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );

    // 현재 달의 첫째 날의 요일을 가져옴 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    var firstDayOfWeek = firstDate.getDay();

    // 이전 달의 마지막 날을 설정
    var prevMonthLastDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
    ).getDate();

    // 이전 달의 마지막 일자를 가져오기 위한 변수
    var prevMonthLastDateCounter = prevMonthLastDate - firstDayOfWeek + 1;

    // 다음 달의 첫째 날을 가져옴
    var nextMonthFirstDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
    );

    // 다음 달의 첫째 날의 요일을 가져옴
    var nextMonthFirstDayOfWeek = nextMonthFirstDate.getDay();

    // 현재 달의 마지막 날을 가져옴
    var currentMonthLastDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    // 날짜를 생성하여 날짜 컨테이너에 추가
    for (var i = 0; i < firstDayOfWeek; i++) {
        var dateElement = document.createElement("div");
        dateElement.classList.add("date", "prev");
        dateElement.textContent = prevMonthLastDateCounter++;
        datesContainer.appendChild(dateElement);
    }

    for (var i = 1; i <= currentMonthLastDate; i++) {
        var dateElement = document.createElement("div");
        dateElement.classList.add("date");
        dateElement.textContent = i;
        datesContainer.appendChild(dateElement);
    }

    for (var i = 1; i <= 7 - nextMonthFirstDayOfWeek; i++) {
        var dateElement = document.createElement("div");
        dateElement.classList.add("date", "next");
        dateElement.textContent = i;
        datesContainer.appendChild(dateElement);
    }
}

function postGoToWork(){
	const xhr = new XMLHttpRequest();
	const method = "POST";
	const url = "./gotowork";

	// 요청을 초기화 합니다.
	xhr.open(method, url);

	xhr.onload = function() {
	    if (xhr.status === 200) {
		    // 요청 성공 시 시각을 가져와서 해당 요소에 표시
		    const goToWorkTime = document.getElementById("goToWorkTime");
			const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
			goToWorkTime.innerText = currentTime;
			goToWorkTime.style.display = "block";
		
		    // 출근 버튼 숨기기
		    const goToWorkButton = document.getElementById("goToWorkButton");
		    goToWorkButton.style.display = "none";
		    
	        // 요청 성공 시 alert 메세지를 표시합니다.
	        alert('출근 처리가 완료되었습니다.');
	    } else {
	        // 요청이 실패하면 오류 메시지를 표시합니다.
	        alert('An error occurred: ' + xhr.responseText);
	    }
	};

	// 서버에 요청을 보냅니다.
	xhr.send();
}

function postGetOffWork(){
    const xhr = new XMLHttpRequest();
	const method = "POST";
	const url = "./getoffwork";

	// 요청을 초기화 합니다.
	xhr.open(method, url);

	xhr.onload = function() {
	    if (xhr.status === 200) {
		    // 요청 성공 시 시각을 가져와서 해당 요소에 표시
		    const getOffWorkTime = document.getElementById("getOffWorkTime");
			const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
			getOffWorkTime.innerText = currentTime;
		    getOffWorkTime.style.display = "block";
		
		    // 퇴근 버튼 숨기기
		    const getOffWorkButton = document.getElementById("getOffWorkButton");
		    getOffWorkButton.style.display = "none";
		    
	        // 요청 성공 시 alert 메세지를 표시합니다.
	        alert('퇴근 처리가 완료되었습니다.')

	    } else {
	        // 요청이 실패하면 오류 메시지를 표시합니다.
	        alert('An error occurred: ' + xhr.responseText);
	    }
	};

	// 서버에 요청을 보냅니다.
	xhr.send();
}

function postGetWork() {
	// user.jsp 내에서 작업 기록을 가져오는 AJAX 요청
	const xhr = new XMLHttpRequest();
	const method = "GET";
	const url = "./getWork";
	
	// 요청을 초기화합니다.
	xhr.open(method, url);
	
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        // 요청이 성공하면 가져온 작업 기록을 처리하여 화면에 반영합니다.
	        const workData = JSON.parse(xhr.responseText);
	        // 작업 기록을 활용하여 화면을 업데이트하는 로직을 작성합니다.
			console.log(workData)
	        updateWorkUI(workData);
	    } else {
	        // 요청이 실패하면 오류 메시지를 표시합니다.
	        console.error('An error occurred: ' + xhr.responseText);
	    }
	};
	
	// 서버에 요청을 보냅니다.
	xhr.send();
}

function updateWorkUI(workData) {
	console.log(workData)
    // 작업 기록을 활용하여 화면을 업데이트하는 로직을 작성합니다.
    // 예시: 작업 기록을 토대로 버튼을 표시하거나 감춥니다.
    if (workData.length > 0) {
        // 작업 기록이 있을 경우, 출근 버튼을 감추고 퇴근 버튼을 표시합니다.
        document.getElementById("goToWorkButton").style.display = "none";
        document.getElementById("getOffWorkButton").style.display = "block";
    } else {
        // 작업 기록이 없을 경우, 출근 버튼을 표시하고 퇴근 버튼을 감춥니다.
        document.getElementById("goToWorkButton").style.display = "block";
        document.getElementById("getOffWorkButton").style.display = "none";
    }
}