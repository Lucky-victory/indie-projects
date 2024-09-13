import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useBreakpointValue,
  BoxProps,
} from "@chakra-ui/react";
import { Menu, Home, Users, Settings, HelpCircle } from "lucide-react";
import { Link } from "@chakra-ui/next-js";

interface SidebarProps extends BoxProps {
  isOpen: boolean;
  variant: "drawer" | "sidebar";
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  variant,
  onClose,
  ...rest
}) => {
  return (
    <Box {...rest}>
      {variant === "drawer" ? (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Dashboard</DrawerHeader>
              <DrawerBody>
                <SidebarContent />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      ) : (
        <Box
          position="fixed"
          left={0}
          p={5}
          w="200px"
          top={0}
          h="100%"
          bg="gray.800"
        >
          <SidebarContent />
        </Box>
      )}
    </Box>
  );
};

const SidebarContent: React.FC = () => (
  <VStack spacing={6} align="stretch" color="white">
    <Link href={"/admin"}>
      <Flex align="center">
        <Home size={20} />
        <Text ml={4}>Home</Text>
      </Flex>
    </Link>
    <Flex align="center">
      <Users size={20} />
      <Text ml={4}>Users</Text>
    </Flex>
    <Flex align="center">
      <Settings size={20} />
      <Text ml={4}>Settings</Text>
    </Flex>
    <Flex align="center">
      <HelpCircle size={20} />
      <Text ml={4}>Help</Text>
    </Flex>
  </VStack>
);

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const variant = useBreakpointValue<"drawer" | "sidebar">({
    base: "drawer",
    md: "sidebar",
  });

  return (
    <>
      <Box>
        {variant === "sidebar" && (
          <Sidebar variant="sidebar" isOpen={false} onClose={() => {}} />
        )}
        <Box ml={variant === "sidebar" ? "200px" : 0}>
          <Flex bg="gray.100" p={4} justify="space-between" align="center">
            {variant === "drawer" && (
              <IconButton
                icon={<Menu size={24} />}
                onClick={onOpen}
                aria-label="Open Menu"
                variant="outline"
              />
            )}
            <Text fontSize="2xl" fontWeight="bold">
              Dashboard
            </Text>
          </Flex>
          <Box p={8}>
            {/* Your main dashboard content goes here */}
            <Text>Welcome to your WordPress-like admin dashboard!</Text>
          </Box>
        </Box>
        {variant === "drawer" && (
          <Sidebar isOpen={isOpen} variant="drawer" onClose={onClose} />
        )}
      </Box>
      {children}
    </>
  );
};

export default DashboardLayout;
