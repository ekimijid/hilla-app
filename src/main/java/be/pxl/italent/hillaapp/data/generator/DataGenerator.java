package be.pxl.italent.hillaapp.data.generator;
import be.pxl.italent.hillaapp.data.entity.Food;
import be.pxl.italent.hillaapp.data.repository.Foodrepository;
import com.vaadin.exampledata.DataType;
import com.vaadin.exampledata.ExampleDataGenerator;
import com.vaadin.flow.spring.annotation.SpringComponent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.List;

@SpringComponent
public class DataGenerator {
    @Bean
    public CommandLineRunner loadData(Foodrepository foodrepository) {

        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (foodrepository.count() != 0L) {
                logger.info("Using existing database");
                return;
            }
            int seed = 123;

            logger.info("Generating demo data");
            ExampleDataGenerator<Food> generator = new ExampleDataGenerator<>(Food.class, LocalDateTime.now());
            generator.setData(Food::setFoodName, DataType.FOOD_PRODUCT_NAME);
            generator.setData(Food::setDescription, DataType.FOOD_PRODUCT_NAME);
            generator.setData(Food::setImage, DataType.FOOD_PRODUCT_IMAGE);
            generator.setData(Food::setPrijs, DataType.PRICE);
            List<Food> foods = foodrepository.saveAll(generator.create(50, seed));
            foods.forEach(System.out::println);

        };
    }
}
