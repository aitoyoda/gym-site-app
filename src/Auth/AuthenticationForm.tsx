import React, { useEffect } from 'react';
import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Stack,
} from '@mantine/core';
import { useNavigate,useLocation } from 'react-router-dom';
import { GoogleButton } from './GoogleButton'; // Googleボタンのimportをコメントアウト
import { TwitterButton } from './TwitterButton'; // Twitterボタンのimportをコメントアウト
// firebaseのインポート
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from '../firebase';

export function AuthenticationForm(props: PaperProps) {
  const location = useLocation();
  const path = location.pathname;
  const type = path === '/LogIn' ? 'login' : 'register';
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  //新規登録
  const addUser = async () => {
    const auth = getAuth();
    try {
        const { email, password } = form.values;
        // Firebase Authentication を使用してユーザーを登録
        await createUserWithEmailAndPassword(auth, email, password);
        alert('ユーザー登録が完了しました！');
        //フォームクリア
        form.setFieldValue('email', '');
        form.setFieldValue('name', '');
        form.setFieldValue('password', ''); 
        form.setFieldValue('terms', false);
    } catch (error) {
        console.error('ユーザー登録エラー:', error);
        alert('ユーザー登録に失敗しました。');
    }
  };

  //ログイン
  const login = async () => {
    const auth = getAuth();
    try {
      const { email, password } = form.values;
      // Firebase Authentication を使用してユーザーをログイン
      await signInWithEmailAndPassword(auth, email, password);
      alert('ログインに成功しました！');
      sessionStorage.setItem('isLoggedIn', 'true');
      //フォームクリア
      form.setFieldValue('email', ''); 
      form.setFieldValue('password', '');
    } catch (error) {
      console.error('ログインエラー:', error);
      alert('ログインに失敗しました。');
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Gym site, {type} with
      </Text>

      {/* googleとtwitterボタン */}
      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {
        // フォーム送信先関数条件分岐
        if (type === 'register') {
          addUser();
        }else {
          login();
        }
      })}>
        <Stack>
        {type === 'register' && (
            <TextInput
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => form.setFieldValue('name', event.currentTarget.value)}
            radius="md"
            />
        )}

        <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
        />

        <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
        />

        {type === 'register' && (
            <Checkbox
            label="I accept terms and conditions"
            checked={form.values.terms}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
        )}
        </Stack>
        
        <Button type="submit" radius="xl">
          {upperFirst(type)}
        </Button>

      </form>
    </Paper>
  );
}

export default AuthenticationForm;
