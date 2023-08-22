package webserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/FindID")
public class FindID extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String name = request.getParameter("name");
        String phone = request.getParameter("phone");
        
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

        UserDAO userDAO = new UserDAO();
        List<User> userList = userDAO.getAll();
        List<String> foundIDs = new ArrayList<>();
        for (User user : userList) {
            if (user.getUserName().equals(name) && user.getUserPhone().equals(phone)) {
                foundIDs.add(user.getUserID());
            }
        }

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        if (foundIDs.isEmpty()) {
            out.print("해당하는 아이디가 없습니다.");
        } else {
            out.print("찾은 아이디: ");
            for (int i = 0; i < foundIDs.size(); i++) {
                out.print(foundIDs.get(i));
                if (i < foundIDs.size() - 1) {
                    out.print(", ");
                }
            }
        }
        out.flush();
    }
}
