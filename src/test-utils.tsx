import { ComponentType, ReactElement, ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {
  configureStore,
  type Store,
} from '@reduxjs/toolkit';
import type { RootState } from './app/store';
import cartReducer from './features/cart/cartSlice';

export type AppStore = Store<RootState>;

export type ExtendedRenderOptions = {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  route?: string;
} & Omit<RenderOptions, 'wrapper'>;

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({ 
      reducer: { 
        cart: cartReducer 
      }, 
      preloadedState: preloadedState as RootState
    }) as AppStore,
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper as ComponentType<{ children: ReactNode }>, ...renderOptions }),
  };
}
