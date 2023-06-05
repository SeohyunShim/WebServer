package webserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class getoffwork
 */
@WebServlet("/getoffwork")
public class getOffWork extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getOffWork() {
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
		
		//List<Work> works = workDao.getAll();
		List<Work> works = workDao.getUserDateWork(user.getUserID(), LocalDate.now());
		//List<Work> works = workDao.getUserWork(user.getUserID());
		Work work = new Work();
		int check = 0;
		int work_time = 0;
		for(Work w: works) {
			if(w.getEnd_time() == null) {
				check = 1;
			}else {
				check = 0;
			}
			w.setEnd_time();
			int start_time = (w.getStart_time().getHour()*60) + w.getStart_time().getMinute();
			int end_time = (w.getEnd_time().getHour()*60) + w.getEnd_time().getMinute();
			work_time = end_time - start_time;
			w.setWork_time(work_time);
			work=w;
		}
		
		if(check == 1) {
			workDao.getOffWork(work);
			workDao.setWorkTime(work);
		}
		response.sendRedirect("user.jsp");
	}

}
