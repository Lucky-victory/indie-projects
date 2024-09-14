import React, {
  ReactNode,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
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
  type BoxProps,
  Icon,
  Tooltip,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import {
  Menu,
  Home,
  Users,
  Settings,
  HelpCircle,
  FileStack,
  Palette,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";

interface SidebarProps extends BoxProps {
  isOpen: boolean;
  variant: "drawer" | "sidebar";
  onClose: () => void;
  isMinimized: boolean;
  setIsMinimized: Dispatch<SetStateAction<boolean>>;
}

const navItems = [
  { icon: Home, label: "Home", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  {
    icon: FileStack,
    label: "Posts",
    href: "/admin/posts",
    children: [
      { label: "All Posts", href: "/admin/posts" },
      { label: "New Post", href: "/admin/posts/new" },
    ],
  },
  { icon: Palette, label: "Themes", href: "/admin/themes" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: HelpCircle, label: "Help", href: "/admin/help" },
];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  variant,
  onClose,
  setIsMinimized,
  isMinimized,
  ...rest
}) => {
  const toggleMinimized = () => setIsMinimized(!isMinimized);
  const sidebarBgColor = useColorModeValue("white", "gray.900");
  const sidebarBorderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Box {...rest}>
      {variant === "drawer" ? (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Dashboard</DrawerHeader>
              <DrawerBody px={0}>
                <SidebarContent
                  variant="drawer"
                  onClose={onClose}
                  isMinimized={false}
                  toggleMinimized={toggleMinimized}
                />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      ) : (
        <Box
          position="fixed"
          left={0}
          w={
            isMinimized
              ? "var(--dash-sidebar-mini-w)"
              : "var(--admin-sidebar-width)"
          }
          top={0}
          h="100%"
          bg={sidebarBgColor}
          borderRight="1px"
          borderRightColor={sidebarBorderColor}
        >
          <SidebarContent
            variant="sidebar"
            onClose={onClose}
            isMinimized={isMinimized}
            toggleMinimized={toggleMinimized}
          />
        </Box>
      )}
    </Box>
  );
};

const SidebarContent: React.FC<{
  onClose: () => void;
  isMinimized: boolean;
  toggleMinimized: () => void;
  variant: "drawer" | "sidebar";
}> = ({ onClose, isMinimized, toggleMinimized, variant }) => {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const activeParent = navItems.find(
      (item) =>
        item.children &&
        item.children.some((child) => pathname.startsWith(child.href))
    );
    if (activeParent) {
      setOpenItems((prev) =>
        prev.includes(activeParent.href) ? prev : [...prev, activeParent.href]
      );
    }
  }, [pathname]);

  const toggleOpen = (href: string) => {
    setOpenItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const color = useColorModeValue("gray.600", "gray.300");
  const NavItem = ({
    icon,
    children,
    href,
    nested = false,
  }: {
    icon?: React.ElementType;
    children: ReactNode;
    href: string;
    nested?: boolean;
  }) => {
    const isActive = pathname === href;
    const activeColor = "white";

    return (
      <Tooltip
        rounded="md"
        label={isMinimized ? children : ""}
        placement="right"
        hasArrow
      >
        <Flex
          borderRadius="none"
          role="group"
          color={isActive ? activeColor : color}
          bg={isActive ? "blue.500" : "transparent"}
          _hover={{
            bg: isActive ? "blue.700" : "blue.100",
            color: isActive ? "white" : "blue.600",
          }}
        >
          <Button
            as={Link}
            colorScheme="black"
            variant="ghost"
            fontWeight={isActive ? "500" : "400"}
            size={nested ? "sm" : "md"}
            href={href}
            w="full"
            justifyContent={isMinimized ? "center" : "flex-start"}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            onClick={onClose}
          >
            {icon && (
              <Icon as={icon} mr={isMinimized ? "0" : "4"} fontSize="16" />
            )}
            {!isMinimized && children}
          </Button>
        </Flex>
      </Tooltip>
    );
  };

  return (
    <Box>
      {variant !== "drawer" && (
        <Flex
          h={"var(--dash-header-h)"}
          alignItems="center"
          mx={6}
          justifyContent="space-between"
        >
          {!isMinimized && (
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Dashboard
            </Text>
          )}

          <Icon
            as={isMinimized ? ChevronRight : ChevronLeft}
            onClick={toggleMinimized}
            fontSize="24"
            cursor="pointer"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      )}
      <VStack spacing={4} align="stretch">
        {navItems.map((item, index) => {
          return (
            <Box key={index}>
              {isMinimized ? (
                <NavItem icon={item.icon} href={item.href}>
                  {item.label}
                </NavItem>
              ) : (
                <>
                  {item.children ? (
                    <Box>
                      <Flex
                        align="center"
                        py="2"
                        px="4"
                        mx="0"
                        borderRadius="none"
                        cursor="pointer"
                        onClick={() => toggleOpen(item.href)}
                        _hover={{
                          bg: openItems.includes(item.href)
                            ? "blue.700"
                            : "blue.50",
                          color: openItems.includes(item.href)
                            ? "white"
                            : color,
                        }}
                        bg={
                          item.children.some((child) =>
                            pathname.startsWith(child.href)
                          )
                            ? "blue.500"
                            : "transparent"
                        }
                        color={
                          item.children.some((child) =>
                            pathname.startsWith(child.href)
                          )
                            ? "white"
                            : "inherit"
                        }
                      >
                        <Icon as={item.icon} mr="4" fontSize="16" />
                        <Text flex="1" as={"span"}>
                          {item.label}
                        </Text>
                        <Icon
                          as={ChevronDown}
                          transition="all .25s ease-in-out"
                          transform={
                            openItems.includes(item.href)
                              ? "rotate(180deg)"
                              : ""
                          }
                        />
                      </Flex>
                      {openItems.includes(item.href) && (
                        <VStack
                          role="group"
                          spacing={3}
                          align="stretch"
                          p={3}
                          mt={-1}
                          zIndex={1}
                          bg={"gray.100"}
                        >
                          {item.children.map((child, childIndex) => (
                            <NavItem key={childIndex} href={child.href} nested>
                              {child.label}
                            </NavItem>
                          ))}
                        </VStack>
                      )}
                    </Box>
                  ) : (
                    <NavItem icon={item.icon} href={item.href}>
                      {item.label}
                    </NavItem>
                  )}
                </>
              )}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const variant = useBreakpointValue<"drawer" | "sidebar">({
    base: "drawer",
    md: "sidebar",
  });
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      <Box>
        {variant === "sidebar" && (
          <Sidebar
            variant="sidebar"
            isOpen={false}
            onClose={() => {}}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
          />
        )}
        <Box
          ml={
            variant === "sidebar" && !isMinimized
              ? "var(--admin-sidebar-width)"
              : variant === "sidebar" && isMinimized
              ? "var(--dash-sidebar-mini-w)"
              : 0
          }
        >
          <Flex bg="gray.100" p={3} justify="space-between" align="center">
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
          <Box p={{base:3,md:4,lg:6}}>{children}</Box>
        </Box>
        {variant === "drawer" && (
          <Sidebar
            isOpen={isOpen}
            variant="drawer"
            onClose={onClose}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
          />
        )}
      </Box>
    </>
  );
};

export default DashboardLayout;
