package com.enso.backend.model;


import com.enso.backend.dto.AdminProfileResponse;
import com.enso.backend.dto.CustomerProfileResponse;
import com.enso.backend.dto.VendorProfileResponse;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.Getter;

@Getter
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "role"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = CustomerProfileResponse.class, name= "CUSTOMER"),
    @JsonSubTypes.Type(value = VendorProfileResponse.class, name= "VENDOR"),
     @JsonSubTypes.Type(value = AdminProfileResponse.class, name= "ADMIN")
})
public abstract class ProfileResponse {
    private String name;
    private String email;
    private String phone;
    private String profileComplete;

}
