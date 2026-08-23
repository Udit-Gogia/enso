package com.enso.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.enso.backend.dto.ServiceOfferingResponse;
import com.enso.backend.repository.ServiceOfferingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceOfferingService {

    private final ServiceOfferingRepository serviceOfferingRepository;

    public List<ServiceOfferingResponse> getOfferingsForCategory(String categoryCode) {
    return serviceOfferingRepository.findByCategory_CodeAndIsActiveTrue(categoryCode).stream()
            .map(o -> new ServiceOfferingResponse(
                    o.getId(), o.getCode(), o.getDisplayName(),
                    o.getCategory().getCode(), o.getCategory().getDisplayName()))
            .toList();
    }
}