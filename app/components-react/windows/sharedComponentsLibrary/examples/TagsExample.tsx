import React, { useState } from 'react';
import { TagsInput } from '../../../shared/inputs';
import { Example, useSharedComponentsLibrary } from '../UILibrary';
import { Col, Row, Tag } from 'antd';

export function TagsExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const [value, setValue] = useState([1, 2, 3]);
  const options = [
    { value: 1, label: 'Red' },
    { value: 2, label: 'Green' },
    { value: 3, label: 'Blue' },
    { value: 4, label: 'Orange' },
  ];
  const props = {
    ...globalProps,
    value,
    options,
    onChange: setValue,
  };

  return (
    <Example title="Tags Input">
      <TagsInput label="Basic" {...props} />
      <TagsInput
        label="Custom Tag Render"
        {...props}
        tagRender={(tagProps, tag) => (
          <Tag {...tagProps} color={tag.label.toLowerCase()}>
            {tag.label}
          </Tag>
        )}
      />
      <TagsInput
        label="Custom Option Render"
        {...props}
        optionRender={opt => (
          <Row gutter={16} style={{ color: opt.label.toLowerCase() }}>
            <Col>{opt.value}</Col>
            <Col>{opt.label}</Col>
          </Row>
        )}
      />
    </Example>
  );
}
