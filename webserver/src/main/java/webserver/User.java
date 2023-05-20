package webserver;
import java.sql.Date;

public class User {
	private String userID;
	private String userPW;
	
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getUserPW() {
		return userPW;
	}
	public void setUserPW(String userPW) {
		this.userPW = userPW;
	}
	public User() {
		// TODO Auto-generated constructor stub
		this.userID=null;
		this.userPW=null;
	}
	public User(String id, String pw) {
		// TODO Auto-generated constructor stub
		this.userID=id;
		this.userPW=pw;
	}
}
