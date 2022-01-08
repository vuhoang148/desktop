import React, { useState } from 'react';
import { ListInput } from '../../../shared/inputs';
import { Example, useSharedComponentsLibrary } from '../SharedComponentsLibrary';

export function ListExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState('');
  const listOptions1 = [
    { value: 1, label: 'Red' },
    { value: 2, label: 'Green' },
    { value: 3, label: 'Blue' },
    { value: 4, label: 'Orange' },
  ];
  const listOptions2 = [
    { value: '', label: 'Please Select the option' },
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
  ];

  const list1Props = {
    ...globalProps,
    options: listOptions1,
    value: value1,
    onChange: setValue1,
  };

  const list2Props = {
    ...globalProps,
    value: value2,
    options: listOptions2,
    onChange: setValue2,
  };

  return (
    <Example title="List Input">
      <ListInput label="Basic" {...list1Props} />
      <ListInput label="With search" showSearch {...list1Props} />
      <ListInput label="Allow Clear" allowClear {...list1Props} />
      <ListInput label="Custom Empty" {...list2Props} />
    </Example>
  );
}
