function createLocalStorage(key) {
  const store = JSON.parse(localStorage.getItem(key)) ?? {};

  const save = () => {
    localStorage.setItem(key, JSON.stringify(store));
  };

  const storage = {
    get(key) {
      return store[key];
    },
    set(key, value) {
      store[key] = value;
      save();
    },
    remove(key) {
      delete store[key];
      save();
    }
  };

  return storage;
}

function createSessionStorage(key) {
  const store = JSON.parse(sessionStorage.getItem(key)) ?? {};

  const save = () => {
    sessionStorage.setItem(key, JSON.stringify(store));
  };

  const storage = {
    get(key) {
      return store[key];
    },
    set(key, value) {
      store[key] = value;
      save();
    },
    remove(key) {
      delete store[key];
      save();
    }
  };

  return storage;
}

export { createLocalStorage, createSessionStorage };
