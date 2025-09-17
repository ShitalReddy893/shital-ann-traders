package com.anntraders.admin.controller;

import com.anntraders.admin.model.Admin;
import com.anntraders.admin.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "*")
public class AdminController {

	private final AdminService service;

	public AdminController(AdminService service) {
		this.service = service;
	}

	@GetMapping
	public List<Admin> getAllAdmins() {
		return service.getAllAdmins();
	}

	@GetMapping("/{id}")
	public Admin getAdmin(@PathVariable Long id) {
		return service.getAdminById(id);
	}

	@PostMapping
	public Admin addAdmin(@RequestBody Admin admin) {
		return service.saveAdmin(admin);
	}

	@DeleteMapping("/{id}")
	public void deleteAdmin(@PathVariable Long id) {
		service.deleteAdmin(id);
	}
}
