package com.jnerd.boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.Date;

/**
 * Defines an entity that will be tracked with audit data.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@MappedSuperclass
@Audited
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditableEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @CreatedBy
    @JsonIgnore
    @Column(nullable = false, length = 50, updatable = false)
    private String createdBy;

    @CreatedDate
    @JsonIgnore
    @Column(nullable = false)
    private Date createdDate;

    @LastModifiedBy
    @JsonIgnore
    @Column(length = 50)
    private String lastModifiedBy;

    @LastModifiedDate
    @JsonIgnore
    private Date lastModifiedDate;

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
}
