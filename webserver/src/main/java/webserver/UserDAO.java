package webserver;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {
	Connection conn = null;
	PreparedStatement pstmt;
	
	final String JDBC_DRIVER = "org.h2.Driver";
	final String JDBC_URL = "jdbc:h2:tcp://localhost/~/webserverdb";
	
	public void open() {
		try {
			Class.forName(JDBC_DRIVER);
			conn=DriverManager.getConnection(JDBC_URL, "admin", "admin");
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public void close() {
		try {
			pstmt.close();
			conn.close();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insert(User user) {
		open();
		String sql="INSERT INTO employee(userID, userPW) values(?,?)";
	
		try {
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1, user.getUserID());
			pstmt.setString(2, user.getUserPW());
			
			pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
	}
	
	public List<User> getAll(){
		open();
		List<User> users = new ArrayList<>();
		
		try {
			pstmt = conn.prepareStatement("select * from employee");
			ResultSet rs = pstmt.executeQuery();
			
			while(rs.next()) {
				User user = new User();
				user.setUserID(rs.getString("userID"));
				user.setUserPW(rs.getString("userPW"));
				
				users.add(user);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
		return users;
	}
	
	public User getUser(String userID){
		open();
		User user = new User();
		try {
			String sql = "select * from employee where userID = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userID);
			ResultSet rs = pstmt.executeQuery();
			
			if(rs.next()) {
				User u= new User();
				u.setUserID(rs.getString("userID"));
				u.setUserPW(rs.getString("userPW"));
				
				user=u;
				}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
		return user;
	}
	
	public User loginUser(String userID, String userPW) {
		open();
		User user = new User();
		try {
			String sql = "select * from employee where userID = ? and userPW = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userID);
			pstmt.setString(2, userPW);
			ResultSet rs = pstmt.executeQuery();
			
			if(rs.next()) {
				User u= new User();
				u.setUserID(rs.getString("userID"));
				u.setUserPW(rs.getString("userPW"));
				
				user=u;
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
		return user;
	}
}
