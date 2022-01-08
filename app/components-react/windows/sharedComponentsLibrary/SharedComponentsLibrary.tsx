import React, { HTMLAttributes } from 'react';
import { ModalLayout } from '../../shared/ModalLayout';
import Form from '../../shared/inputs/Form';
import {
  CheckboxInput,
  createBinding,
  ListInput,
  TextInput,
  TInputLayout,
} from '../../shared/inputs';
import { Alert, Layout, Menu, Tabs } from 'antd';
import { Services } from '../../service-provider';
import InputWrapper from '../../shared/inputs/InputWrapper';
import { I18nService, WHITE_LIST } from '../../../services/i18n';
import { mutation } from '../../store';
import { pick } from 'lodash';
import { useModule } from '../../hooks/useModule';
import { merge } from '../../../util/merge';
import { DemoForm } from './DemoForm';
import { TextExample } from './examples/TextExample';
import { NumberExample } from './examples/NumberExample';
import { ListExample } from './examples/ListExample';
import { TagsExample } from './examples/TagsExample';
import { SwitchExample } from './examples/SwitchExample';
import { SliderExample } from './examples/SliderExample';
import { FileExample } from './examples/FileExample';
import { ModalExample } from './examples/ModalExample';
import { DateExample } from './examples/DateExample';
import { LogoExample } from './examples/LogoExample';
import { OthersExample } from './examples/OthersExample';
import { ButtonExample } from './examples/ButtonExample';
import { ColorExample } from './examples/ColorExample';

const { TabPane } = Tabs;
const { Sider, Content } = Layout;

const exampleComponents = {
  TextExample,
  NumberExample,
  ListExample,
  TagsExample,
  SwitchExample,
  SliderExample,
  ColorExample,
  FileExample,
  DateExample,
  ModalExample,
  ButtonExample,
  LogoExample,
  OthersExample,
};

export default function SharedComponentsLibrary() {
  return (
    <ModalLayout>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Shared Components" key="1">
          <Layout>
            <Sider
              style={{
                backgroundColor: 'var(--section)',
              }}
            >
              <ExamplesMenu />
            </Sider>
            <Content
              style={{ height: '800px', overflowY: 'auto', padding: '16px', margin: '0 16px' }}
            >
              <Examples />
            </Content>
            <Sider style={{ backgroundColor: 'var(--section)', padding: '16px' }}>
              <SettingsPanel />
            </Sider>
          </Layout>
        </TabPane>
        <TabPane tab="Demo Form" key="2">
          <DemoForm />
        </TabPane>
      </Tabs>
    </ModalLayout>
  );
}

function ExamplesMenu() {
  const { selectedExample, selectExample } = useSharedComponentsLibrary();
  return (
    <Menu theme="dark" selectedKeys={[selectedExample]} onSelect={ev => selectExample(ev.key)}>
      <Menu.Item key="all">Show All</Menu.Item>
      {Object.keys(exampleComponents).map(example => {
        return <Menu.Item key={example}>{example.replace('Example', '')}</Menu.Item>;
      })}
    </Menu>
  );
}

function Examples() {
  const { layout, selectedExample } = useSharedComponentsLibrary();
  const visibleExamples =
    selectedExample === 'all' ? Object.keys(exampleComponents) : [selectedExample];
  return (
    <Form layout={layout}>
      {visibleExamples.map(example => {
        const Comp = exampleComponents[example];
        return <Comp key={example} />;
      })}
    </Form>
  );
}

export function Example(p: { title: string } & HTMLAttributes<unknown>) {
  const { background } = useSharedComponentsLibrary();
  const containerClass = {
    none: '',
    section: 'section',
    'section-alt': 'section section-alt',
    error: '',
  }[background];

  return (
    <div className={containerClass}>
      {background !== 'error' && (
        <InputWrapper>
          <h2>{p.title}</h2>
        </InputWrapper>
      )}

      <div>
        {background !== 'error' && p.children}
        {background === 'error' && (
          <Alert
            type="error"
            message={p.title}
            description={p.children}
            style={{ marginBottom: '24px' }}
          />
        )}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { bind, locales } = useSharedComponentsLibrary();

  function createOptions(opts: string[]) {
    return opts.map(opt => ({
      label: opt,
      value: opt,
    }));
  }

  return (
    <Form layout="vertical">
      <ListInput
        label="Theme"
        options={createOptions(['night-theme', 'day-theme', 'prime-dark', 'prime-light'])}
        {...bind.theme}
      />
      <ListInput
        label="Layout"
        options={createOptions(['horizontal', 'vertical', 'inline'])}
        {...bind.layout}
      />
      <ListInput
        label="Background"
        options={createOptions(['none', 'section', 'section-alt', 'error'])}
        {...bind.background}
      />
      <ListInput
        label="Size"
        options={createOptions(['default', 'large', 'small'])}
        {...bind.size}
      />

      <TextInput label="Placeholder" {...bind.placeholder} />

      {/* TODO: implement hot language change */}
      <ListInput label="Language" options={createOptions(locales)} {...bind.locale} disabled />

      <InputWrapper label="Miscellaneous">
        <CheckboxInput label={'Has tooltips'} {...bind.hasTooltips} />
        <CheckboxInput label={'Required'} {...bind.required} />
        <CheckboxInput label={'Disabled'} {...bind.disabled} />
      </InputWrapper>
    </Form>
  );
}

export function useSharedComponentsLibrary() {
  return useModule(SharedComponentsModule).select();
}

class SharedComponentsModule {
  state: ISharedComponentsState = {
    layout: 'horizontal',
    hasTooltips: false,
    required: false,
    placeholder: 'Start typing',
    disabled: false,
    size: 'middle',
    background: 'none',
    locales: WHITE_LIST,
    selectedExample: 'TextExample',
  };

  get globalProps() {
    const globalProps: Record<string, any> = {};
    if (this.state.hasTooltips) globalProps.tooltip = 'This is tooltip';
    if (this.state.required) globalProps.required = true;
    if (this.state.placeholder) globalProps.placeholder = this.state.placeholder;
    if (this.state.disabled) globalProps.disabled = this.state.disabled;
    if (this.state.size) globalProps.size = globalProps;
    return globalProps;
  }

  private globalState = {
    get theme() {
      return Services.CustomizationService.currentTheme;
    },
    set theme(theme: string) {
      Services.CustomizationService.actions.setTheme(theme);
    },
    get locale() {
      return I18nService.instance.state.locale;
    },
    set locale(locale: string) {
      // TODO: change locale dynamically
      alert('Not implemented');
      // I18nService.instance.actions.setLocale(locale);
    },
  };

  private mergedState = merge(
    () => this.state,
    () => this.globalState,
  );

  @mutation()
  private updateState(statePatch: Partial<ISharedComponentsState>) {
    Object.assign(this.state, statePatch);
  }

  @mutation()
  selectExample(example: string) {
    this.state.selectedExample = example;
  }

  bind = createBinding(
    () => this.mergedState,
    statePatch => {
      const localStatePatch = pick(statePatch, Object.keys(this.state));
      this.updateState(localStatePatch);
      const globalStatePatch = pick(statePatch, Object.keys(this.globalState));
      Object.assign(this.globalState, globalStatePatch);
    },
  );
}

interface ISharedComponentsState {
  layout: TInputLayout;
  placeholder: string;
  hasTooltips: boolean;
  required: boolean;
  disabled: boolean;
  size: 'middle' | 'large' | 'small';
  background: 'none' | 'section' | 'section-alt' | 'error';
  locales: string[];
  selectedExample: string;
}
