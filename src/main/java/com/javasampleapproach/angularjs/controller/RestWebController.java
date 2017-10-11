package com.javasampleapproach.angularjs.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.javasampleapproach.angularjs.model.Employee;
import com.javasampleapproach.angularjs.model.EmployeeRepository;


@Transactional
@RestController
public class RestWebController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	List<Employee> emp = new ArrayList<Employee>();
	
	
	@RequestMapping(value = "/getallcustomer", method = RequestMethod.GET)
	public List<Employee> getResource(){
		emp = (ArrayList<Employee>)employeeRepository.findAll();
		return emp;
	}
	
	@RequestMapping(value="/postcustomer", method=RequestMethod.POST)
	public Employee postCustomer(@RequestBody Employee employee){
		//emp.add(employee);
		employee = (Employee) employeeRepository.save(employee);
		return employee;
		
	}
	
}