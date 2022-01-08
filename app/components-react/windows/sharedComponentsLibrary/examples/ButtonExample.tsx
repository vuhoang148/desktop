import React from 'react';
import { Example, useSharedComponentsLibrary } from '../SharedComponentsLibrary';
import { Alert, Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export function ButtonExample() {
  const { size, disabled } = useSharedComponentsLibrary();
  const props = { size, disabled };
  return (
    <Example title="Buttons">
      <Space direction="vertical">
        <Alert
          type="warning"
          showIcon
          message="Some of these buttons do not have correct styles yet"
        />

        <Button type="primary" {...props}>
          Primary
        </Button>
        <Button {...props}>Default</Button>
        <Button type="dashed" {...props}>
          Dashed
        </Button>
        <br />
        <Button type="link" {...props}>
          Link
        </Button>
        <br />
        <Button type="primary" icon={<DownloadOutlined />} {...props} />
        <Button type="primary" shape="circle" icon={<DownloadOutlined />} {...props} />
        <Button type="primary" shape="round" icon={<DownloadOutlined />} {...props} />
        <Button type="primary" shape="round" icon={<DownloadOutlined />} {...props}>
          Download
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} {...props}>
          Download
        </Button>

        <Button type="primary" loading>
          Loading
        </Button>

        <Button type="primary" ghost {...props}>
          Primary Ghost
        </Button>
        <Button ghost {...props}>
          Default Ghost
        </Button>
        <Button type="dashed" ghost {...props}>
          Dashed Ghost
        </Button>

        <Button type="primary" danger {...props}>
          Primary Danger
        </Button>
        <Button danger {...props}>
          Default Danger
        </Button>
        <Button type="dashed" danger {...props}>
          Dashed Danger
        </Button>
        <Button type="text" danger {...props}>
          Text Danger
        </Button>
        <Button type="link" danger {...props}>
          Link Danger
        </Button>
      </Space>
    </Example>
  );
}
