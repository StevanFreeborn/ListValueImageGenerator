import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [listValue, setListValue] =
    useState<string>('Hello');
  const [textColor, setTextColor] =
    useState<string>('#1489d2');
  const [backgroundColor, setBackgroundColor] =
    useState<string>('#002b36');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context === null || context === undefined) {
      return;
    }

    context.clearRect(
      0,
      0,
      context.canvas.width,
      context.canvas.width
    );

    const width = 100;
    const height = 25;

    context.canvas.style.width = `${width}px`;
    context.canvas.style.height = `${height}px`;
    const scale = window.devicePixelRatio;

    context.canvas.height = Math.floor(height * scale);
    context.canvas.width = Math.floor(width * scale);

    context.fillStyle = `${backgroundColor}`;
    context.fillRect(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );

    context.font = `$12px Arial`;
    context.fillStyle = `${textColor}`;

    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText(
      listValue,
      context.canvas.width / 2,
      context.canvas.height / 2
    );
  }, [listValue, backgroundColor, textColor]);

  return (
    <div>
      <header></header>
      <main>
        <div>
          <canvas
            style={{ width: '100%', height: '100%' }}
            ref={canvasRef}
          ></canvas>
        </div>
        <div>
          <div>
            <label>List Value Name: </label>
            <input
              defaultValue={listValue}
              type="text"
              onChange={e => setListValue(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Background Color: </label>
            <input
              value={backgroundColor}
              type="color"
              onChange={e =>
                setBackgroundColor(e.target.value)
              }
            ></input>
            <span>{backgroundColor}</span>
          </div>
          <div>
            <label>Text Color: </label>
            <input
              value={textColor}
              type="color"
              onChange={e => setTextColor(e.target.value)}
            ></input>
            <span>{textColor}</span>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
