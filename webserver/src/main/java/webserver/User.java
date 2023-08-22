package webserver;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Objects;

public class User {
	private String userID;
	private String userPW;
	private String userName;
	private String userPhone;
	private int userWage;
	private String userJob;
	private String userAdmin;
	private String userPermission;
	private LocalDate applyDate;
	
	public boolean isAdmin() {
	    return Objects.equals(this.getUserAdmin(), "employer");
	}
	public boolean isPermit() {
		return Objects.equals(this.getUserPermission(), "T");
	}

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
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	public int getUserWage() {
		return userWage;
	}
	public void setUserWage(int userWage) {
		this.userWage = userWage;
	}
	public String getUserJob() {
		return userJob;
	}
	public void setUserJob(String userJob) {
		this.userJob = userJob;
	}
	public String getUserAdmin() {
		return userAdmin;
	}
	public void setUserAdmin(String userAdmin) {
		this.userAdmin = userAdmin;
	}
	public String getUserPermission() {
		return userPermission;
	}
	public void setUserPermission(String userPermission) {
		this.userPermission = userPermission;
	}
	
	public LocalDate getApplyDate() {
		return applyDate;
	}
	public void setDate(LocalDate applyDate) {
		this.applyDate = applyDate;
	}
	public void setApplyDate() {
		LocalDate d = LocalDate.now();
		this.applyDate = d;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate.toLocalDate();
	}
	
	
	public User() {
		this.userID = null;
		this.userPW = null;
		this.userPhone = null;
		this.userWage = 0;
		this.userJob = null;
		this.userAdmin = null;
	}
	public User(String id, String pw, String phone, int wage, String job, String admin) {
		this.userID = id;
		this.userPW = pw;
		this.userPhone = phone;
		this.userWage = wage;
		this.userJob = job;
		this.userAdmin = admin;
	}
}
