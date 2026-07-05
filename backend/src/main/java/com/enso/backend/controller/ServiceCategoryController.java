package com.enso.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enso.backend.dto.ServiceCategoryResponse;
import com.enso.backend.service.ServiceCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class ServiceCategoryController {

    private final ServiceCategoryService serviceCategoryService;
    
    @GetMapping("/active")
    public  ResponseEntity<List<ServiceCategoryResponse>> getActiveServiceCategories() {
        return ResponseEntity.ok(serviceCategoryService.getActiveServiceCategories());
    }

    @GetMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<ServiceCategoryResponse>> getAllServiceCategories() {
        // TODO: return all categories including inactive
        return ResponseEntity.ok(serviceCategoryService.getActiveServiceCategories());
    }

}
