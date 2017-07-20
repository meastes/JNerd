package com.jnerd.boot.rest.dto;

/**
 * DTO for holding error information.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class RestErrorDTO {

    private String detail;
    private String code;

    public RestErrorDTO() {
    }

    public RestErrorDTO(String code, String detail) {
        this.detail = detail;
        this.code = code;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
