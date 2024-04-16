import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets';
import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})
import "scrivito-neoletter-form-widgets/index.css";

initNeoletterFormWidgets();
export { }
