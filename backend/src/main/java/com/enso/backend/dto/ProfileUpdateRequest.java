package com.enso.backend.dto;

import lombok.Data;
import org.openapitools.jackson.nullable.JsonNullable;
import java.util.List;

@Data
public class ProfileUpdateRequest {
    private JsonNullable<String> phone = JsonNullable.undefined();
    private JsonNullable<String> location = JsonNullable.undefined();
    private JsonNullable<String> profilePhotoUrl = JsonNullable.undefined();

    private JsonNullable<String> preferredLocation = JsonNullable.undefined();

    private JsonNullable<String> bio = JsonNullable.undefined();
    private JsonNullable<String> businessName = JsonNullable.undefined();
    private JsonNullable<Integer> yearsOfExperience = JsonNullable.undefined();
    private JsonNullable<String> openTime = JsonNullable.undefined();
    private JsonNullable<String> closeTime = JsonNullable.undefined();
    private JsonNullable<List<String>> categoryCodes = JsonNullable.undefined();
}