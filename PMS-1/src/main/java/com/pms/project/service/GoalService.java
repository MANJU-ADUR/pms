package com.pms.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pms.project.dao.EmployeeDao;
import com.pms.project.dao.GoalDao;
import com.pms.project.dto.ResponseStructure;
import com.pms.project.entity.Employee;
import com.pms.project.entity.Goal;
import com.pms.project.repo.GoalsRepository;

@Service
public class GoalService {

	@Autowired
	private GoalDao goalDao;

	@Autowired
	private EmployeeDao employeeDao;

	public ResponseEntity<ResponseStructure<Goal>> save(Goal goal, Long employee_id) {
		ResponseStructure<Goal> structure = new ResponseStructure<>();
		Optional<Employee> recEmp = employeeDao.findById(employee_id);
		if (recEmp.isPresent()) {
			Employee dbEmp = recEmp.get();
			dbEmp.getGoals().add(goal);
			goal.setEmployee(dbEmp);
			structure.setData(goalDao.save(goal));
			structure.setMessage("Goal Created");
			structure.setStatuscode(HttpStatus.CREATED.value());
			return new ResponseEntity<ResponseStructure<Goal>>(structure, HttpStatus.OK);
		}
		return null;

	}

	public ResponseEntity<ResponseStructure<String>> deletebyid(Long id) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		Optional<Goal> recGoal = goalDao.findbyid(id);
		if (recGoal.isPresent()) {
			goalDao.deletebyid(id);
			structure.setData("Deleted");
			structure.setMessage("Goal Found");
			structure.setStatuscode(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructure<String>>(structure, HttpStatus.OK);
		}
		return null;
	}

	public ResponseEntity<ResponseStructure<List<Goal>>> findby_emp_id(long emp_id) {
		ResponseStructure<List<Goal>> structure = new ResponseStructure<>();
		Optional<Employee> recemp = employeeDao.findById(emp_id);
		if (recemp.isPresent()) {
			List<Goal> goals = goalDao.findby_emp_id(emp_id);
			if (goals.size() > 0) {
				structure.setData(goals);
				structure.setMessage("Goals Found");
				structure.setStatuscode(HttpStatus.OK.value());
				return new ResponseEntity<ResponseStructure<List<Goal>>>(structure, HttpStatus.OK);
			}
			return null;
		}
		return null;

	}

}
