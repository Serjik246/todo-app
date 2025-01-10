export const getStorage = (key) => {
  const value = localStorage.getItem(key);
  if (value === null) {
    return [];
  }
  return JSON.parse(value);
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  setData(key, data);
};

export const removeStorage = (id, key) => {
  const data = getStorage(key);
  const newData = data.filter(value => Number(value.id) !== Number(id));
  setData(key, newData);
};

export const updateStorage = (id, key) => {
  const data = getStorage(key);
  for (let value of data) {
    if(Number(value.id) === Number(id)) {
      value.status = 'done';
      };
  };
  setData(key, data);
};
