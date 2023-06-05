// container active handler
const signUpButton = document.getElementById("switchSignUp");
const signInButton = document.getElementById("switchSignIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

// sign up form - radio input handler
const adminRadio = document.querySelector("#employer");
const employeeRadio = document.querySelector("#employee");
const positionSelect = document.querySelector("select");

adminRadio.checked = true;
positionSelect.style.display = "none";

adminRadio.addEventListener("change", function () {
    if (adminRadio.checked) {
        positionSelect.style.display = "none";
    }
});

employeeRadio.addEventListener("change", function () {
    if (employeeRadio.checked) {
        positionSelect.style.display = "block";
    }
});

// 로그인
function signIn() {
  // 원래 form동작(submit) 중지
  event.preventDefault();
  
  const xhr = new XMLHttpRequest();
  const method = "POST";
  const url = "./signIn";

  var form = document.getElementById("form"); // JSP의 form 요소 선택
  var formData = new FormData(form); // JSP의 form 데이터를 FormData로 변환

  // 요청을 초기화합니다.
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      if(response == "user"){ // 유저 로그인
		  location.href="./user.jsp"
	  }else if(response == "admin"){ // admin 로그인
		  location.href="./admin.jsp"
	  }else{ // 로그인 실패 시 message alert
		  alert(response);
		  location.reload();
	  }
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


// 회원가입
function signUp() {  
  // 원래 form동작(submit) 중지
  event.preventDefault();
  
  const xhr = new XMLHttpRequest();
  const method = "POST";
  const url = "./signUp";

  var form = document.getElementById("signUp"); // JSP의 form 요소 선택
  var formData = new FormData(form); // JSP의 form 데이터를 FormData로 변환

  
  // 요청을 초기화합니다.
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      alert(response);
      if(response.includes("성공")){
		  location.reload();
	  }
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