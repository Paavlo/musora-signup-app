declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, never>;
  export default component;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
