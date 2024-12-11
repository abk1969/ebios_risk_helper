import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ColorLegend: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {t('riskHeatMap.legend')}:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 20, height: 20, bgcolor: 'rgba(255, 0, 0, 0.2)' }} />
        <Typography variant="body2">{t('riskHeatMap.low')}</Typography>
        <Box sx={{ width: 20, height: 20, bgcolor: 'rgba(255, 0, 0, 0.6)' }} />
        <Typography variant="body2">{t('riskHeatMap.medium')}</Typography>
        <Box sx={{ width: 20, height: 20, bgcolor: 'rgba(255, 0, 0, 1)' }} />
        <Typography variant="body2">{t('riskHeatMap.high')}</Typography>
      </Box>
    </Box>
  );
};