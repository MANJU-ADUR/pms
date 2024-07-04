package com.pms.project.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pms.project.entity.Goal;

public interface GoalsRepository extends JpaRepository<Goal, Long> {

	@Query("select g from Goal g where g.employee.id=?1")
	List<Goal> findByEmployeeId(long employee_id);

}
