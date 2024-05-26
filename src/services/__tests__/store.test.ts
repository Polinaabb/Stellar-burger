import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientReducer } from '../slices/ingredientSlice';
import { constructorReducer } from '../slices/constructorSlice';
import { orderReducer } from '../slices/orderSlice';
import { ordersReducer } from '../slices/ordersSlice';
import { authReducer } from '../slices/authorizationSlice';

describe('Тесты корневого редьюсера', () => {
  it('проверяющий правильную настройку и работу rootReducer: вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientReducer,
      constructorBurger: constructorReducer,
      orders: ordersReducer,
      order: orderReducer,
      auth: authReducer
    });

    const store = configureStore({
      reducer: rootReducer
    });

    expect(store.getState()).toEqual(
      rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
