import React from 'react';
import { Box } from '@mui/material';
import ChatPopup from './ChatPopup';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      {/* Nội dung chính */}
      {children}

      {/* Popup Chat */}
      <ChatPopup />
    </Box>
  );
};

export default Layout;
