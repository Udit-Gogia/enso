package com.enso.backend.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ServiceOfferingResponse {
    private UUID id;
    private String code;
    private String name;
    private String categoryCode;
    private String categoryName;
}