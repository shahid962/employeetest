package com.javasampleapproach.angularjs.model;


import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface EmployeeRepository extends CrudRepository<Employee,Long>
{

	//public Employee findByEmployee(String empno);
}
