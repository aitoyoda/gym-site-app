import React, { useState } from 'react';
import { UnstyledButton, Group, Avatar, Text, rem, Box, Collapse, ThemeIcon } from '@mantine/core';
import { IconChevronRight, IconCalendarStats,IconLogout } from '@tabler/icons-react';
import { onAuthStateChanged, getAuth, User,signOut } from '../firebase';
import classes from './UserButton.module.css';
interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  onClick?: () => void;
}

const logout = async () => {
    const auth = getAuth();
    try {
      // Firebase Authentication を使用してログアウト
      await signOut(auth);
      alert('ログアウトしました');
    } catch (error) {
      // エラー処理
      console.error('ログアウトエラー:', error);
      alert('ログアウトに失敗しました');
    }
};

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, onClick }: LinksGroupProps) {
    
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (links || []).map((link) => (
      <Text<'a'>
          component="a"
          className={classes.link}
          href={link.link}
          key={link.label}
          onClick={(event: React.MouseEvent) => {
              event.preventDefault();
          }}
      >
          {link.label}
      </Text>
    ));
  
    return (
      <>
        <button onClick={() => { setOpened((o) => !o); onClick && onClick(); }} className={classes.control}>
          <Group justify="space-between" gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {links && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? 'rotate(-90deg)' : 'none',
                }}
              />
            )}
          </Group>
        </button>
        {links && <Collapse in={opened}>{items}</Collapse>}
      </>
    );
  }
  


export function UserButton() {
    const [menuOpened, setMenuOpened] = useState(false);
  
    return (
      <div className={classes.user}>
        <UnstyledButton onClick={() => setMenuOpened(!menuOpened)} className={classes.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius="xl"
            />
  
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Harriette Spoonlicker
              </Text>
  
              <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
              </Text>
            </div>
  
            <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
        <Collapse in={menuOpened} transition="fade">
          <div className={classes.dropdown}>
            <LinksGroup {...sampleData} />
            <LinksGroup {...logoutData} onClick={logout} />
          </div>
        </Collapse>
      </div>
    );
}

const sampleData = {
  label: 'sample',
  icon: IconCalendarStats,
  links: [
    { label: 'sample', link: '/' },
    // { label: 'sample', link: '/' },
    // { label: 'sample', link: '/' },
  ],
};

const logoutData = {
    label: 'Logout',
    icon: IconLogout,
};

export function NavbarLinksGroup() {

  return (
    <Box mih={220} p="md">
      <LinksGroup {...sampleData} />
      <LinksGroup {...logoutData} />
    </Box>
  );
}