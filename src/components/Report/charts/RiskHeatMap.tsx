import React, { useMemo, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Risk } from '../../../types';
import { useTranslation } from 'react-i18next';
import { ColorLegend } from '../../../components/Report/charts/ColorLegend';
import { Tooltip } from '@mui/material';

interface Props {
  risks: Risk[];
  onCellClick?: (likelihood: number, gravity: number) => void;
}

const GRID_SIZE = 4;
const CELL_HEIGHT = 80;
const COLOR_BASE = 'rgba(255, 0, 0,';

export const RiskHeatMap: React.FC<Props> = ({ risks = [], onCellClick }) => {
  if (!Array.isArray(risks)) {
    console.error('Les risques doivent être fournis sous forme de tableau');
    return null;
  }

  const theme = useTheme();
  const { t } = useTranslation();

  const heatmapData = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => 
      Array.from({ length: 4 }, (_, j) => {
        const matchingRisks = risks.filter(risk => 
          risk.likelihoodLevel === i + 1 && risk.gravityLevel === j + 1
        );
        return {
          likelihood: i + 1,
          gravity: j + 1,
          count: matchingRisks.length,
          risks: matchingRisks
        };
      })
    );
  }, [risks]);

  const getColorIntensity = useCallback((count: number): string => {
    const maxCount = Math.max(...heatmapData.flat().map(cell => cell.count));
    const intensity = count === 0 ? 0 : (count / maxCount) * 0.8 + 0.2;
    return `rgba(255, 0, 0, ${intensity})`;
  }, [heatmapData]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t('riskHeatMap.title')}
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 2 }}>
        {/* Axe Y - Probabilité */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pr: 2 }}>
          {[4, 3, 2, 1].map(level => (
            <Typography key={level} variant="body2">
              {t(`likelihood.level${level}`)}
            </Typography>
          ))}
        </Box>

        {/* Grille principale */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          {heatmapData.map((row, i) =>
            row.map((cell, j) => (
              <motion.div
                key={`${i}-${j}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => onCellClick?.(cell.likelihood, cell.gravity)}
              >
                <Tooltip
                  title={
                    <Box>
                      <Typography variant="body2">
                        {t('riskHeatMap.cellInfo', {
                          count: cell.count,
                          likelihood: t(`likelihood.level${cell.likelihood}`),
                          gravity: t(`gravity.level${cell.gravity}`)
                        })}
                      </Typography>
                      {cell.risks.map(risk => (
                        <Typography key={risk.id} variant="caption" display="block">
                          • {risk.name}
                        </Typography>
                      ))}
                    </Box>
                  }
                >
                  <Box
                    sx={{
                      height: 80,
                      bgcolor: getColorIntensity(cell.count),
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: 2
                      },
                      role: 'button',
                      'aria-label': t('riskHeatMap.cellAriaLabel', {
                        count: cell.count,
                        likelihood: t(`likelihood.level${cell.likelihood}`),
                        gravity: t(`gravity.level${cell.gravity}`)
                      })
                    }}
                  >
                    <Typography color="white" fontWeight="bold">
                      {cell.count}
                    </Typography>
                  </Box>
                </Tooltip>
              </motion.div>
            ))
          )}
        </Box>
      </Box>

      {/* Axe X - Gravité */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2, ml: 'auto' }}>
        {[1, 2, 3, 4].map(level => (
          <Typography key={level} variant="body2">
            {t(`gravity.level${level}`)}
          </Typography>
        ))}
      </Box>

      <ColorLegend />
    </Box>
  );
};