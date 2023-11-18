import { forwardRef } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton, rem, Button } from '@mantine/core';
import { useStore } from "@/store/state/store";

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

import {
  IconSettings,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

type userProps = {
  name: string,
  email: string
}

export default function UserMenu(props : userProps) {
  const setAuthentication = useStore((state) => state.setAuthentication)
  const { name, email } = props

  const handleLogout = () => {
    localStorage.removeItem("jwt_token")
    localStorage.removeItem("jwt_refresh_token")
    setAuthentication(false)
    location.reload();
  }


  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name={name}
          email={email}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Preferences
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Account</Menu.Label>
        <Menu.Item 
          onClick={handleLogout}
          leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
        >
          Log Out
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}