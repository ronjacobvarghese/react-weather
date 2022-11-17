import { Drawer, useMantineTheme, Input, Button } from "@mantine/core";

import styles from "./LoginPage.module.css";
function LoginPage(props) {
  const theme = useMantineTheme();

  return (
    <Drawer
      opened={props.isOpen}
      onClose={props.onClose}
      size="lg"
      position="left"
      padding="xl"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlue={3}
    >
      <Input.Wrapper label="Email" required>
        <Input placeholder="Your email" />
      </Input.Wrapper>
      <Input.Wrapper
        styles={{ root: { marginTop: "1rem" } }}
        label="Password"
        required
      >
        <Input placeholder="Your password" />
      </Input.Wrapper>
      <Button classNames={{ root: styles["form-button"] }}>Log In</Button>
      <Button classNames={{root: styles["sign-button"]}}>Sign Up</Button>
      </Drawer>
  );
}

export default LoginPage;
