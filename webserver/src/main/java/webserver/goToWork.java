package webserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class goToWork
 */
@WebServlet("/gotowork")
public class goToWork extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public goToWork() {
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		WorkDAO workDao = new WorkDAO();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		
		Work work = new Work();
		work.setUser_id(user.getUserID());
		work.setDate();
		work.setStart_time();
		
		List<Work> works = workDao.getUserDateWork(user.getUserID(), LocalDate.now());
		if(!works.isEmpty()) {
			Work oldWork = new Work();
			for(Work w: works) {
				oldWork=w;
			}
			if(oldWork.getEnd_time() != null) {
				workDao.goToWork(work);
			}
		}else { workDao.goToWork(work); }


		
		response.sendRedirect("user.jsp");
	}

}
