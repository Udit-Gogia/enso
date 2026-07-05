package com.enso.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.enso.backend.dto.ServiceCategoryResponse;
import com.enso.backend.repository.ServiceCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceCategoryService {

    private final ServiceCategoryRepository serviceCategoryRepository;

    

    public List<ServiceCategoryResponse> getActiveServiceCategories() {
        return serviceCategoryRepository.findByIsActiveTrue().stream()
                .map(serviceCategory -> new ServiceCategoryResponse(serviceCategory.getCode(),
                        serviceCategory.getDisplayName(), serviceCategory.getIconName()))
                .toList();
    }

}
