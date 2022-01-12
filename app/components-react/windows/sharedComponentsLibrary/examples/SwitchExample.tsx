import React, { useState } from 'react';
import { CheckboxInput, SwitchInput } from '../../../shared/inputs';
import { Example, useSharedComponentsLibrary } from '../UILibrary';
import InputWrapper from '../../../shared/inputs/InputWrapper';

export function SwitchExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value, setValue] = useState(false);
  const props = {
    ...globalProps,
    value,
    onChange: setValue,
  };

  return (
    <>
      <Example title="SwitchInput">
        <SwitchInput label="Default" {...props} />
        <SwitchInput label="Debounced" debounce={500} {...props} />
        <SwitchInput label="Disabled" disabled {...props} />
        <SwitchInput
          label="With text"
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
          {...props}
        />
      </Example>

      <Example title="Checkbox Input">
        <InputWrapper label="Checkbox Group">
          <CheckboxInput label="Default" {...props} />
          <CheckboxInput label="Debounced" debounce={500} {...props} />
        </InputWrapper>
      </Example>
    </>
  );
}
