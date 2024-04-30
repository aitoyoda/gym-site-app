import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
  } from '@mantine/core';
  import { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { MantineLogo } from '@mantinex/mantine-logo';
  import { useDisclosure } from '@mantine/hooks';
  import classes from './HeaderMegaMenu.module.css';
  import { UserButton } from './UserButton';
  import { onAuthStateChanged, getAuth, User } from '../firebase';

  export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    //ページ遷移宣言
    const navigate = useNavigate();
    const SignUp = () => navigate(`SignUp`);
    const LogIn = () => navigate(`LogIn`);

    const [loggedIn, setLoggedIn] = useState(false);
    
    // ドロップダウンメニューのコンテンツ
    // const links = mockdata.map((item) => (
    //   <UnstyledButton className={classes.subLink} key={item.title}>
    //     <Group wrap="nowrap" align="flex-start">
    //       <ThemeIcon size={34} variant="default" radius="md">
    //         <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
    //       </ThemeIcon>
    //       <div>
    //         <Text size="sm" fw={500}>
    //           {item.title}
    //         </Text>
    //         <Text size="xs" c="dimmed">
    //           {item.description}
    //         </Text>
    //       </div>
    //     </Group>
    //   </UnstyledButton>
    // ));

    useEffect(() => {
      // ログイン状態を監視
      const unsubscribe = onAuthStateChanged(getAuth(), (user: User | null) => {
        setLoggedIn(user !== null); // ログイン状態を更新
        console.log('ログイン状態:', user !== null ? 'ログイン中' : 'ログアウト中');
      });
  
      return () => unsubscribe(); // アンマウント時に監視を解除
    }, []);


    const loginIconToggle = loggedIn ? (
      <Group>
        <UserButton />
      </Group>
    ) : (
      <div className="loginBox">
        <Group justify="center" grow pb="xl">
          <Box px="md">
            <Button variant="default" onClick={LogIn}>LogIn</Button>
          </Box>
          <Box>
            <Button onClick={SignUp}>SignUp</Button>
          </Box>
        </Group>
      </div>
    );
  
    return (
      <Box pb={120}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <MantineLogo size={30} />
  
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to="/" className={classes.link}>
                About
              </Link>

              <Link to="/Book" className={classes.link}>
                Book a Workout
              </Link>

              <a href="#" className={classes.link}>
                Location
              </a>
              <a href="#" className={classes.link}>
                Pricing
              </a>
              <a href="/Contact" className={classes.link}>
                Contact Us
              </a>
            </Group>

            {/* ログイン関連トグル */}
            {loginIconToggle}
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
  
            <Link to="/" className={classes.link}>
              About
            </Link>
            <Link to="/" className={classes.link}>
              Book a Workout
            </Link>
            <a href="#" className={classes.link}>
              Location
            </a>
            <a href="#" className={classes.link}>
              Pricing
            </a>
            <a href="Contact" className={classes.link}>
              Contact Us
            </a>

            {/* ログイン関連トグル */}
            {loginIconToggle}
  
            <Divider my="sm" />

          </ScrollArea>
        </Drawer>
      </Box>
    );
  }