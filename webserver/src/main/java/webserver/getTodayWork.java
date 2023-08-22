package webserver;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;


/**
 * Servlet implementation class getWork
 */
@WebServlet("/getTodayWork")
public class getTodayWork extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getTodayWork() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        WorkDAO workDao = new WorkDAO();
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");

        List<Work> works = workDao.getUserDateWork(user.getUserID(), LocalDate.now());

        String goToWorkTime = null;
        String getOffWorkTime = null;

        if (!works.isEmpty()) {
            Work todayWork = works.get(0);

            LocalDateTime startTime = todayWork.getStart_time();
            LocalDateTime endTime = todayWork.getEnd_time();

            if (startTime != null) {
                goToWorkTime = startTime.toString();
            }

            if (endTime != null) {
                getOffWorkTime = endTime.toString();
            }
        }

        // Create a JSON object for the response data
        JSONObject responseData = new JSONObject();
        responseData.put("goToWorkTime", goToWorkTime);
        responseData.put("getOffWorkTime", getOffWorkTime);

        // Set the response content type to JSON
        response.setContentType("application/json");
        response.getWriter().write(responseData.toString());
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
