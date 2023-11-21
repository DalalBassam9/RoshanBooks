


"use client";
import create from "zustand";
import { persist } from "zustand/middleware";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Sidenav() {
    const theme = useTheme();
    const router = useRouter();
    const [open, setOpen] = useState(true);

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                {/* <IconButton onClick={() => setOpen(!open)}>
         <MenuIcon />
        </IconButton> */}
            </DrawerHeader>
            <List>
                <ListItem
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

                <ListItem
                    disablePadding
                    sx={{ display: "block" }}
                     

                        onClick={() => {
                            router.push('/admin/products/');
                        }}

                    >
                        
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >

                            <StorefrontIcon />
                        </ListItemIcon>
                        <ListItemText primary="Products" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </ListItem>
            
                <ListItem
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => {
                        router.push('/admin/cities');  
                    }}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >

                            <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cities" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => {
                        router.push('/admin/categories');
                    }}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categories" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
