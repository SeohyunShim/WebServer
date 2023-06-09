// 페이지 로드 시 실행되는 함수
window.onload = function() {
    generateDates();
    getTodayWork();

    var listItems = document.querySelectorAll(".list-body li");

	// user 마다 listItem 설정
    listItems.forEach(function(item) {
        var userID = item.id.replace("list-item-", "");
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1;

        updateCalendar(userID, year, month);
        // 버튼 상태 업데이트 함수 호출
    	updateButtonStatus(userID, year, month);
    	
    	// 버튼 선택
    	var calendarContainer = document.querySelector("#list-item-" + userID + " .calendar-container");
		var prevMonthButton = calendarContainer.querySelector(".prevMonthButton");
		var nextMonthButton = calendarContainer.querySelector(".nextMonthButton");
    
    	// 월 변경 시 updateCalendar 함수 호출
	    prevMonthButton.addEventListener("click", function() {
	        if (!prevMonthButton.classList.contains("disabled")) {
	            month--;
	            if (month < 1) {
	                month = 12;
	                year--;
	            }
	            updateCalendar(userID, year, month);
	            // 버튼 상태 업데이트 함수 호출
	    		updateButtonStatus(userID, year, month);
	        }
	    });
	
	    nextMonthButton.addEventListener("click", function() {
	        month++;
	        if (month > 12) {
	            month = 1;
	            year++;
	        }
	        updateCalendar(userID, year, month);
	        // 버튼 상태 업데이트 함수 호출
	    	updateButtonStatus(userID, year, month);
	    });	
    });
};

// 버튼 상태 업데이트 함수
function updateButtonStatus(userID, year, month) {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    
    // 버튼 선택
    var calendarContainer = document.querySelector("#list-item-" + userID + " .calendar-container");
	var prevMonthButton = calendarContainer.querySelector(".prevMonthButton");
	var nextMonthButton = calendarContainer.querySelector(".nextMonthButton");

    // 이전 달 버튼 상태 업데이트
    var monthsDiff = (currentYear - year) * 12 + (currentMonth - month);
    if (monthsDiff >= 2) {
        prevMonthButton.disabled = true;
    } else {
        prevMonthButton.disabled = false;
    }

    // 다음 달 버튼 상태 업데이트
    if (monthsDiff <= 0) {
        nextMonthButton.disabled = true;
    } else {
        nextMonthButton.disabled = false;
    }
    
}

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

// 해당 월의 근무 정보를 가져오는 함수
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
    // <p> 요소를 가져와서 년도와 월을 적용
    var calendarContainer = document.querySelector("#list-item-" + userID + " .calendar-container");
	var pElement = calendarContainer.querySelector("p");
	pElement.innerHTML = ""; // 기존의 날짜 요소를 모두 제거합니다.
	pElement.textContent = year + ". " + month + ".";
    
    
    var datesContainer = document.querySelector("#list-item-" + userID + " .dates");
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
        })
        .catch(function(error) {
            console.error(error);
        });
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


var viewButtons = document.querySelectorAll(".view-button");
viewButtons.forEach(function (button) {
    button.addEventListener("click", toggleCalendar);
});

function toggleCalendar(event) {
    var listItem = event.target.closest("li");
    var listTable = listItem.querySelector(".list-table");
    var isShowing = listTable.classList.contains("show");

    if (isShowing) {
        listTable.style.maxHeight = listTable.scrollHeight + "px";

        listTable.addEventListener(
            "transitionend",
            function () {
                listTable.style.maxHeight = null;
                listTable.classList.remove("show");
            },
            { once: true }
        );
    } else {
        listTable.style.maxHeight = "1000px";
        listTable.classList.add("show");
    }
}

function togglePopupMenu(event) {
    var menuButton = event.target;
    var popupMenu = menuButton.nextElementSibling;
    var isShowing = popupMenu.classList.contains("show");

    if (isShowing) {
        popupMenu.classList.remove("show");
    } else {
        popupMenu.classList.add("show");
    }

    document.addEventListener(
        "click",
        function closePopupMenu(event) {
            if (
                !menuButton.contains(event.target) &&
                !popupMenu.contains(event.target)
            ) {
                popupMenu.classList.remove("show");
                document.removeEventListener(
                    "click",
                    closePopupMenu
                );
            }
        }
    );
}

var editPopup = document.getElementById("editEmployeePopup");
var editForm = document.getElementById("editForm");
var editNameInput = document.getElementById("editName");
var editPhoneInput = document.getElementById("editPhone");
var editWageInput = document.getElementById("editWage");
var editIDInput = document.getElementById("editID");

function openEditPopup(event) {
    document.querySelector(".popup-menu").classList.remove("show");

    var listItem = event.target.closest("li");
    var name = listItem.querySelector(
        ".list-info > div:nth-child(2)"
    ).textContent;
    var phone = listItem.querySelector(
        ".list-info > div:nth-child(3)"
    ).textContent;
    var wage = listItem.querySelector(
        ".list-info > div:nth-child(4) span"
    ).textContent.replace(",", "");
    var id = event.currentTarget.value;
	

    editNameInput.value = name;
    editPhoneInput.value = phone;
    editWageInput.value = wage;
    editIDInput.value = id;

    editPopup.style.display = "block";
}

var closeEditPopupButton =
    document.getElementById("closeEditPopup");
closeEditPopupButton.addEventListener("click", closeEditPopup);

function closeEditPopup() {
    editPopup.style.display = "none";
    editForm.reset();
}

var listPopup = document.getElementById("waitingListPopup");
function openListPopup() {
    listPopup.style.display = "block";
}

var closeListPopupButton =
    document.getElementById("closeListPopup");
closeListPopupButton.addEventListener("click", closeListPopup);

function closeListPopup() {
    listPopup.style.display = "none";
}

// 프로필 랜덤 적용
var listImageUsers = document.querySelectorAll(".list-image-user");

listImageUsers.forEach(function (image) {
    var randomImageIndex = Math.floor(Math.random() * 5) + 1;
    var randomImageSrc =
        "resources/user-" + randomImageIndex + ".png";
    image.src = randomImageSrc;
});

var watingListImage = document.querySelectorAll(
    ".waiting-profile img"
);

watingListImage.forEach(function (image) {
    var randomImageIndex = Math.floor(Math.random() * 5) + 1;
    var randomImageSrc =
        "resources/user-" + randomImageIndex + ".png";
    image.src = randomImageSrc;
});


// 유저 수정
function updateUser() {
  // 원래 form동작(submit) 중지
  event.preventDefault();
  
  const xhr = new XMLHttpRequest();
  const method = "POST";
  const url = "./updateUser";

  var form = document.getElementById("editForm"); // JSP의 form 요소 선택
  var formData = new FormData(form); // JSP의 form 데이터를 FormData로 변환

  // 요청을 초기화합니다.
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
	  // 성공 시 response 출력
      var response = xhr.responseText;
      alert(response);
      location.reload();
    } else {
      // 요청이 실패하면 오류 메시지를 표시합니다.
      console.error("An error occurred: " + xhr.responseText);
    }
  };

  // FormData를 문자열로 직렬화하여 서버로 보냅니다.
  var serializedFormData = new URLSearchParams(formData).toString();

  // 서버에 요청을 보냅니다.
  xhr.send(serializedFormData);
}


//유저 삭제
function deleteUser(){
	const xhr = new XMLHttpRequest();
	const method = "POST";
	const url = "./deleteUser";
	var id = event.currentTarget.value;
	
	// 요청을 초기화합니다.
	xhr.open(method, url);
	xhr.setRequestHeader('Content-Type', 'application/json');

	
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        alert(id + ' 회원이 삭제되었습니다.');
	        location.reload();
	    } else {
	        // 요청이 실패하면 오류 메시지를 표시합니다.
	        console.error('An error occurred: ' + xhr.responseText);
	    }
	};
	
	var data = JSON.stringify({ id: id });
	
	// 서버에 요청을 보냅니다.
	xhr.send(data);
}


//대기 유저 거절
function denyUser(){
	const xhr = new XMLHttpRequest();
	const method = "POST";
	const url = "./deleteUser";
	var id = event.currentTarget.value;
	
	// 요청을 초기화합니다.
	xhr.open(method, url);
	xhr.setRequestHeader('Content-Type', 'application/json');

	
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        alert(id + ' 회원을 거절했습니다.');
	        location.reload();
	    } else {
	        // 요청이 실패하면 오류 메시지를 표시합니다.
	        console.error('An error occurred: ' + xhr.responseText);
	    }
	};
	
	var data = JSON.stringify({ id: id });
	
	// 서버에 요청을 보냅니다.
	xhr.send(data);
}


//대기 유저 수락
function permitUser(){
	const xhr = new XMLHttpRequest();
	const method = "POST";
	const url = "./permitUser";
	var id = event.currentTarget.value;
	
	// 요청을 초기화합니다.
	xhr.open(method, url);
	xhr.setRequestHeader('Content-Type', 'application/json');

	
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        alert(id + ' 회원을 수락했습니다.');
	        location.reload();
	    } else {
	        // 요청이 실패하면 오류 메시지를 표시합니다.
	        console.error('An error occurred: ' + xhr.responseText);
	    }
	};
	
	var data = JSON.stringify({ id: id });
	
	// 서버에 요청을 보냅니다.
	xhr.send(data);
}