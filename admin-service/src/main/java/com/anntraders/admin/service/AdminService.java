package com.anntraders.admin.service;

import com.anntraders.admin.model.Admin;
import com.anntraders.admin.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

	private final AdminRepository repository;

	public AdminService(AdminRepository repository) {
		this.repository = repository;
	}

	public List<Admin> getAllAdmins() {
		return repository.findAll();
	}

	public Admin getAdminById(Long id) {
		return repository.findById(id).orElse(null);
	}

	public Admin saveAdmin(Admin admin) {
		return repository.save(admin);
	}

	public void deleteAdmin(Long id) {
		repository.deleteById(id);
	}
}
