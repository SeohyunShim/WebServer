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
    ).textContent;
    var id = event.currentTarget.value;
	

    editNameInput.value = name;
    editPhoneInput.value = phone;
    editWageInput.value = wage;
    editIDInput.value = id;

    editPopup.style.display = "block";
}

/*editForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = editNameInput.value;
    var phone = editPhoneInput.value;
    var wage = editWageInput.value;

    var listItem = editPopup.parentElement.parentElement;
    listItem.querySelector(
        ".list-info > div:nth-child(2)"
    ).textContent = name;
    listItem.querySelector(
        ".list-info > div:nth-child(3)"
    ).textContent = phone;
    listItem.querySelector(
        ".list-info > div:nth-child(4)"
    ).textContent = wage;	

	
    closeEditPopup();
});*/


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