import React, { useState } from "react";
import './styles.css';
import { TextField ,Box} from "@mui/material";
import imageBoy from '../assets/boy.jpg'
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
const HeadBar = () => {
    const [search,setSearch] = useState("")

  return (
    <div className="header">
      <div className="search-container">
        <TextField
          variant="outlined"
          placeholder="Search to jump"
          className="input-search"
          type="search" value={search}
          onChange={(e)=>setSearch(e.target.value)} 
        />
      </div>
      <div className="notification-container">
       
          <NotificationsOutlinedIcon />
          <Box
          component="img"
          sx={{
            height: 40,
            width: 40,
            borderRadius: '50%',
            ml: 2,
          }}
          alt="Profile"
          src={imageBoy}
        />
      </div>
    </div>
  );
};

export default HeadBar;
