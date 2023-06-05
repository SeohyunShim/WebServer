package webserver;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class PermitUser
 */
@WebServlet("/permitUser")
public class PermitUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PermitUser() {
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
		// TODO Auto-generated method stub
		UserDAO userDao = new UserDAO();
		request.setCharacterEncoding("UTF-8");
		// 요청 본문에서 JSON 데이터를 읽기 위해 BufferedReader를 사용합니다.
        BufferedReader reader = request.getReader();
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }

        // 요청 본문으로부터 받은 JSON 데이터를 파싱하여 id 값을 추출합니다.
        JsonObject json = JsonParser.parseString(requestBody.toString()).getAsJsonObject();
        String id = json.get("id").getAsString();
        
        User user = userDao.getUser(id);
        
        // user의 permission을 T로 변경(유저 수락)
        user.setUserPermission("T");
        
        userDao.update(user);
	}

}
