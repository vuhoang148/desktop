import React from 'react';
import { Example } from '../SharedComponentsLibrary';
import { Button, Space } from 'antd';
import { alertAsync, confirmAsync, promptAsync } from '../../../modals';

export function ModalExample() {
  return (
    <Example title="Modals">
      <Space>
        <Button onClick={() => alertAsync('This is Alert')}>Show Alert</Button>
        <Button
          onClick={() =>
            confirmAsync('This is Alert').then(confirmed =>
              alertAsync(confirmed ? 'Confirmed' : 'Not confirmed'),
            )
          }
        >
          Show Confirm
        </Button>

        <Button
          onClick={() =>
            promptAsync('Type any text').then(text => alertAsync(`You typed: ${text} `))
          }
        >
          Show Prompt
        </Button>
      </Space>
    </Example>
  );
}
