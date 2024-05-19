import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  isIngLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/get', async () => {
  const result = await getIngredientsApi();
  return result;
});

export const getTypeSelector = (type: string) =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) => ingredients.filter((item) => item.type === type)
  );

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIsIngLoading: (state) => {
      state.isIngLoading = false;
    },
    setIngredientState: (state, action: PayloadAction<TIngredient[]>) => {
      state.isIngLoading = false;
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getIsIngLoading: (state) => state.isIngLoading,
    getIngredientState: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngLoading = false;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { setIsIngLoading, setIngredientState } = ingredientSlice.actions;

export const { getIsIngLoading, getIngredientState } =
  ingredientSlice.selectors;

export const ingredientReducer = ingredientSlice.reducer;
