package com.enso.backend.dto;

import com.enso.backend.model.ProfileResponse;

import lombok.AllArgsConstructor;


@AllArgsConstructor
public class CustomerProfileResponse extends ProfileResponse {
    public String preferredLocation;

}
