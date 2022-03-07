import Controller from './Controller';

export function init(): void {
  let controller: Controller | null;

  const _init = () => {
    if (!controller) {
      controller = new Controller();
      controller.init();
    }
  };

  document.addEventListener('DOMContentLoaded', _init);

  const _destory = () => {
    if (controller) {
      controller.destroy();
      controller = null;
    }
  };

  window.addEventListener('unload', _destory);
  window.addEventListener('beforeunload', _destory);
}
