package com.jnerd.boot.config;

import com.jnerd.boot.spring.SerializableResourceBundleMessageSource;
import org.springframework.boot.autoconfigure.MessageSourceAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

/**
 * Custom Spring configuration.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@Configuration
@ConfigurationProperties(prefix = "spring.messages")
public class SpringConfig extends MessageSourceAutoConfiguration {

    @Bean
    public MessageSource messageSource() {
        SerializableResourceBundleMessageSource messageSource = new SerializableResourceBundleMessageSource();
        if (StringUtils.hasText(this.getBasename())) {
            messageSource.setBasenames(StringUtils.commaDelimitedListToStringArray(
                    StringUtils.trimAllWhitespace(this.getBasename())));
        }
        if (this.getEncoding() != null) {
            messageSource.setDefaultEncoding(this.getEncoding().name());
        }
        messageSource.setFallbackToSystemLocale(this.isFallbackToSystemLocale());
        messageSource.setCacheSeconds(this.getCacheSeconds());
        return messageSource;
    }

}
