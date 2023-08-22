package webserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class SignUp
 */
@WebServlet("/signUp")
public class SignUp extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SignUp() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("UTF-8");
		UserDAO userDao = new UserDAO();
		User user = new User();
		
		// db에 삽입할 user 정보 세팅
		user.setUserID(request.getParameter("up-id"));
		user.setUserPW(request.getParameter("up-pw"));
		user.setUserName(request.getParameter("up-name"));
		user.setUserPhone(request.getParameter("up-phone"));
		user.setUserJob(request.getParameter("up-job"));
		if (Objects.equals(request.getParameter("admin"), "employer")) {
			user.setUserAdmin(request.getParameter("admin"));
			user.setUserPermission("F");
		} else {
			user.setUserAdmin(request.getParameter("up-admin"));
			if (Objects.equals(request.getParameter("up-admin"), "employee")) {
				user.setUserWage(9620);
			} else if (Objects.equals(request.getParameter("up-admin"), "manager")) {
				user.setUserWage(12500);
			}
			user.setUserPermission("F");
		}
		user.setApplyDate();

		// 문제 없을 시 회원가입 처리 후 alert 팝업 > 페이지 이동
		if (user.getUserID() != null) {
			if (userDao.getUser(user.getUserID()).getUserName() == null) {
				// 회원가입을 진행합니다.
				userDao.insert(user);
				// 응답을 설정하고 전송합니다.
		        response.setContentType("text/plain");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write("회원 가입을 신청했습니다.");
				return;
			} else {
				// 응답을 설정하고 전송합니다.
		        response.setContentType("text/plain");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write("이미 존재하는 아이디입니다.");
				return;
			}
		} else {
			// 응답을 설정하고 전송합니다.
	        response.setContentType("text/plain");
	        response.setCharacterEncoding("UTF-8");
	        response.getWriter().write("회원 가입에 실패했습니다.");
			return;
		}
	}

}
