package com.enso.backend.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.enso.backend.model.ServiceCategory;
import com.enso.backend.repository.ServiceCategoryRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ServiceCategoryRepository serviceCategoryRepository;

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
    }
}