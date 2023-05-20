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
@WebServlet("/login")
public class loginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	UserDAO userdao;
   
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public loginServlet() {
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
   		response.setContentType("text/html;charset=UTF-8");
   		PrintWriter out = response.getWriter();
   		String userID = request.getParameter("userID");
   		String userPW = request.getParameter("userPW");
   		
   		userdao = new UserDAO();

   		User user = userdao.loginUser(userID, userPW);

   		if(user.getUserID() == null) {
   			out.print("로그인 실패");
   			return;
   		}
   		
   		HttpSession session = request.getSession();
   		
   		if(session.isNew() || session.getAttribute("user") == null) {
   			session.setAttribute("user", user);
   			if(session.isNew()) {
   				out.print("Session 생성 후 , 로그인 완료");
   			}else {
   				out.print("id: "+user.getUserID()+" pw: "+user.getUserPW()+" 로그인을 완료하였습니다.");
   			}
   		}else {
   			out.print("현재 로그인 상태입니다.");
   		}
   	}
}
