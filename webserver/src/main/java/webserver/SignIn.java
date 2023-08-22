package webserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class loginServlet
 */
@WebServlet("/signIn")
public class SignIn extends HttpServlet {
	private static final long serialVersionUID = 1L;
	UserDAO userdao;
   
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignIn() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    String userID = request.getParameter("userID");
	    String userPW = request.getParameter("userPW");
	    //System.out.print(userID);
	    //System.out.print(userPW);

	    userdao = new UserDAO();

	    User user = userdao.loginUser(userID, userPW);

	    if (user.getUserID() == null) {
	    	if(userdao.getUser(userID).getUserName() != null) {
	    		// pw 오류
				// 응답을 설정하고 전송합니다.
		        response.setContentType("text/plain");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write("비밀번호가 틀렸습니다.");
				return;
	    	}else {
	    		// 이 id를 가진 user가 존재하지 않음
	    		// 응답을 설정하고 전송합니다.
		        response.setContentType("text/plain");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write("존재하지 않는 계정입니다.");
				return;
	    	}
	    }
	    if(user.isAdmin() && !user.isPermit()) {
	        response.setContentType("text/plain");
	        response.setCharacterEncoding("UTF-8");
	        response.getWriter().write("승인되지 않은 관리자 계정입니다.");
	    	return;
	    }
	    if(!user.isAdmin() && !user.isPermit()) {
	        response.setContentType("text/plain");
	        response.setCharacterEncoding("UTF-8");
	        response.getWriter().write("승인되지 않은 계정입니다.");
	    	return;
	    }
	    
	    HttpSession session = request.getSession();

	    if (session.isNew() || session.getAttribute("user") == null) {
	        session.setAttribute("user", user);
	        if (session.isNew()) {
	        	System.out.println("Session 생성");
	        } else { // 로그인 중이 아니었던 유저
	            if (user.isAdmin()) {
	            	// admin 로그인 성공
	            	// 응답을 설정하고 전송합니다.
			        response.setContentType("text/plain");
			        response.setCharacterEncoding("UTF-8");
			        response.getWriter().write("admin");
					return;
	            } else {
	            	// user 로그인 성공
	            	// 응답을 설정하고 전송합니다.
			        response.setContentType("text/plain");
			        response.setCharacterEncoding("UTF-8");
			        response.getWriter().write("user");
					return;
	            }
	        }
	    } else { // 로그인 중이었던 유저
	        if (user.isAdmin()) {
	        	// admin 로그인 성공
	            // 응답을 설정하고 전송합니다.
		        response.setContentType("text/plain");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write("admin");
				return;
	        } else {
	        	// user 로그인 성공
	        	// 응답을 설정하고 전송합니다.
		        response.setContentType("text/plain");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write("user");
				return;
	        }
	    }
	}
}
