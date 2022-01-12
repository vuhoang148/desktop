import React, { useState } from 'react';
import { Example, useSharedComponentsLibrary } from '../UILibrary';
import { Alert } from 'antd';
import { TimeInput } from '../../../shared/inputs';

export function DateExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value, setValue] = useState(0);
  const props = {
    ...globalProps,
    value,
    onChange: setValue,
  };

  return (
    <>
      <Example title="Date Input">
        <Alert type="warning" message="The Date Input component is not implemented yet" />
      </Example>

      <Example title="Time Input">
        <TimeInput label="Select Time" {...props} />
      </Example>
    </>
  );
}
