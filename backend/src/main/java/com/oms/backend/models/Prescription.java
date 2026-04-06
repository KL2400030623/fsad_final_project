package com.oms.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "prescriptions")
public class Prescription {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String patient;
  private String doctor;
  private String date;
  private String diagnosis;
  private String medication;
  private String dosage;
  private Double quantity;
  private String instructions;
  private String status = "Pending Fulfillment";
  private String pharmacistNote;
  private Double unitPrice;
  private Double totalCost;

  public Prescription() {
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getPatient() { return patient; }
  public void setPatient(String patient) { this.patient = patient; }

  public String getDoctor() { return doctor; }
  public void setDoctor(String doctor) { this.doctor = doctor; }

  public String getDate() { return date; }
  public void setDate(String date) { this.date = date; }

  public String getDiagnosis() { return diagnosis; }
  public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

  public String getMedication() { return medication; }
  public void setMedication(String medication) { this.medication = medication; }

  public String getDosage() { return dosage; }
  public void setDosage(String dosage) { this.dosage = dosage; }

  public Double getQuantity() { return quantity; }
  public void setQuantity(Double quantity) { this.quantity = quantity; }

  public String getInstructions() { return instructions; }
  public void setInstructions(String instructions) { this.instructions = instructions; }

  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }

  public String getPharmacistNote() { return pharmacistNote; }
  public void setPharmacistNote(String pharmacistNote) { this.pharmacistNote = pharmacistNote; }

  public Double getUnitPrice() { return unitPrice; }
  public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }

  public Double getTotalCost() { return totalCost; }
  public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }
}
