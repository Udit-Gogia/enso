// dto/CustomerProfileResponse.java
package com.enso.backend.dto;

import com.enso.backend.model.ProfileResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor
public class CustomerProfileResponse extends ProfileResponse {
    private String preferredLocation;
}