package webserver;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "FindPW", urlPatterns = { "/FindPW" })
public class FindPW extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    request.setCharacterEncoding("UTF-8");
	    String id = request.getParameter("id");
	    String name = request.getParameter("name");
	    String phone = request.getParameter("phone");

	    UserDAO userDAO = new UserDAO();
	    User user = userDAO.getUser(id);

	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");

	    PrintWriter out = response.getWriter();

	    if (user != null && isNameAndPhoneMatch(user, name, phone)) {
	        String username = user.getUserID();
	        String password = user.getUserPW();
	        String maskedPassword = maskPassword(password);

	        String jsonResponse = "{\"userName\":\"" + username + "\",\"userPW\":\"" + maskedPassword + "\"}";
	        out.print(jsonResponse);
	    } else {
	        out.print("{}");
	    }

	    out.flush();
	}

	private boolean isNameAndPhoneMatch(User user, String name, String phone) {
	    String userName = user.getUserName();
	    String userPhone = user.getUserPhone();

	    return userName != null && userPhone != null && userName.equals(name) && userPhone.equals(phone);
	}

    private String maskPassword(String password) {
        int length = password.length();
        String masked = password.substring(0, 2) + "*".repeat(length - 4) + password.substring(length - 2);
        return masked;
    }
}
