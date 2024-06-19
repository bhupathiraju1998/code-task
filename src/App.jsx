import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as CalendarIcon,
  BarChart as ChartIcon,
  AttachMoney as SellIcon,
  Public as GlobeIcon,
  HeadsetMic as HeadsetIcon,
  Note as NoteIcon,
  InsertChart as PresentationIcon,
  Group as MultiplePeopleIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import HeadBar from "./components/HeadBar";
import MainComponent from "./components/MainComponent";


const sidebarItems = [
  { key: "Person", label: "Person", icon: <PersonIcon /> },
  { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { key: "people", label: "People", icon: <PeopleIcon /> },
  { key: "presentation", label: "Presentation", icon: <PresentationIcon /> },
  { key: "calendar", label: "Calendar", icon: <CalendarIcon /> },
  { key: "sales", label: "Sales", icon: <SellIcon /> },
  { key: "notepad", label: "Notepad", icon: <NoteIcon /> },
  { key: "chart", label: "Chart", icon: <ChartIcon /> },
  { key: "sell", label: "Sell", icon: <SellIcon /> },
  {
    key: "multiple-people",
    label: "Multiple People",
    icon: <MultiplePeopleIcon />,
  },
  { key: "globe", label: "Globe", icon: <GlobeIcon /> },
  { key: "headset", label: "Headset", icon: <HeadsetIcon /> },
];

const App = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 170 : 60,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 170 : 60,
            boxSizing: "border-box",
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <List>
          {sidebarItems.map((item) => (
            <ListItem key={item.key}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItem>
          ))}
        </List>

        <IconButton
          onClick={handleToggle}
          sx={{
            position: "absolute",
            top: 30,
            right: open ? -20 : -20,
          }}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Drawer>
      <Grid container direction="column">
       <HeadBar/>
        <MainComponent/>
      </Grid>
    </div>
  );
};

export default App;
