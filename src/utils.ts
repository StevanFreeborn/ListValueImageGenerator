import { InputType } from './enums/inputType.ts';
import { GeneratorSettings } from './types.ts';

export function getDownloadLink({
  canvas,
  settings,
}: {
  canvas: HTMLCanvasElement;
  settings: GeneratorSettings;
}): string | undefined {
  const context = canvas.getContext('2d');

  if (context === null) {
    return;
  }

  context.clearRect(
    0,
    0,
    context.canvas.width,
    context.canvas.height
  );

  context.canvas.style.width = `${settings.width.value}px`;
  context.canvas.style.height = `${settings.height.value}px`;
  const scale = window.devicePixelRatio;

  context.canvas.height = Math.floor(
    (settings.height.value as number) * scale
  );
  context.canvas.width = Math.floor(
    (settings.width.value as number) * scale
  );

  context.globalAlpha = settings.opacity.value as number;

  context.fillStyle = `${settings.backgroundColor.value}`;
  context.strokeStyle = `${settings.backgroundColor}`;

  context.beginPath();
  context.roundRect(
    0,
    0,
    context.canvas.width,
    context.canvas.height,
    settings.borderRadius.value as number
  );
  context.closePath();

  context.stroke();
  context.fill();

  context.globalAlpha = 1;

  context.font = `${
    settings.italicizeText.value ? 'italic' : ''
  } ${settings.boldText.value ? 'bold' : ''} ${
    settings.fontSize.value
  }px Arial`;

  context.fillStyle = `${settings.textColor.value}`;

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillText(
    settings.listValue.value as string,
    context.canvas.width / 2,
    context.canvas.height / 2
  );

  return context.canvas.toDataURL();
}

export function getInputUpdateValue({
  target,
}: {
  target: HTMLInputElement;
}): {
  name: string;
  value: string | boolean | number;
} {
  const { name, type, value, checked, min, max } = target;

  switch (type) {
    case InputType.Checkbox:
      return { name, value: checked };
    case InputType.Number:
      const valueAsNum = Number(value);
      const minAsNum = Number(min);
      const maxAsNum = Number(max);

      if (valueAsNum > maxAsNum) {
        return { name, value: maxAsNum };
      }

      if (valueAsNum < minAsNum) {
        return { name, value: minAsNum };
      }

      return { name, value: Number(value) };
    default:
      return { name, value };
  }
}
