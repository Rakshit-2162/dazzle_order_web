import { useState, type ReactNode } from "react";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Stack,
  Typography,
} from "@mui/material";
import PrimaryButton from "./common/PrimaryButton";
import SecondaryButton from "./common/SecondaryButton";

interface CustomStepperProps {
  steps: string[];
  stepContents: ReactNode[]; // content for each step
  onConfirm?: () => void;
}

function CustomStepper({ steps, stepContents, onConfirm }: CustomStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": {
            width: 28,
            height: 28,
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={index < activeStep}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ display: "flex" }}>
        {stepContents[activeStep] || (
          <Typography variant="body1">No content for this step</Typography>
        )}
      </Box>

      {/* Buttons */}
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <SecondaryButton
          label="Back"
          disabled={activeStep === 0}
          onClick={handleBack}
        />
        {activeStep === 0 ? (
          <SecondaryButton
            label="Next"
            disabled={activeStep >= steps.length - 1}
            onClick={handleNext}
          />
        ) : (
          <PrimaryButton
            label="Confirm"
            disabled={activeStep !== steps.length - 1}
            onClick={handleConfirm}
          />
        )}
      </Stack> 
    </Box>
  );
}

export default CustomStepper;
