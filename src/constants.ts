import { InputType } from './enums/inputType.ts';
import { GeneratorSettings } from './types';

export const DEFAULT_SETTINGS: GeneratorSettings = {
  listValue: {
    labelText: 'List Value:',
    value: 'Hello',
    inputType: InputType.Text,
    props: function () {
      return {
        maxLength: 150,
      };
    },
  },
  textColor: {
    labelText: 'Text Color:',
    value: '#1489d2',
    inputType: InputType.Color,
    props: function () {
      return {};
    },
  },
  fontSize: {
    labelText: 'Font Size (px):',
    value: 12,
    inputType: InputType.Number,
    props: function () {
      return { min: 1, max: 200 };
    },
  },
  boldText: {
    labelText: 'Bold Text:',
    value: false,
    inputType: InputType.Checkbox,
    props: function () {
      return {
        checked: this.value === true,
      };
    },
  },
  italicizeText: {
    labelText: 'Italicize Text:',
    value: false,
    inputType: InputType.Checkbox,
    props: function () {
      return {
        checked: this.value === true,
      };
    },
  },
  backgroundColor: {
    labelText: 'Background Color:',
    value: '#002b36',
    inputType: InputType.Color,
    props: function () {
      return {};
    },
  },
  opacity: {
    labelText: 'Opacity:',
    value: 1,
    inputType: InputType.Number,
    props: function () {
      return { min: 0, max: 1, step: 0.1 };
    },
  },
  height: {
    labelText: 'Height (px):',
    value: 25,
    inputType: InputType.Number,
    props: function () {
      return { min: 1, max: 200 };
    },
  },
  width: {
    labelText: 'Width (px):',
    value: 100,
    inputType: InputType.Number,
    props: function () {
      return { min: 1, max: 200 };
    },
  },
  borderRadius: {
    labelText: 'Border Radius (px):',
    value: 5,
    inputType: InputType.Number,
    props: function () {
      return { min: 1, max: 100 };
    },
  },
};
