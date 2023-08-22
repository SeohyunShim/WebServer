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
		String sql="INSERT INTO `user`(ID, PW, NAME, PHONE_NUM, HOURLY_WAGE, JOB, ADMIN, PERMISSION, APPLY_DATE) values(?,?,?,?,?,?,?,?,?)";
	
		try {
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1, user.getUserID());
			pstmt.setString(2, user.getUserPW());
			pstmt.setString(3, user.getUserName());
			pstmt.setString(4, user.getUserPhone());
			pstmt.setInt(5, user.getUserWage());
			pstmt.setString(6, user.getUserJob());
			pstmt.setString(7, user.getUserAdmin());
			pstmt.setString(8, user.getUserPermission());
			Date applyDate = Date.valueOf(user.getApplyDate());
			pstmt.setDate(9, applyDate);
			
			pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
	}
	
	public void delete(String ID) {
		open();
		String sql="DELETE FROM `user` WHERE ID = ?";
		
		try {
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1, ID);
			
			pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
	}
	
	public void update(User user) {
		open();
		String sql="UPDATE `user` SET PW=?, NAME=?, PHONE_NUM=?, HOURLY_WAGE=?, JOB=?, ADMIN=?, PERMISSION=? WHERE ID=?";
	
		try {
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1, user.getUserPW());
			pstmt.setString(2, user.getUserName());
			pstmt.setString(3, user.getUserPhone());
			pstmt.setInt(4, user.getUserWage());
			pstmt.setString(5, user.getUserJob());
			pstmt.setString(6, user.getUserAdmin());
			pstmt.setString(7, user.getUserPermission());
			pstmt.setString(8, user.getUserID());
						
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
			pstmt = conn.prepareStatement("select * from `user`");
			ResultSet rs = pstmt.executeQuery();
			
			while(rs.next()) {
				User user = new User();
				user.setUserID(rs.getString("ID"));
				user.setUserPW(rs.getString("PW"));
				user.setUserName(rs.getString("NAME"));
				user.setUserPhone(rs.getString("PHONE_NUM"));
				user.setUserWage(rs.getInt("HOURLY_WAGE"));
				user.setUserJob(rs.getString("JOB"));
				user.setUserAdmin(rs.getString("ADMIN"));
				user.setUserPermission(rs.getString("PERMISSION"));
				if(rs.getDate("APPLY_DATE") != null) {
					user.setApplyDate(rs.getDate("APPLY_DATE"));
				}
				
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
			String sql = "select * from `user` where ID = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userID);
			ResultSet rs = pstmt.executeQuery();
			
			if(rs.next()) {
				User u= new User();
				u.setUserID(rs.getString("ID"));
				u.setUserPW(rs.getString("PW"));
				u.setUserName(rs.getString("NAME"));
				u.setUserPhone(rs.getString("PHONE_NUM"));
				u.setUserWage(rs.getInt("HOURLY_WAGE"));
				u.setUserJob(rs.getString("JOB"));
				u.setUserAdmin(rs.getString("ADMIN"));
				u.setUserPermission(rs.getString("PERMISSION"));
				if(rs.getDate("APPLY_DATE") != null) {
					u.setApplyDate(rs.getDate("APPLY_DATE"));
				}
				
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
			String sql = "select * from `user` where ID = ? and PW = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userID);
			pstmt.setString(2, userPW);
			ResultSet rs = pstmt.executeQuery();
			
			if(rs.next()) {
				User u = new User();
				u.setUserID(rs.getString("ID"));
				u.setUserPW(rs.getString("PW"));
				u.setUserName(rs.getString("NAME"));
				u.setUserPhone(rs.getString("PHONE_NUM"));
				u.setUserWage(rs.getInt("HOURLY_WAGE"));
				u.setUserJob(rs.getString("JOB"));
				u.setUserAdmin(rs.getString("ADMIN"));
				u.setUserPermission(rs.getString("PERMISSION"));
				
				user = u;
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
		return user;
	}
}
