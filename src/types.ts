import { InputHTMLAttributes } from 'react';
import { InputType } from './enums/inputType';

export type GeneratorSettings = {
  [key: string]: Setting;
};

export type Setting = {
  labelText: string;
  inputType: InputType;
  value: string | number | boolean;
  props: () => InputHTMLAttributes<HTMLInputElement>;
};
