package com.pms.project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pms.project.dao.ManagerDao;
import com.pms.project.dto.ResponseStructure;
import com.pms.project.entity.Manager;

@Service
public class ManagerService {

	@Autowired
	private ManagerDao managerDao;

	public ResponseEntity<ResponseStructure<Manager>> save(Manager manager) {
		ResponseStructure<Manager> structure = new ResponseStructure<>();
		structure.setData(managerDao.save(manager));
		structure.setMessage("Manager saved");
		structure.setStatuscode(HttpStatus.CREATED.value());
		return new ResponseEntity<ResponseStructure<Manager>>(structure, HttpStatus.CREATED);
	}

	public ResponseEntity<ResponseStructure<Manager>> findByEmailAndPassword(String email, String password) {
		ResponseStructure<Manager> structure = new ResponseStructure<>();
		Optional<Manager> recManager=managerDao.findByEmailAndPassword(email, password);
		if (recManager.isPresent()) {
			structure.setData(recManager.get());
			structure.setMessage("Login Succesfull");
			structure.setStatuscode(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructure<Manager>>(structure, HttpStatus.OK);
		}
		return null;
	}

}
