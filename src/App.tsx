import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './App.module.css';
import { DEFAULT_SETTINGS } from './constants.ts';
import { GeneratorSettings } from './types';
import {
  getDownloadLink,
  getInputUpdateValue,
} from './utils.ts';

export default function App() {
  const [settings, setSettings] =
    useState<GeneratorSettings>(DEFAULT_SETTINGS);

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

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = getInputUpdateValue({
      target: e.target,
    });

    setSettings(previous => ({
      ...previous,
      [name]: {
        ...previous[name],
        value,
      },
    }));
  }

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
            {Object.keys(settings).map(settingKey => {
              const setting = settings[settingKey];
              const props = setting.props();
              return (
                <div
                  key={settingKey}
                  className={styles.formGroup}
                >
                  <label htmlFor={settingKey}>
                    {setting.labelText}
                  </label>
                  <input
                    id={settingKey}
                    name={settingKey}
                    value={setting.value.toString()}
                    type={setting.inputType}
                    onChange={handleInputChange}
                    {...props}
                  ></input>
                </div>
              );
            })}
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
