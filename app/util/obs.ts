import * as obs from '../../obs-api';

// Utilities for interacting with OBS

/**
 * This should always be used instead of reading settings
 * directly from an OBS input.  This is because the OBS
 * settings object does not always contain default values
 * and is therefore unreliable for reading the actual
 * current value of a setting.
 * @param props the OBS properties object
 */
export function propsToSettings(props: obs.IProperty[]) {
  const settings: obs.ISettings = {};

  props.forEach((prop: obs.IProperty) => {
    settings[prop.name] = prop.value;
  });

  return settings;
}
