import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Tooltip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  DragIndicator as DragIndicatorIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ScenarioStep } from '../../types/analysis';

interface StepsListProps {
  steps: ScenarioStep[];
  onStepsUpdate: (steps: ScenarioStep[]) => void;
  readOnly?: boolean;
}

export const StepsList: React.FC<StepsListProps> = ({
  steps,
  onStepsUpdate,
  readOnly = false
}) => {
  const handleAddStep = () => {
    const newStep: ScenarioStep = {
      id: `step-${Date.now()}`,
      description: '',
      order: steps.length,
      technicalAssets: [],
      vulnerabilities: []
    };
    onStepsUpdate([...steps, newStep]);
  };

  const handleStepChange = (stepId: string, description: string) => {
    const updatedSteps = steps.map(step =>
      step.id === stepId ? { ...step, description } : step
    );
    onStepsUpdate(updatedSteps);
  };

  const handleDeleteStep = (stepId: string) => {
    const updatedSteps = steps
      .filter(step => step.id !== stepId)
      .map((step, index) => ({ ...step, order: index }));
    onStepsUpdate(updatedSteps);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedSteps = items.map((step, index) => ({
      ...step,
      order: index
    }));

    onStepsUpdate(reorderedSteps);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {steps.map((step, index) => (
                <Draggable 
                  key={step.id} 
                  draggableId={step.id} 
                  index={index}
                  isDragDisabled={readOnly}
                >
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{
                        bgcolor: snapshot.isDragging ? 'action.hover' : 'transparent',
                        borderRadius: 1,
                        mb: 1
                      }}
                    >
                      {!readOnly && (
                        <Box {...provided.dragHandleProps} sx={{ mr: 2 }}>
                          <DragIndicatorIcon color="action" />
                        </Box>
                      )}
                      <Box sx={{ flexGrow: 1 }}>
                        <TextField
                          fullWidth
                          value={step.description}
                          onChange={(e) => handleStepChange(step.id, e.target.value)}
                          placeholder={`Étape ${index + 1}`}
                          variant="outlined"
                          size="small"
                          disabled={readOnly}
                          multiline
                        />
                        {step.technicalAssets.length > 0 && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ mt: 1, display: 'block' }}
                          >
                            Actifs techniques : {step.technicalAssets.join(', ')}
                          </Typography>
                        )}
                      </Box>
                      {!readOnly && (
                        <Tooltip title="Supprimer l'étape">
                          <IconButton 
                            edge="end" 
                            onClick={() => handleDeleteStep(step.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      
      {!readOnly && (
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddStep}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Ajouter une étape
        </Button>
      )}
    </Paper>
  );
};
