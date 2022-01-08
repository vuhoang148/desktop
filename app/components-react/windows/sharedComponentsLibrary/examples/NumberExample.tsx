import React, { useState } from 'react';
import { NumberInput } from '../../../shared/inputs';
import { Example, useSharedComponentsLibrary } from '../SharedComponentsLibrary';

export function NumberExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value, setValue] = useState(0);
  const props = {
    ...globalProps,
    value,
    onChange: setValue,
  };

  return (
    <Example title="Number Input">
      <NumberInput label="Basic" {...props} />
      <NumberInput label="Min = 0, Max = 10" min={0} max={10} {...props} />
    </Example>
  );
}
