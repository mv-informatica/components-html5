package br.com.mv.modulo.config;


public abstract class DatabaseConfig {
	
//	@Bean
//    public abstract DataSource dataSource();
//
//    protected void configureDataSource(org.apache.tomcat.jdbc.pool.DataSource dataSource) {
//        dataSource.setMaxActive(3);
//        dataSource.setMaxIdle(3);
//        dataSource.setMinIdle(1);
//        dataSource.setInitialSize(1);
//        dataSource.setTestOnBorrow(false);
//        dataSource.setTestOnReturn(false);
//    }
}


//@Configuration
//@Profile(ModuloProfiles.TESTE)
//class StandaloneDatabaseConfig extends DatabaseConfig {
//
//    @Bean
//    public DataSource dataSource() {
//    	
//    	URI dbUri = null;
//		try {
//			dbUri = new URI(System.getenv("DATABASE_URL"));
//		} catch (URISyntaxException e) {
//			e.printStackTrace();
//		}
//
//		String username = dbUri.getUserInfo().split(":")[0];
//        String password = dbUri.getUserInfo().split(":")[1];
//        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
//        
//        org.apache.tomcat.jdbc.pool.DataSource dataSource = new org.apache.tomcat.jdbc.pool.DataSource();
//
////        dataSource.setDriverClassName("org.h2.Driver");
//        dataSource.setUrl(dbUrl);
//        dataSource.setUsername(username);
//        dataSource.setPassword(password);
//        dataSource.setValidationQuery("SELECT 1");
//
//        configureDataSource(dataSource);
//
//        return dataSource;
//    }
//}
//
//@Configuration
//@Profile(ModuloProfiles.DEFAULT)
//class DefaultDatabaseConfig extends DatabaseConfig {
//
//    @Bean
//    public DataSource dataSource() {
//        org.apache.tomcat.jdbc.pool.DataSource dataSource = new org.apache.tomcat.jdbc.pool.DataSource();
//
//        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
//        dataSource.setUrl("jdbc:oracle:thin:@192.168.254.17:1521:dev4");
//        dataSource.setUsername("dbamvfor");
//        dataSource.setPassword("dbamvfor");
//        dataSource.setValidationQuery("SELECT 1");
//
//        configureDataSource(dataSource);
//
//        return dataSource;
//    }
//}