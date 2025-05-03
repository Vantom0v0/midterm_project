import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#1A1A1A', color: 'white', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" gutterBottom>
                    Contact for work, copyright and more:
                </Typography>
                <Typography variant="body2" gutterBottom>
                    ad.admin@gmail.com
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Điều khoản dịch vụ
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Chính sách bảo mật
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '20px' }}>
                    © 2023 - Comik.net
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;