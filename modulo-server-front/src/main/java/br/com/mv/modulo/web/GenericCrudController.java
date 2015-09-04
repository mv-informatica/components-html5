package br.com.mv.modulo.web;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.mv.modulo.business.GenericCrudBusiness;
import br.com.mv.modulo.exception.GenericMessages;
import br.com.mv.modulo.model.type.EnumTipoMensagem;
import br.com.mv.modulo.repository.GenericCrudRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class GenericCrudController<T> {
	protected Page<T> page;
	protected final GenericMessages genericMessages;
	
	protected final GenericCrudBusiness<T, GenericCrudRepository<T>> genericCrudBusiness;
	
	private static final int DEFAULT_INITIAL_PAGINATION_PAGE = 0;
	private static final int DEFAULT_PAGINATION_SIZE = 7;
	private Type type = Arrays.stream(((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()).findFirst().get();
	private Class<?> clazz = (Class<?>) type;
	
	@Autowired
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public GenericCrudController(GenericMessages genericMessages, GenericCrudBusiness genericCrudBusiness) {
		this.genericMessages = genericMessages;
		this.genericCrudBusiness = genericCrudBusiness;
	}
	
	@RequestMapping(value={"/", "/list"}, method = RequestMethod.GET)
	public String tolist(Model model) {
		instantiateModel(model);
		page = null;
		model.addAttribute("page", page);
		return getListPageName();
	}
	
	@RequestMapping(value="/list", method = RequestMethod.POST)
	public String findModel(@ModelAttribute T t, Model model) {
		listModel(t, DEFAULT_INITIAL_PAGINATION_PAGE, DEFAULT_PAGINATION_SIZE, model);
		return getListPageName();
	}
	
	@RequestMapping(value="/listPaginated", method = RequestMethod.GET)
	public String findModelPaginated(@ModelAttribute T t, 
									 @RequestParam(value = "page", defaultValue = "") Integer page,
									 @RequestParam(value = "size", defaultValue = "") Integer size, 
									 @RequestParam(value = "idToRender", defaultValue = "") String idToRender,
									 Model model,
						 			 HttpServletRequest request) {
		listModel(t, page, size, model);
		if(isAjax(request)) {
			return getListPageName() + " :: #" + idToRender;
		} else {
			return getListPageName(); 
		}
	}
	
	protected boolean isAjax(HttpServletRequest request) {
		String header = request.getHeader("x-requested-with");
		return header != null && "XMLHttpRequest".equals(header);
	}
	
	private void listModel(T t, Integer page, Integer size, Model model) {
		this.page = genericCrudBusiness.listModel(t, getPageable(page, size));
		model.addAttribute("page", this.page);
		model.addAttribute(getModelName(), t);
	}
	
	@RequestMapping(value="/new", method = RequestMethod.GET)
	public String toNewForm(Model model) {
		instantiateModel(model);
		return getFormPageName();
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.GET)
	public String remove(@RequestParam(value = "id", required = true) Long id, RedirectAttributes redirectAttrs) {
		try {
			genericCrudBusiness.delete(id);
			redirectAttrs.addFlashAttribute(EnumTipoMensagem.SUCESSO.getDescricao(), genericMessages.getDeleteSuccess());
		} catch (IllegalArgumentException e) {
			redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), genericMessages.getNotFound());
			log.trace("Não foi encontrado:", e);
		} catch (Exception e) {
    		redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), e.getMessage());
    		log.error("Erro ao salvar:", e);
    	}
		
		return getReturnToListURL();
	}
	
	@RequestMapping(value="/edit", method = RequestMethod.GET)
	public String toEditForm(@RequestParam(value = "id", required = true) T t, Model model) {
		model.addAttribute(getModelName(), t);
		return getFormPageName();
	}
	
	@RequestMapping(value="/save", method = RequestMethod.POST)
	public String save(@ModelAttribute @Valid T t, final BindingResult bindingResult,
					   RedirectAttributes redirectAttrs, Model model, SessionStatus status) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("org.springframework.validation.BindingResult.strategy", bindingResult);
            model.addAttribute(getModelName(), t);
    		return getFormPageName();
        } else {
        	try {
        		genericCrudBusiness.save(t);
        		status.setComplete();
        		redirectAttrs.addFlashAttribute(EnumTipoMensagem.SUCESSO.getDescricao(), genericMessages.getSaveSuccess());
        	} catch (DataIntegrityViolationException e) {
        		redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), e.getMessage());
        		log.trace("Erro de integridade:", e);
    		} catch (Exception e) {
        		redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), e.getMessage());
        		log.error("Erro ao salvar:", e);
        	}
        }
        
        return getReturnToListURL();
	}
	
	protected String getReturnToListURL() {
		return "redirect:/" + getModelName() + "/returnToList";
	}
	
	private String getModelName() {
		return StringUtils.uncapitalize(clazz.getSimpleName());
	}
	
	@RequestMapping(value={"/returnToList"}, method = RequestMethod.GET)
	public String returnToListAndFindAll(Model model) {
		this.page = genericCrudBusiness.listModel(createNewObject(), getPageable(DEFAULT_INITIAL_PAGINATION_PAGE, DEFAULT_PAGINATION_SIZE));
		
		instantiateModel(model);
		model.addAttribute("page", this.page);
		return getListPageName();
	}
	
	protected void instantiateModel(Model model) {
		model.addAttribute(getModelName(), createNewObject());
	}
	
	@SuppressWarnings("unchecked")
	private T createNewObject() {
		T t = null;
		try {
			t = (T) clazz.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			log.error("Erro ao instanciar um objeto:", e);
		}
		return t;
	}
	
	protected Pageable getPageable(Integer page, Integer size) {
		Pageable pageable;
		if (StringUtils.isNotEmpty(getFieldToSortList())) {
			pageable = new PageRequest(page, size, Sort.DEFAULT_DIRECTION, getFieldToSortList());
		} else {
			pageable = new PageRequest(page, size);
		}
		return pageable;
	}
	
	protected String getFieldToSortList() {
		return null;
	}
	
	protected int getDefaultPaginationSize() {
		return DEFAULT_PAGINATION_SIZE;
	}
	
	protected String getListPageName() {
		return getModelUrlMapping() + "List";
	}

	protected String getFormPageName() {
		return getModelUrlMapping() + "Form";
	}
	
	private String getModelUrlMapping() {
		return getModelName() + "/" + getModelName();
	}
}