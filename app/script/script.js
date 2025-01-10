import {getStorage} from './modules/serviceStorage.js';
import {renderContainer, renderTask} from './modules/render.js';
import {authorization, formControl, actionButtons} from './modules/control.js';

const init = () => {
  let userData;
  while (!userData){
    userData = authorization();
  };
  const {
    form,
    list,
  } = renderContainer();
  renderTask(list, getStorage(userData));
  formControl(form, list, userData);
  actionButtons(list, userData);
};

init();
