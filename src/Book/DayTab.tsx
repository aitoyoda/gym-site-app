import { Tabs, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import classes from './DayTab.module.css';

export function DayTab() {
  return (
    <Tabs variant="unstyled" defaultValue="settings" classNames={classes}>
      <Tabs.List grow>
        <Tabs.Tab
          value="TODAY"
          leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}
        >
          TODAY
        </Tabs.Tab>
        <Tabs.Tab
          value="MON"
          leftSection={<IconMessageCircle style={{ width: rem(16), height: rem(16) }} />}
        >
          MON
        </Tabs.Tab>
        <Tabs.Tab
          value="TUE"
          leftSection={<IconPhoto style={{ width: rem(16), height: rem(16) }} />}
        >
          TUE
        </Tabs.Tab>
        <Tabs.Tab
          value="WED"
          leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}
        >
          WED
        </Tabs.Tab>
        <Tabs.Tab
          value="THU"
          leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}
        >
          THU
        </Tabs.Tab>
        <Tabs.Tab
          value="FRI"
          leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}
        >
          FRI
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}