import { createContext, useContext } from "react";
import { authStore, AuthStore } from "../store/AuthStore";

interface Store {
  authStore: AuthStore;
}

const store: Store = {
  authStore,
};

const StoreContext = createContext<Store>(store);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
