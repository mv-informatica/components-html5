package br.com.mv.modulo.repository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mv.geral.model.Versao;

@Repository
public interface VersaoRepository extends JpaRepository<Versao, Long> {

	@Cacheable("versao")
	public Versao findOne(Long id);
}
