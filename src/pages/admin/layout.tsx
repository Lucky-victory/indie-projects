import React from "react";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  Link,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const DashboardLayout: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <Box>
      <Flex>
        <HamburgerIcon onClick={toggleDrawer} />
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={toggleDrawer}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Dashboard Menu</DrawerHeader>
            <DrawerBody>
              <List spacing={3}>
                <ListItem>
                  <Link href="/">
                    <Text>Home</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/about">
                    <Text>About</Text>
                  </Link>
                </ListItem>
                {/* Add more links as needed */}
              </List>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Box ml={6}>{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
