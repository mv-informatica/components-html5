package br.com.mv.modulo.config;


//@Configuration
public class EmbeddedRedisConfiguration {

//	@Bean
//    public static RedisServerBean redisServer() {
//        return new RedisServerBean();
//    }

    /**
     * Implements BeanDefinitionRegistryPostProcessor to ensure this Bean
     * is initialized before any other Beans. Specifically, we want to ensure
     * that the Redis Server is started before RedisHttpSessionConfiguration
     * attempts to enable Keyspace notifications.
     */
//    static class RedisServerBean implements InitializingBean, DisposableBean, BeanDefinitionRegistryPostProcessor {
//        private RedisServer redisServer;
//
//        public void afterPropertiesSet() throws Exception {
//            redisServer = new RedisServer(Protocol.DEFAULT_PORT);
//            redisServer.start();
//        }
//
//        public void destroy() throws Exception {
//            if(redisServer != null) {
//                redisServer.stop();
//            }
//        }
//
//        @Override
//        public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {}
//
//        @Override
//        public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {}
//    }
}
