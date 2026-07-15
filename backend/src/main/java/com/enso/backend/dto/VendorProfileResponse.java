package com.enso.backend.dto;

import java.time.LocalTime;

import com.enso.backend.model.ProfileResponse;

import lombok.AllArgsConstructor;


@AllArgsConstructor
public class VendorProfileResponse extends ProfileResponse {
    public String bio;
    public String businessName;
    public int experience;
    public String location;
    public LocalTime openTime;
    public LocalTime closeTime;

}
