import React, { useState } from 'react';
import { SliderInput } from '../../../shared/inputs';
import { Example, useSharedComponentsLibrary } from '../SharedComponentsLibrary';

export function SliderExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value, setValue] = useState(0);
  const props = {
    ...globalProps,
    value,
    onChange: setValue,
  };

  return (
    <Example title="Slider Input">
      <SliderInput label="Basic" min={0} max={10} {...props} />
      <SliderInput label="With Number Input" min={0} max={10} hasNumberInput {...props} />
      <SliderInput label="Debounced" min={0} max={10} debounce={300} {...props} />
      <SliderInput
        label="Percentage Format"
        min={0}
        max={1}
        step={0.01}
        tipFormatter={(val: number) => `${val * 100}%`}
        {...props}
      />
    </Example>
  );
}
