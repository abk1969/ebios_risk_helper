import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { ThreatSource } from '../../types/analysis';

interface ThreatSourceSelectorProps {
  selectedSources: ThreatSource[];
  onSourcesChange: (sources: ThreatSource[]) => void;
  disabled?: boolean;
}

const THREAT_SOURCES: Record<string, ThreatSource[]> = {
  'ORGANISATION': [
    { 
      id: 'org1', 
      name: 'Employé malveillant', 
      category: 'ORGANISATION',
      description: 'Employé interne avec des intentions malveillantes',
      capability: 3,
      motivation: 4,
      resources: 2
    },
    { 
      id: 'org2', 
      name: 'Prestataire négligent', 
      category: 'ORGANISATION',
      description: 'Prestataire externe ne respectant pas les procédures de sécurité',
      capability: 2,
      motivation: 1,
      resources: 2
    }
  ],
  'NATION': [
    { 
      id: 'nat1', 
      name: 'État hostile', 
      category: 'NATION',
      description: 'État étranger menant des opérations de cyberattaque',
      capability: 4,
      motivation: 4,
      resources: 4
    },
    { 
      id: 'nat2', 
      name: 'Service de renseignement', 
      category: 'NATION',
      description: 'Service d\'espionnage étranger',
      capability: 4,
      motivation: 3,
      resources: 4
    }
  ],
  'CYBERCRIME': [
    { 
      id: 'cyb1', 
      name: 'Groupe cybercriminel', 
      category: 'CYBERCRIME',
      description: 'Organisation criminelle spécialisée dans la cybercriminalité',
      capability: 3,
      motivation: 4,
      resources: 3
    },
    { 
      id: 'cyb2', 
      name: 'Hacker opportuniste', 
      category: 'CYBERCRIME',
      description: 'Attaquant individuel cherchant des opportunités',
      capability: 2,
      motivation: 2,
      resources: 1
    }
  ]
};

export const ThreatSourceSelector: React.FC<ThreatSourceSelectorProps> = ({
  selectedSources,
  onSourcesChange,
  disabled = false
}) => {
  const handleChange = (event: SelectChangeEvent<ThreatSource[]>) => {
    const value = event.target.value as ThreatSource[];
    onSourcesChange(value);
  };

  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="threat-sources-label">Sources de menaces</InputLabel>
      <Select
        labelId="threat-sources-label"
        multiple
        value={selectedSources}
        onChange={handleChange}
        input={<OutlinedInput label="Sources de menaces" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((source) => (
              <Chip 
                key={source.id} 
                label={source.name}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      >
        {Object.entries(THREAT_SOURCES).map(([category, sources]) => (
          <Box key={category}>
            <MenuItem 
              disabled 
              sx={{ 
                opacity: 0.7,
                backgroundColor: 'background.default',
                typography: 'subtitle2'
              }}
            >
              {category}
            </MenuItem>
            {sources.map((source) => (
              <MenuItem key={source.id} value={source}>
                <Box>
                  <Typography variant="body1">{source.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {source.description}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Box>
        ))}
      </Select>
    </FormControl>
  );
};
