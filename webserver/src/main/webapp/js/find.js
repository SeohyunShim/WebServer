function findID(event) {
	event.preventDefault();

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "FindID", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            // 서버로부터 받은 응답을 처리
            alert(response);
        } else {
      		console.error("An error occurred: " + xhr.responseText);
		}
    };
    xhr.send("name=" + name + "&phone=" + phone);
}

function findPW(event) {
	event.preventDefault();

    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "FindPW", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4) {
	        if (xhr.status === 200) {
	            var response = xhr.responseText;
	            if (response) {
	                var userData = JSON.parse(response);
	                if (Object.keys(userData).length !== 0) {
	                    var username = userData.userName;
	                    var password = userData.userPW;
	                    alert("아이디: " + username + "\n비밀번호: " + password);
	                } else {
	                    alert("일치하는 정보가 없습니다.");
	                }
	            } else {
	                alert("서버에서 응답을 받지 못했습니다.");
	            }
	        } else {
	            console.error("오류 발생: " + xhr.status);
	        }
	    }
	};


    xhr.send("id=" + id + "&name=" + name + "&phone=" + phone);
}
