import React, { useState } from 'react';
import { Example } from '../UILibrary';
import PlatformLogo from '../../../shared/PlatformLogo';
import { ListInput } from '../../../shared/inputs';
import { IListOption } from '../../../shared/inputs/ListInput';

export function LogoExample() {
  const [size, setSize] = useState<'medium'>('medium');
  const sizeOptions: IListOption<'medium'>[] = [{ value: 'medium', label: 'Medium' }];

  return (
    <Example title="Platform Logo">
      <ListInput label="Size" value={size} onChange={setSize} options={sizeOptions} />
      <PlatformLogo platform="twitch" size={size} />
      <PlatformLogo platform="youtube" size={size} />
      <PlatformLogo platform="facebook" size={size} />
      <PlatformLogo platform="streamlabs" size={size} />
      <PlatformLogo platform="dlive" size={size} />
      <PlatformLogo platform="nimotv" size={size} />
    </Example>
  );
}
