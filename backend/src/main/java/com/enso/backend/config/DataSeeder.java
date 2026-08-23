package com.enso.backend.config;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.enso.backend.model.ServiceCategory;
import com.enso.backend.model.ServiceOffering;
import com.enso.backend.repository.ServiceCategoryRepository;
import com.enso.backend.repository.ServiceOfferingRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ServiceOfferingRepository serviceOfferingRepository;

    @Override
    public void run(String... args) throws Exception {

        // If Service Categories are empty in database.
        if (serviceCategoryRepository.count() == 0) {
            List<ServiceCategory> categories = List.of(
                // Home Services
                ServiceCategory.builder().code("ELECTRICIAN").displayName("Electrician").iconName("zap").build(),
                ServiceCategory.builder().code("PLUMBER").displayName("Plumber").iconName("droplets").build(),
                ServiceCategory.builder().code("CARPENTER").displayName("Carpenter").iconName("hammer").build(),
                ServiceCategory.builder().code("PAINTER").displayName("Painter").iconName("paintbrush").build(),
                ServiceCategory.builder().code("CLEANING").displayName("Cleaning").iconName("sparkles").build(),
                ServiceCategory.builder().code("PEST_CONTROL").displayName("Pest Control").iconName("bug").build(),
                ServiceCategory.builder().code("AC_REPAIR").displayName("AC Repair").iconName("air-vent").build(),
                ServiceCategory.builder().code("APPLIANCE_REPAIR").displayName("Appliance Repair").iconName("wrench").build(),
                ServiceCategory.builder().code("INTERIOR_DESIGN").displayName("Interior Design").iconName("layout-dashboard").build(),

                // Personal Services
                ServiceCategory.builder().code("SALON_BEAUTY").displayName("Salon & Beauty").iconName("scissors").build(),
                ServiceCategory.builder().code("FITNESS_TRAINER").displayName("Fitness Trainer").iconName("dumbbell").build(),
                ServiceCategory.builder().code("COOK").displayName("Cook").iconName("chef-hat").build(),
                ServiceCategory.builder().code("DRIVER").displayName("Driver").iconName("car").build(),
                ServiceCategory.builder().code("TUTOR").displayName("Tutor").iconName("book-open").build(),
                ServiceCategory.builder().code("SPORTS_TRAINER").displayName("Sports Trainer").iconName("trophy").build(),
                ServiceCategory.builder().code("HEALTHCARE").displayName("Healthcare").iconName("stethoscope").build(),
                ServiceCategory.builder().code("CARETAKER").displayName("Caretaker").iconName("heart-handshake").build(),

                // Business Services
                ServiceCategory.builder().code("SECURITY").displayName("Security").iconName("shield").build(),
                ServiceCategory.builder().code("PACKERS_MOVERS").displayName("Packers & Movers").iconName("truck").build(),
                ServiceCategory.builder().code("PHOTOGRAPHER").displayName("Photographer").iconName("camera").build(),
                ServiceCategory.builder().code("CATERING").displayName("Catering").iconName("utensils").build(),
                ServiceCategory.builder().code("IT_SUPPORT").displayName("IT Support").iconName("monitor").build(),
                ServiceCategory.builder().code("SOFTWARE_SOLUTIONS").displayName("Software Solutions").iconName("code").build(),

                // Products
                ServiceCategory.builder().code("HARDWARE_SHOP").displayName("Hardware Shop").iconName("store").build(),
                ServiceCategory.builder().code("GROCERY").displayName("Grocery").iconName("shopping-basket").build(),
                ServiceCategory.builder().code("MEDICAL_SUPPLIES").displayName("Medical Supplies").iconName("pill").build(),
                ServiceCategory.builder().code("HARDWARE").displayName("Hardware").iconName("cpu").build()
            );

            serviceCategoryRepository.saveAll(categories);
            System.out.println("Seeded " + categories.size() + " service categories.");
        }
    
    
         // Service offerings — loaded from bundled CSV, not hardcoded
        if (serviceOfferingRepository.count() == 0) {
            Map<String, ServiceCategory> categoryByCode = new HashMap<>();
            for (ServiceCategory c : serviceCategoryRepository.findAll()) {
                categoryByCode.put(c.getCode(), c);
            }

            List<ServiceOffering> offerings = new ArrayList<>();
            try (InputStream is = new ClassPathResource("data/service_offerings_enhanced.csv").getInputStream();
                 BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {

                String line = reader.readLine(); 
                while ((line = reader.readLine()) != null) {
                    if (line.isBlank()) continue;
                    String[] parts = line.split(",", 3);
                    String categoryCode = parts[0];
                    String serviceCode = parts[1];
                    String displayName = parts[2];

                    ServiceCategory category = categoryByCode.get(categoryCode);
                    if (category == null) {
                        System.out.println("Skipping unknown category code in CSV: " + categoryCode);
                        continue;
                    }

                    offerings.add(ServiceOffering.builder()
                            .category(category)
                            .code(serviceCode)
                            .displayName(displayName)
                            .build());
                }
            }

            serviceOfferingRepository.saveAll(offerings);
            System.out.println("Seeded " + offerings.size() + " service offerings.");
        
    }
    
    }
}