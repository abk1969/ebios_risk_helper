import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Slider,
  IconButton,
  Collapse,
  Box,
  Chip,
  Grid,
  Button,
  Tooltip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { OperationalScenario } from '../../types/analysis';
import { StepsList } from '../lists/StepsList';
import { styled } from '@mui/material/styles';

const ExpandMoreButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>(({ theme, expanded }) => ({
  transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ScenarioCardProps {
  scenario: OperationalScenario;
  onUpdate: (scenario: OperationalScenario) => void;
  onDelete?: () => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onUpdate,
  onDelete
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localScenario, setLocalScenario] = useState(scenario);

  const handleSave = () => {
    onUpdate(localScenario);
    setIsEditing(false);
  };

  const getLikelihoodLabel = (value: number) => {
    const labels = ['Minimal', 'Faible', 'Significatif', 'Maximal'];
    return labels[value - 1];
  };

  const getImpactLabel = (value: number) => {
    const labels = ['Négligeable', 'Limité', 'Important', 'Critique'];
    return labels[value - 1];
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            {isEditing ? (
              <TextField
                fullWidth
                value={localScenario.title}
                onChange={(e) => setLocalScenario({
                  ...localScenario,
                  title: e.target.value
                })}
                label="Titre du scénario"
              />
            ) : (
              <Typography variant="h6">{scenario.title}</Typography>
            )}
          </Grid>
          <Grid item>
            <Tooltip title={isEditing ? "Sauvegarder" : "Modifier"}>
              <IconButton onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}>
                {isEditing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
            <ExpandMoreButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMoreButton>
          </Grid>
        </Grid>

        <Collapse in={expanded}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Description
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={localScenario.description}
                onChange={(e) => setLocalScenario({
                  ...localScenario,
                  description: e.target.value
                })}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {scenario.description}
              </Typography>
            )}

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Probabilité de réalisation
            </Typography>
            <Slider
              value={isEditing ? localScenario.likelihood : scenario.likelihood}
              onChange={(_, value) => setLocalScenario({
                ...localScenario,
                likelihood: value as number
              })}
              disabled={!isEditing}
              min={1}
              max={4}
              marks
              step={1}
              valueLabelDisplay="auto"
              valueLabelFormat={getLikelihoodLabel}
            />

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Impact potentiel
            </Typography>
            <Slider
              value={isEditing ? localScenario.impact : scenario.impact}
              onChange={(_, value) => setLocalScenario({
                ...localScenario,
                impact: value as number
              })}
              disabled={!isEditing}
              min={1}
              max={4}
              marks
              step={1}
              valueLabelDisplay="auto"
              valueLabelFormat={getImpactLabel}
            />

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Sources de menaces associées
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {scenario.threatSources.map((source) => (
                <Chip
                  key={source.id}
                  label={source.name}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Étapes du scénario
            </Typography>
            <StepsList
              steps={localScenario.steps}
              onStepsUpdate={(steps) => setLocalScenario({
                ...localScenario,
                steps
              })}
              readOnly={!isEditing}
            />
          </Box>
        </Collapse>
      </CardContent>
      {onDelete && (
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={onDelete}
          >
            Supprimer
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
