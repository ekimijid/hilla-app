
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { uiStore } from './app-store';
import { cacheable } from './cachable';
import {FoodEndpoint} from "Frontend/generated/endpoints";
import Food from "Frontend/generated/be/pxl/italent/hillaapp/data/entity/Food";
import FoodDataModel from "Frontend/generated/be/pxl/italent/hillaapp/data/endpoint/FoodEndpoint/FoodDataModel";


export class HuStore {
  foods: Food []=[];

  constructor() {
    makeAutoObservable(
      this,
      {
        initFromServer: false,
        foods: observable.shallow,
      },
      { autoBind: true }
    );

    this.initFromServer();
  }

  async initFromServer() {
    const data = await cacheable(
      FoodEndpoint.getFoodData,
      'food',
      FoodDataModel.createEmptyValue()
    );

    runInAction(() => {
     this.foods=data.foods;
    });
  }

  async saveFood(food:Food) {
    try {
      const saved = await FoodEndpoint.saveFood(food);
      if (saved) {
        this.saveLocal(saved);
        uiStore.showSuccess('Food saved.');
      } else {
        uiStore.showError('Food save failed.');
      }
    } catch (e) {
      console.log(e);
      uiStore.showError('Food save failed.');
    }
  }

  async deleteFood(food:Food) {
    if (!food.id) return;

    try {
      await FoodEndpoint.deleteFood(food);
      this.deleteLocal(food);
      uiStore.showSuccess('Food deleted.');
    } catch (e) {
      uiStore.showError('Failed to delete food.');
    }
  }

  private saveLocal(saved: Food) {
    const foodExists = this.foods.some((c) => c.id === saved.id);
    if (foodExists) {
      this.foods = this.foods.map((existing) => {
        if (existing.id === saved.id) {
          return saved;
        } else {
          return existing;
        }
      });
    } else {
      this.foods.push(saved);
    }
  }

  private deleteLocal(food: Food) {
    this.foods = this.foods.filter((c) => c.id !== food.id);
  }
}
