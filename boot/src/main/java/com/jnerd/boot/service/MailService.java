package com.jnerd.boot.service;

import com.jnerd.boot.model.user.User;
import org.apache.commons.lang3.CharEncoding;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import javax.inject.Inject;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Service to handle sending emails.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@Service
public class MailService {

    private static final Log LOG = LogFactory.getLog(MailService.class);

    private JavaMailSender javaMailSender;
    private SpringTemplateEngine templateEngine;

    @Value("${jnerd.mail.from}") private String from;
    @Value("${jnerd.mail.subject.activation}") private String subjectActivation;
    @Value("${jnerd.mail.subject.passwordreset}") private String subjectPasswordReset;
    @Value("${jnerd.baseUrl}") private String baseUrl;

    @Inject
    public MailService(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendActivationEmail(User user) {
        Context context = getEmailContext(user);
        String email = this.templateEngine.process("activation", context);
        sendEmail(user.getEmail(), this.subjectActivation, email, false, true);
        LOG.debug(String.format("Sent activation email to %s", user.getEmail()));
    }

    @Async
    public void sendPasswordResetEmail(User user) {
        Context context = getEmailContext(user);
        String email = this.templateEngine.process("passwordReset", context);
        sendEmail(user.getEmail(), this.subjectPasswordReset, email, false, true);
        LOG.debug(String.format("Send password reset email to %s", user.getEmail()));
    }

    @Async
    private void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, CharEncoding.UTF_8);
            message.setTo(to);
            message.setFrom(this.from);
            message.setSubject(subject);
            message.setText(content, isHtml);
            this.javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOG.error("Unable to send message", e);
        }
    }

    private Context getEmailContext(User user) {
        Context context = new Context();
        context.setVariable("user", user);
        context.setVariable("baseUrl", this.baseUrl);
        return context;
    }

}
