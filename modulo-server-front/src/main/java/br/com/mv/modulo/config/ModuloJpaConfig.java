/*
 * Copyright 2015 MV Informática.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package br.com.mv.modulo.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories({"br.com.mv.modulo.repository"})
public class ModuloJpaConfig extends HibernateJpaAutoConfiguration {

	@Override
	protected String[] getPackagesToScan() {
		List<String> packages = new ArrayList<String>();
		packages.add("org.springframework.data.jpa.domain.support");
		packages.add("br.com.mv.geral.model");
		packages.add("br.com.mv.security.model");
		packages.add("br.com.mv.modulo.model");
		packages.addAll(Arrays.asList(super.getPackagesToScan()));
		return  packages.toArray(new String[0]);
	}

}
