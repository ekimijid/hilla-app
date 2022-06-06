// @ts-nocheck

import FoodModel from '../../entity/FoodModel';
import FoodData from './FoodData';

import {ObjectModel,StringModel,NumberModel,ArrayModel,BooleanModel,Required,ModelValue,_getPropertyModel} from '@hilla/form';

import {Email,Null,NotNull,NotEmpty,NotBlank,AssertTrue,AssertFalse,Negative,NegativeOrZero,Positive,PositiveOrZero,Size,Past,Future,Digits,Min,Max,Pattern,DecimalMin,DecimalMax} from '@hilla/form';

/**
 * This module is generated from be.pxl.italent.hillaapp.data.endpoint.FoodEndpoint.FoodData.
 * All changes to this file are overridden. Please consider to make changes in the corresponding Java file if necessary.
 * @see {@link file:///C:/Users/11601094/IdeaProjects/hilla-app/src/main/java/be/pxl/italent/hillaapp/data/endpoint/FoodEndpoint.java}
 */
export default class FoodDataModel<T extends FoodData = FoodData> extends ObjectModel<T> { 
  static createEmptyValue: () => FoodData;

  get foods(): ArrayModel<ModelValue<FoodModel>, FoodModel> {
    return this[_getPropertyModel]('foods', ArrayModel, [false, FoodModel, [false]]);
  }
}
