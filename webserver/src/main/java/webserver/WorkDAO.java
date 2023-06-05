package webserver;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class WorkDAO {
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
	
	public void goToWork(Work work) {
		open();
		String sql="INSERT INTO `work`(date, start_time, user_id) values(?,?,?)";
	
		try {
			pstmt=conn.prepareStatement(sql);
			Date date = Date.valueOf(work.getDate());
			pstmt.setDate(1, date);
			java.sql.Timestamp start_time = java.sql.Timestamp.valueOf(work.getStart_time());
			pstmt.setTimestamp(2, start_time);
			pstmt.setString(3, work.getUser_id());
			
			
			pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
	}
	
	public void getOffWork(Work work) {
		open();
		String sql="UPDATE `work` SET end_time=? where idx=?";
	
		try {
			pstmt=conn.prepareStatement(sql);
			java.sql.Timestamp end_time = java.sql.Timestamp.valueOf(work.getEnd_time());
			pstmt.setTimestamp(1, end_time);
			pstmt.setInt(2, work.getIDX());
						
			pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
	}
	
	public void setWorkTime(Work work) {
		open();
		String sql="UPDATE `work` SET work_time=? where idx=?";
	
		try {
			pstmt=conn.prepareStatement(sql);
			pstmt.setInt(1, work.getWork_time());
			pstmt.setInt(2, work.getIDX());
						
			pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
	}
	
	
	public List<Work> getAll(){
		open();
		List<Work> works = new ArrayList<>();
		
		try {
			pstmt = conn.prepareStatement("SELECT * FROM `work`");
			ResultSet rs = pstmt.executeQuery();
			
			while(rs.next()) {
				Work work = new Work();
				work.setIDX(rs.getInt("idx"));
				work.setDate(rs.getDate("date"));
				work.setUser_id(rs.getString("user_id"));
				if(rs.getTimestamp("start_time") != null) {
					work.setStart_time(rs.getTimestamp("start_time"));
				}
				if(rs.getTimestamp("end_time") != null) {
					work.setEnd_time(rs.getTimestamp("end_time"));
				}
				work.setWork_time(rs.getInt("work_time"));
				works.add(work);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
		return works;
	}
	
	
	public List<Work> getUserWork(String userID){
		open();
		List<Work> works = new ArrayList<>();
		
		try {
			pstmt = conn.prepareStatement("SELECT * FROM `work` WHERE user_id=?");
			pstmt.setString(1, userID);
			ResultSet rs = pstmt.executeQuery();
			
			while(rs.next()) {
				Work work = new Work();
				work.setIDX(rs.getInt("idx"));
				work.setDate(rs.getDate("date"));
				work.setUser_id(rs.getString("user_id"));
				if(rs.getTimestamp("start_time") != null) {
					work.setStart_time(rs.getTimestamp("start_time"));
				}
				if(rs.getTimestamp("end_time") != null) {
					work.setEnd_time(rs.getTimestamp("end_time"));
				}
				work.setWork_time(rs.getInt("work_time"));
				works.add(work);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
		return works;
	}
	
	
	public List<Work> getUserDateWork(String userID, LocalDate localDate){
		open();
		List<Work> works = new ArrayList<>();
		
		try {
			pstmt = conn.prepareStatement("SELECT * FROM `work` WHERE user_id=? and date=?");
			pstmt.setString(1, userID);
			pstmt.setDate(2, Date.valueOf(localDate));
			ResultSet rs = pstmt.executeQuery();
			
			while(rs.next()) {
				Work work = new Work();
				work.setIDX(rs.getInt("idx"));
				work.setDate(rs.getDate("date"));
				work.setUser_id(rs.getString("user_id"));
				if(rs.getTimestamp("start_time") != null) {
					work.setStart_time(rs.getTimestamp("start_time"));
				}
				if(rs.getTimestamp("end_time") != null) {
					work.setEnd_time(rs.getTimestamp("end_time"));
				}
				work.setWork_time(rs.getInt("work_time"));
				works.add(work);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			close();
		}
		return works;
	}
}
