import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './App.module.css';
import { getDownloadLink } from './getDownloadLink.ts';

export default function App() {
  const [settings, setSettings] =
    useState<GeneratorSettings>({
      listValue: 'Hello',
      textColor: '#1489d2',
      fontSize: 12,
      boldText: false,
      italicizeText: false,
      backgroundColor: '#002b36',
      opacity: 1,
      height: 25,
      width: 100,
      borderRadius: 5,
    });

  const [downloadLink, setDownloadLink] =
    useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }

    const downloadLink = getDownloadLink({
      canvas: canvasRef.current,
      settings: settings,
    });

    if (downloadLink === undefined) {
      return;
    }

    setDownloadLink(downloadLink);
  }, [settings]);

  function getUpdateValue({
    target,
  }: {
    target: HTMLInputElement;
  }): {
    name: string;
    value: string | boolean | number;
  } {
    const { name, type, value, checked } = target;

    switch (type) {
      case 'checkbox':
        return { name, value: checked };
      case 'number':
        return { name, value: Number(value) };
      default:
        return { name, value };
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = getUpdateValue({
      target: e.target,
    });

    setSettings(previous => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <div>
          <h1>List Value Image Generator</h1>
        </div>
      </header>
      <main className={styles.container}>
        <div className={styles.settingsContainer}>
          <div className={styles.settings}>
            <div className={styles.formGroup}>
              <label htmlFor="listValue">
                List Value:{' '}
              </label>
              <input
                id="listValue"
                name="listValue"
                value={settings.listValue}
                type="text"
                onChange={handleInputChange}
                maxLength={150}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="width">
                Image Height (px):{' '}
              </label>
              <input
                id="height"
                name="height"
                value={settings.height}
                type="number"
                onChange={handleInputChange}
                min={1}
                max={200}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="width">
                Image Width (px):{' '}
              </label>
              <input
                id="width"
                name="width"
                value={settings.width}
                type="number"
                onChange={handleInputChange}
                min={1}
                max={200}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="borderRadius">
                Border Radius (px):{' '}
              </label>
              <input
                id="borderRadius"
                name="borderRadius"
                value={settings.borderRadius}
                type="number"
                onChange={handleInputChange}
                min={1}
                max={100}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="backgroundColor">
                Background Color:{' '}
              </label>
              <input
                id="backgroundColor"
                name="backgroundColor"
                value={settings.backgroundColor}
                type="color"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="opacity">Opacity: </label>
              <input
                id="opacity"
                name="opacity"
                value={settings.opacity}
                type="number"
                onChange={handleInputChange}
                min={0}
                max={1}
                step={0.1}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="textColor">
                Text Color:{' '}
              </label>
              <input
                id="textColor"
                name="textColor"
                value={settings.textColor}
                type="color"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fontSize">
                Font Size (px):{' '}
              </label>
              <input
                id="fontSize"
                name="fontSize"
                value={settings.fontSize}
                type="number"
                onChange={handleInputChange}
                min={1}
                max={200}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="boldText">Bold Text: </label>
              <input
                id="boldText"
                name="boldText"
                checked={settings.boldText === true}
                type="checkbox"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="italicizeText">
                Italicize Text:{' '}
              </label>
              <input
                id="italicizeText"
                name="italicizeText"
                checked={settings.italicizeText === true}
                type="checkbox"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className={styles.downloadContainer}>
              <a
                className={styles.downloadButton}
                href={downloadLink}
                download={'image'}
              >
                Download
              </a>
            </div>
          </div>
        </div>
        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef}></canvas>
        </div>
      </main>
      <footer>
        <div className={styles.githubLinkContainer}>
          <a
            className={styles.githubLink}
            href="https://github.com/StevanFreeborn/ListValueImageGenerator"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>{' '}
            <span>View on Github</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
