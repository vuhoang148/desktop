import React, { useState } from 'react';
import { ColorInput } from '../../../shared/inputs';
import { Example, useSharedComponentsLibrary } from '../UILibrary';
import { IRGBAColor } from '../../../shared/inputs/ColorInput';

export function ColorExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value1, setValue1] = useState<string | IRGBAColor>('#aa0000');
  const props1 = {
    ...globalProps,
    value: value1,
    onChange: setValue1,
  };

  const [value2, setValue2] = useState<string | IRGBAColor>({ r: 55, g: 0, b: 0, a: 0.5 });
  const props2 = {
    ...globalProps,
    value: value2,
    onChange: setValue2,
  };

  return (
    <Example title="Color Input">
      <ColorInput label="Basic" key="color1" {...props1} />
      <ColorInput label="With alpha" key="color2" {...props2} />
    </Example>
  );
}
