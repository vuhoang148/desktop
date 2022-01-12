import React from 'react';
import { Example } from '../UILibrary';
import { Alert, Menu, Timeline } from 'antd';

export function OthersExample() {
  return (
    <>
      <Example title="Menu">
        <Alert type="warning" message="TODO: take menu styles from the Alerbox window" />

        <Menu theme="light">
          <Menu.Item key="1">Item 1</Menu.Item>
          <Menu.Item key="2">Item 2</Menu.Item>
          <Menu.Item key="3">Item 4</Menu.Item>
        </Menu>

        <Menu theme="dark">
          <Menu.Item key="1">Item 1</Menu.Item>
          <Menu.Item key="2">Item 2</Menu.Item>
          <Menu.Item key="3">Item 4</Menu.Item>
        </Menu>
      </Example>

      <Example title="Timeline">
        <Timeline pending="Recording...">
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        </Timeline>
      </Example>
    </>
  );
}
