package webserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Servlet implementation class getUserMonthWork
 */
@WebServlet("/getUserMonthWork")
public class getUserMonthWork extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getUserMonthWork() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userID = request.getParameter("userID");
        int year = Integer.parseInt(request.getParameter("year"));
        int month = Integer.parseInt(request.getParameter("month"));

        WorkDAO workDao = new WorkDAO();
        List<Work> works = workDao.getUserMonthWork(userID, year, month);
        
        // works 리스트를 JSON 형식으로 변환
        JSONArray jsonArray = new JSONArray();
        for (Work work : works) {
            JSONObject jsonWork = new JSONObject();
            jsonWork.put("date", work.getDate());
            jsonWork.put("start_time", work.getStart_time());
            jsonWork.put("end_time", work.getEnd_time());
            jsonWork.put("work_time", work.getWork_time());
            jsonArray.put(jsonWork);
        }

        // JSON 응답 생성
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(jsonArray.toString());

        out.flush();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
