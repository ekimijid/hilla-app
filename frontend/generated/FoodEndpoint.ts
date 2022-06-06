/**
 * This module is generated from FoodEndpoint.java
 * All changes to this file are overridden. Please consider to make changes in the corresponding Java file if necessary.
 * @see {@link file:///C:/Users/11601094/IdeaProjects/hilla-app/src/main/java/be/pxl/italent/hillaapp/data/endpoint/FoodEndpoint.java}
 * @module FoodEndpoint
 */

// @ts-ignore
import client from '../connect-client';
import type FoodData from './be/pxl/italent/hillaapp/data/endpoint/FoodEndpoint/FoodData';
import type Food from './be/pxl/italent/hillaapp/data/entity/Food';

function _deleteFood(
 food: Food | undefined
): Promise<void> {
 return client.call('FoodEndpoint', 'deleteFood', {food});
}

function _getFoodData(): Promise<FoodData> {
 return client.call('FoodEndpoint', 'getFoodData');
}

function _saveFood(
 food: Food | undefined
): Promise<Food> {
 return client.call('FoodEndpoint', 'saveFood', {food});
}
export {
  _deleteFood as deleteFood,
  _getFoodData as getFoodData,
  _saveFood as saveFood,
};
