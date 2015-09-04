package br.com.mv.modulo.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.mv.geral.model.Versao;
import br.com.mv.modulo.repository.VersaoRepository;

@Service
@Transactional(readOnly = true)
public class VersaoBusiness {

	@Autowired
	VersaoRepository versaoRepository;

	public Versao getVersao() {
		return versaoRepository.findOne(1L);
	}

}
