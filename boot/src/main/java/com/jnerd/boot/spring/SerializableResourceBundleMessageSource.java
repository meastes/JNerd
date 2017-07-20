package com.jnerd.boot.spring;

import org.springframework.context.support.ResourceBundleMessageSource;

import java.util.*;

/**
 * Message source that can output all available messages for a given locale.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class SerializableResourceBundleMessageSource extends ResourceBundleMessageSource {

    // Need to override the basename properties so that we have access to them in the getAll() method
    private String basename;
    private String[] basenames;

    /**
     * Returns all language messages in a Map. Messages will also have arguments converted to use double curly braces.
     *
     * @param locale The locale to get messages for
     * @return Map of all language messages
     */
    public Map<String, String> getAll(Locale locale) {
        Map<String, String> messages = new HashMap<>();
        String basename = this.basename != null ? this.basename : this.basenames[0];
        ResourceBundle resourceBundle = this.doGetBundle(basename, locale);
        List<String> keys = Collections.list(resourceBundle.getKeys());
        for (String key : keys) {
            messages.put(key, convertArgs(resourceBundle.getString(key)));
        }
        return messages;
    }

    private String convertArgs(String message) {
        return message.replaceAll("(\\{)(\\d)(\\})", "{{arg$2}}");
    }

    @Override
    public void setBasename(String basename) {
        super.setBasename(basename);
        this.basename = basename;
    }

    @Override
    public void setBasenames(String... basenames) {
        super.setBasenames(basenames);
        this.basenames = basenames;
    }
}
