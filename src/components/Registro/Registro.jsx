import { forwardRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Toaster } from "sonner";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Registro({
  steps,
  getStepContent,
  handleFinish,
  setValidarErrores,
  schema,
  usuario,
}) {
  Registro.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    getStepContent: PropTypes.func.isRequired,
    handleFinish: PropTypes.func.isRequired,
    setValidarErrores: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    usuario: PropTypes.object.isRequired,
  };
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [terminos, setTerminos] = useState(false);

  const handleNext = () => {
    try {
      // Intenta validar los campos con Yup
      schema.validateSync(usuario, { abortEarly: false });
      // Si no hay errores, puedes avanzar al siguiente paso
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    } catch (error) {
      // Si hay errores, actualiza el estado de errores de validación
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setValidarErrores(errors);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    window.scrollTo(0, 0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 10 },
            p: { xs: 2, md: 3 },
            borderRadius: "12px",
            boxShadow: "0 14px 28px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography component="h1" variant="h4" align="center">
            Crea tu cuenta
          </Typography>
          <Stepper
            activeStep={activeStep}
            orientation={isSmallScreen ? "vertical" : "horizontal"}
            sx={{ pt: 5, pb: 5 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    // Color de el circulo de cada paso
                    "& .MuiStepIcon-root.Mui-active": {
                      color: "#3aa4cc",
                    },
                    // Color de el circulo de cada paso cuando ya se completo
                    "& .MuiStepIcon-root.Mui-completed": {
                      color: "#5fa92c",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {getStepContent(activeStep)}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              
              { activeStep === steps.length - 1 &&
                <Grid container>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={terminos}
                        onChange={() => setTerminos(!terminos)}
                        name="terminos"
                        color="primary"
                      />
                    }
                    label="Acepto los términos y condiciones"
                  />
                </Grid>
              </Grid>}
            
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClickOpen}
                >
                  Cancelar
                </Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle>
                    ¿Estás seguro que deseas cancelar el registro?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Si cancelas el registro, perderás todos los datos
                      ingresados hasta el momento.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button
                      onClick={() => {
                        window.location.href = "/";
                      }}
                      autoFocus
                    >
                      Si
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>

              <Box
                sx={{
                  display: {
                    xs: "grid",
                    sm: "flex",
                  },
                  justifyContent: "flex-end",
                }}
              >
                {activeStep !== 0 && (
                  <Button onClick={handleBack}>Anterior</Button>
                )}
                <Toaster richColors />
                

                <Button
                  variant="contained"
                  disabled={activeStep === steps.length - 1 && !terminos}
                  onClick={
                    activeStep === steps.length - 1 ? handleFinish : handleNext
                  }
                  sx={{
                    ml: 2,
                    backgroundColor: "#5fa92c",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#5fa92c" },
                  }}
                >
                  {activeStep === steps.length - 1 ? "Confirmar" : "Siguiente"}

                </Button>
              </Box>
            </Box>
          </>
        </Paper>
      </Container>
    </>
  );
}
