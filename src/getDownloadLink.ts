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

  context.canvas.style.width = `${settings.width}px`;
  context.canvas.style.height = `${settings.height}px`;
  const scale = window.devicePixelRatio;

  context.canvas.height = Math.floor(
    settings.height * scale
  );
  context.canvas.width = Math.floor(settings.width * scale);

  context.globalAlpha = settings.opacity;

  context.fillStyle = `${settings.backgroundColor}`;
  context.strokeStyle = `${settings.backgroundColor}`;

  context.beginPath();
  context.roundRect(
    0,
    0,
    context.canvas.width,
    context.canvas.height,
    settings.borderRadius
  );
  context.closePath();

  context.stroke();
  context.fill();

  context.globalAlpha = 1;

  context.font = `${
    settings.italicizeText ? 'italic' : ''
  } ${settings.boldText ? 'bold' : ''} ${
    settings.fontSize
  }px Arial`;

  context.fillStyle = `${settings.textColor}`;

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillText(
    settings.listValue,
    context.canvas.width / 2,
    context.canvas.height / 2
  );

  return context.canvas.toDataURL();
}
