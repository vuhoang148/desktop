import React, { useState } from 'react';
import { CodeInput, TextAreaInput, TextInput } from '../../../shared/inputs';
import { Example, useSharedComponentsLibrary } from '../SharedComponentsLibrary';
import { Button } from 'antd';
import { $t } from '../../../../services/i18n';

export function TextExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value, setValue] = useState('');
  const props = {
    ...globalProps,
    value,
    onChange: setValue,
  };

  return (
    <>
      <Example title="TextInput">
        <TextInput label="Uncontrolled" {...props} />
        <TextInput label="Controlled" uncontrolled={false} {...props} />
        <TextInput label="Debounced" debounce={500} {...props} />
        <TextInput label="Read Only" readOnly {...props} />
        <TextInput label="Password" isPassword {...props} />
        <TextInput label="With addons" addonBefore="http://" addonAfter=".com" {...props} />
        <TextInput label="With button" addonAfter={<Button>{$t('Click Me')}</Button>} {...props} />
      </Example>

      <Example title="Textarea Input">
        <TextAreaInput label="Basic" {...props} />
        <TextAreaInput label="Show Count" showCount maxLength={50} {...props} />
        <TextAreaInput label="Auto Size" autoSize {...props} />
      </Example>

      <CodeInputExample />
    </>
  );
}

function CodeInputExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value, setValue] = useState('alert("Hello World!")');
  const props = {
    ...globalProps,
    value,
    onChange: setValue,
  };

  return (
    <Example title="Code Input">
      <CodeInput label="javascript" lang="js" {...props} />
    </Example>
  );
}
