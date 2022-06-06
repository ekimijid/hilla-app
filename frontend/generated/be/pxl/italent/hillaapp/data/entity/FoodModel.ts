// @ts-nocheck

import Food from './Food';

import {ObjectModel,StringModel,NumberModel,ArrayModel,BooleanModel,Required,ModelValue,_getPropertyModel} from '@hilla/form';

import {Email,Null,NotNull,NotEmpty,NotBlank,AssertTrue,AssertFalse,Negative,NegativeOrZero,Positive,PositiveOrZero,Size,Past,Future,Digits,Min,Max,Pattern,DecimalMin,DecimalMax} from '@hilla/form';

/**
 * This module is generated from be.pxl.italent.hillaapp.data.entity.Food.
 * All changes to this file are overridden. Please consider to make changes in the corresponding Java file if necessary.
 * @see {@link file:///C:/Users/11601094/IdeaProjects/hilla-app/src/main/java/be/pxl/italent/hillaapp/data/entity/Food.java}
 */
export default class FoodModel<T extends Food = Food> extends ObjectModel<T> { 
  static createEmptyValue: () => Food;

  get id(): StringModel {
    return this[_getPropertyModel]('id', StringModel, [true]);
  }

  get foodName(): StringModel {
    return this[_getPropertyModel]('foodName', StringModel, [true, new NotEmpty()]);
  }

  get description(): StringModel {
    return this[_getPropertyModel]('description', StringModel, [true, new NotEmpty()]);
  }

  get image(): StringModel {
    return this[_getPropertyModel]('image', StringModel, [true]);
  }

  get prijs(): NumberModel {
    return this[_getPropertyModel]('prijs', NumberModel, [false, new NotNull()]);
  }
}
