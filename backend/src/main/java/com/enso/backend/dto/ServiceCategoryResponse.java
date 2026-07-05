package com.enso.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ServiceCategoryResponse {
    private String code;
    private String name;
    private String iconName;
}
