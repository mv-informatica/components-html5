package br.com.mv.modulo.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import br.com.mv.modulo.exception.GenericException;
import br.com.mv.modulo.repository.GenericCrudRepository;

public abstract class GenericCrudBusiness<T, D extends GenericCrudRepository<T>> {
	
	protected final D repository;

	@Autowired
	public GenericCrudBusiness(D repository) {
		this.repository = repository;
	}
	
	@Transactional
	public void delete(Long id) throws GenericException {
		repository.delete(id);  
	}
	
	@Transactional
	public void save(T t) throws GenericException {
		repository.save(t);
 	}
	
	public abstract Page<T> listModel(T t, Pageable pageable);
}