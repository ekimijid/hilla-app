package be.pxl.italent.hillaapp.data.repository;

import be.pxl.italent.hillaapp.data.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Foodrepository extends JpaRepository<Food, Long> {
}
