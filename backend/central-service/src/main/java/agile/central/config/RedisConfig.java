package agile.central.config;


import org.springframework.context.annotation.*;
import org.springframework.data.redis.connection.lettuce.*;
import org.springframework.data.redis.core.*;

@Configuration
public class RedisConfig {

    @Bean
    LettuceConnectionFactory lettuceConfigFactory() {
        LettuceConnectionFactory lcf = new LettuceConnectionFactory("localhost", 6379);
        lcf.afterPropertiesSet();
        return lcf;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {

        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(lettuceConfigFactory());
        return template;
    }
}
