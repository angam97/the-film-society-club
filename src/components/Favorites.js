import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Favorites({ favorites }) {
  const [searchParams] = useSearchParams();

  const [anchor, setAnchor] = useState(null);
  const open = !!anchor;

  const handleOpen = (e) => {
    setAnchor(e.target);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <FavoriteIcon />
      </IconButton>
      <Popper
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="composition-menu">
                  {favorites.map(({ imdbID, Title }) => (
                    <MenuItem
                      component={Link}
                      to={{
                        pathname: `movie/${imdbID}`,
                        search: searchParams.toString(),
                      }}
                      key={imdbID}
                    >
                      {Title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
