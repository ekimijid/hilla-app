import { makeAutoObservable, observable } from 'mobx';
import {huStore} from "Frontend/stores/app-store";
import Food from "Frontend/generated/be/pxl/italent/hillaapp/data/entity/Food";
import FoodModel from "Frontend/generated/be/pxl/italent/hillaapp/data/entity/FoodModel";

class ListViewStore {
    filterText = '';
    selectedFood: Food | null = null;

    constructor() {
        makeAutoObservable(
            this,
            { selectedFood: observable.ref },
            { autoBind: true }
        );
    }

    editNew() {
        this.selectedFood = FoodModel.createEmptyValue();
    }

    cancelEdit() {
        this.selectedFood = null;
    }

    setSelectedFood(food:Food) {
        this.selectedFood = food;
    }

    async save(food:Food) {
        await huStore.saveFood(food);
        this.cancelEdit();
    }

    async delete() {
        if (this.selectedFood) {
            await huStore.deleteFood(this.selectedFood);
            this.cancelEdit();
        }
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    get filteredFoods() {
        const filter = new RegExp(this.filterText, 'i');
        const foods = huStore.foods;
        return foods.filter((food) =>
            filter.test(`${food.foodName} ${food.description}`)
        );
    }
}

export const listViewStore = new ListViewStore();