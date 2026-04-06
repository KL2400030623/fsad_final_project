package com.oms.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointments")
public class Appointment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String patient;
  private String doctor;
  private String date;
  private String time;
  private String reason;
  private String status = "Pending";
  private String meetingLink;
  private String consultationNote;

  public Appointment() {
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getPatient() { return patient; }
  public void setPatient(String patient) { this.patient = patient; }

  public String getDoctor() { return doctor; }
  public void setDoctor(String doctor) { this.doctor = doctor; }

  public String getDate() { return date; }
  public void setDate(String date) { this.date = date; }

  public String getTime() { return time; }
  public void setTime(String time) { this.time = time; }

  public String getReason() { return reason; }
  public void setReason(String reason) { this.reason = reason; }

  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }

  public String getMeetingLink() { return meetingLink; }
  public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }

  public String getConsultationNote() { return consultationNote; }
  public void setConsultationNote(String consultationNote) { this.consultationNote = consultationNote; }
}
