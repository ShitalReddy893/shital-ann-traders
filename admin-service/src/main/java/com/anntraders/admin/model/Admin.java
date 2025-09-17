package com.anntraders.admin.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admins")
@Getter
@Setter
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;
	private String email;
	private String role;

	public Admin() {
	}

	public Admin(String username, String email, String role) {
		this.username = username;
		this.email = email;
		this.role = role;
	}

	
}
