window.onload = function() {
    generateDates();
    getTodayWork();

    var userID = document.querySelector("#user-id").value;
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;

    updateCalendar(userID, year, month);

/*
    // 월 변경 시 updateCalendar 함수 호출
    document.getElementById("prevMonthButton").addEventListener("click", function() {
        month--;
        if (month < 1) {
            month = 12;
            year--;
        }
        updateCalendar(userID, year, month);
    });

    document.getElementById("nextMonthButton").addEventListener("click", function() {
        month++;
        if (month > 12) {
            month = 1;
            year++;
        }
        updateCalendar(userID, year, month);
    });
 */
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
        datesContainer.appendChild(dateElement);
    }
}

function getUserMonthWork(userID, year, month) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        var method = "GET";
        var url = "./getUserMonthWork?userID=" + userID + "&year=" + year + "&month=" + month;

        xhr.open(method, url);

        xhr.onload = function() {
            if (xhr.status === 200) {
                var workData = JSON.parse(xhr.responseText);
                resolve(workData);
            } else {
                reject(xhr.responseText);
            }
        };

        xhr.onerror = function() {
            reject("요청 중 오류가 발생했습니다.");
        };

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");

        xhr.send();
    });
}

// 월 변경 시 일자별 근무 정보를 가져와서 달력에 표시하는 함수
function updateCalendar(userID, year, month) {
    var datesContainer = document.querySelector(".dates");
    datesContainer.innerHTML = ""; // 기존의 날짜 요소를 모두 제거합니다.

    // 날짜를 생성하여 날짜 컨테이너에 추가
    var firstDate = new Date(year, month - 1, 1);
    var firstDayOfWeek = firstDate.getDay();
    var currentMonthLastDate = new Date(year, month, 0).getDate();

    for (var i = 0; i < firstDayOfWeek; i++) {
        var dateElement = document.createElement("div");
        dateElement.classList.add("date", "prev");
        datesContainer.appendChild(dateElement);
    }

    for (var i = 1; i <= currentMonthLastDate; i++) {
        var dateElement = document.createElement("div");
        dateElement.classList.add("date");
        dateElement.textContent = i;
        datesContainer.appendChild(dateElement);
    }

    var lastDate = new Date(year, month - 1, currentMonthLastDate);
    var lastDayOfWeek = lastDate.getDay();
    var remainingDays = 7 - lastDayOfWeek - 1;

    for (var i = 1; i <= remainingDays; i++) {
        var dateElement = document.createElement("div");
        dateElement.classList.add("date", "next");
        datesContainer.appendChild(dateElement);
    }

    // 해당 월의 근무 정보를 가져와서 달력에 표시합니다.
    getUserMonthWork(userID, year, month)
        .then(function(workData) {
            var dateElements = datesContainer.querySelectorAll(".date");
            for (var i = 0; i < dateElements.length; i++) {
                var dateElement = dateElements[i];
                var day = parseInt(dateElement.textContent);

                for (var j = 0; j < workData.length; j++) {
                    var work = workData[j];
                    var workDate = new Date(work.date);
                    var workDay = workDate.getDate();

                    if (day === workDay) {
                        var startTime = work.start_time.substring(11, 16); // 시간 부분 추출 (HH:mm)
                        var endTime = work.end_time.substring(11, 16); // 시간 부분 추출 (HH:mm)
                        var timeRange = startTime + " - " + endTime;

                        var timeElement = document.createElement("div");
                        timeElement.classList.add("time");
                        timeElement.textContent = timeRange;
                        dateElement.appendChild(timeElement);
                        break;
                    }
                }
            }

            // 해당 월의 급여 합계를 계산하여 #salaryAmount에 적용합니다.
            var salaryAmount = calculateSalary(workData);
            document.querySelector("#salaryAmount").textContent = salaryAmount.toLocaleString() + "원";
        })
        .catch(function(error) {
            console.error(error);
        });
}

// 해당 월의 근무 정보를 기반으로 급여 합계를 계산하는 함수
function calculateSalary(workData) {
    var totalSalary = 0;
    for (var i = 0; i < workData.length; i++) {
        var work = workData[i];
        var workTime = Math.floor(work.work_time / 60) * 60; // 30분 단위로 버림(round down) 적용
        var hourlyRate = document.querySelector("#user-wage").value;
        var workSalary = workTime / 60 * hourlyRate; // 근무 임금 계산
        totalSalary += workSalary;
    }
    return totalSalary;
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

// 날짜와 시간 형식을 변경하는 함수
function formatDate(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedHours = (hours % 12 === 0) ? 12 : hours % 12;
    const period = (hours >= 12) ? '오후' : '오전';

    const formattedDate = `${period} ${formattedHours}:${minutes}:${seconds}`;
    return formattedDate;
}

// getWork 요청을 보내고, 응답을 받아서 UI 업데이트 함수를 호출
function getTodayWork() {
    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "./getTodayWork";

    xhr.open(method, url);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const workData = JSON.parse(xhr.responseText);
            const goToWorkButton = document.getElementById("goToWorkButton");
            const getOffWorkButton = document.getElementById("getOffWorkButton");
            const goToWorkTimeElem = document.getElementById("goToWorkTime");
            const getOffWorkTimeElem = document.getElementById("getOffWorkTime");

            if (workData.goToWorkTime !== undefined) {
                goToWorkButton.style.display = "none";
                goToWorkTimeElem.style.display = "block";
                goToWorkTimeElem.textContent = formatDate(workData.goToWorkTime);
            } else {
                goToWorkButton.style.display = "block";
                goToWorkTimeElem.style.display = "none";
            }

            if (workData.getOffWorkTime !== undefined) {
                getOffWorkButton.style.display = "none";
                getOffWorkTimeElem.style.display = "block";
                getOffWorkTimeElem.textContent = formatDate(workData.getOffWorkTime);
            } else {
                getOffWorkButton.style.display = "block";
                getOffWorkTimeElem.style.display = "none";
            }
        } else {
            console.error('An error occurred: ' + xhr.responseText);
        }
    };

    xhr.send();
}
