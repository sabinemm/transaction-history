import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export type ListItemProps = {
  height: number;
  hash: string;
  messages: [];
  logs: [];
  block: {
    height: number;
    timestamp: string;
  };
};

export const ListItem = ({ item }: { item: ListItemProps }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  console.log(item);

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={item.height} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary={item.hash} />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  );
};
