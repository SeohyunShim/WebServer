package webserver;

import java.security.Timestamp;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Work {
	private int IDX;
	private LocalDate date;
	private LocalDateTime start_time;
	private LocalDateTime end_time;
	private Integer work_time;
	private String user_id;
	
	
	public int getIDX() {
		return IDX;
	}
	public void setIDX(int iDX) {
		IDX = iDX;
	}
	
	
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public void setDate() {
		LocalDate d = LocalDate.now();
		this.date = d;
	}
	public void setDate(Date date) {
		this.date = date.toLocalDate();
	}
	
	
	public LocalDateTime getStart_time() {
		return start_time;
	}
	public void setStart_time() {
		this.start_time = LocalDateTime.now();
	}
	public void setStart_time(java.sql.Timestamp timestamp) {
		this.start_time = timestamp.toLocalDateTime();
	}

	
	
	public LocalDateTime getEnd_time() {
		return end_time;
	}
	public void setEnd_time() {
		this.end_time = LocalDateTime.now();
	}
	public void setEnd_time(java.sql.Timestamp timestamp) {
		this.end_time = timestamp.toLocalDateTime();
	}
	
	
	public Integer getWork_time() {
		return work_time;
	}
	public void setWork_time(Integer work_time) {
		this.work_time = work_time;
	}
	
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
}
