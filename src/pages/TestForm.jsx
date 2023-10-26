// import { Button, Form } from 'react-bootstrap';
// import TextInput from '../components/TextInput';
// function BasicExample() {
//   return (
//     <>
//       <div className="container">
//         <div className="row col-md-12">
//           <div className="col-md-6">
//             <TextInput
//               label="RESPONDENT NAME"
//               name="respondentName"
//               type="text"
//               placeholder="Please provide your full name..."
//             />
//           </div>
//           <div className="col-md-6">
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" />
//             </Form.Group>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BasicExample;

// import React, { useState } from 'react';
// import { Button, Container, Typography, Box } from '@mui/material';
// import { Formik, FieldArray, Form } from 'formik';
// import { TextField, IconButton } from '@mui/material';
// import { RemoveCircle } from '@mui/icons-material';

// const DynamicInputField = ({ field, index, onRemove }) => {
//   return (
//     <Box key={field.id} display="flex" alignItems="center">
//       <TextField
//         label={`Field ${index + 1}`}
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         {...field}
//       />
//       <IconButton onClick={() => onRemove(field.id)}>
//         <RemoveCircle />
//       </IconButton>
//     </Box>
//   );
// };

// const DynamicForm = () => {
//   const [fieldCounter, setFieldCounter] = useState(0);

//   const handleAddField = () => {
//     setFieldCounter(fieldCounter + 1);
//   };

//   const handleRemoveField = (id) => {
//     setFieldCounter(fieldCounter - 1);
//   };

//   const initialValues = {
//     fields: [],
//   };

//   const handleSubmit = (values) => {
//     console.log("v  ",values);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//         {(formik) => (
//           <Form>
//             <FieldArray name="fields">
//               {(arrayHelpers) => (
//                 <div>
//                   {formik.values.fields.map((field, index) => (
//                     <DynamicInputField
//                       key={field.id}
//                       field={field}
//                       form={formik}
//                       index={index}
//                       onRemove={(id) => {
//                         console.log("arr ", arrayHelpers);
//                         arrayHelpers.remove(index);
//                         handleRemoveField(id);
//                       }}
//                     />
//                   ))}
//                   <Button
//                     type="button"
//                     onClick={(v) => {
//                       arrayHelpers.push({ id: fieldCounter });
//                       handleAddField();
//                     }}
//                   >
//                     Add Field
//                   </Button>
//                 </div>
//               )}
//             </FieldArray>
//             <Box mt={2}>
//               <Button type="submit" variant="contained" color="primary">
//                 Submit
//               </Button>
//             </Box>
//           </Form>
//         )}
//       </Formik>
//     </Container>
//   );
// };

// export default DynamicForm;

// import React from 'react';
// import { Formik, Form, Field, FieldArray } from 'formik';


// const FriendList = () => (
//   <div>
//     <Formik
//       initialValues={{ friends: ['jared'] }}
//       onSubmit={values =>
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//         }, 500)
//       }
//       children={({ values }) => (
//         <Form>
//           <FieldArray
//             name="friends"
//             render={arrayHelpers => (
//               <div>
//                 {values.friends.map((friend, index) => (
//                   <div key={index}>
//                     <Field name={`friends[${index}].name`} />
//                     <Field name={`friends.${index}.age`} />

//                     <button type="button" onClick={() => arrayHelpers.remove(index)}>
//                       -
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => arrayHelpers.push({ name: '', age: '' })}
//                 >
//                   +
//                 </button>
//                 <div>
//                   <button type="submit">Submit</button>
//                 </div>
//               </div>
//             )}
//           />
//         </Form>
//       )}
//     />
//   </div>
// );
// export default FriendList


// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import InfoIcon from '@mui/icons-material/Info';

// const FormWithHelpers = () => {
//   const [helperText, setHelperText] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//   });

//   const handleHelperIconClick = (fieldName) => {
//     // Update helper text based on the clicked field
//     const updatedHelperText = { ...helperText };
//     updatedHelperText[fieldName] = 'Additional information here';
//     setHelperText(updatedHelperText);
//   };

//   return (
//     <form>
//       <TextField
//         label="First Name"
//         helperText={helperText.firstName}
//         InputProps={{
//           endAdornment: (
//             <Tooltip title="Click for more info">
//               <IconButton
//                 aria-label="helper"
//                 onClick={() => handleHelperIconClick('firstName')}
//               >
//                 <InfoIcon />
//               </IconButton>
//             </Tooltip>
//           ),
//         }}
//       />
//       <br />
//       <TextField
//         label="Last Name"
//         helperText={helperText.lastName}
//         InputProps={{
//           endAdornment: (
//             <Tooltip title="Click for more info">
//               <IconButton
//                 aria-label="helper"
//                 onClick={() => handleHelperIconClick('lastName')}
//               >
//                 <InfoIcon />
//               </IconButton>
//             </Tooltip>
//           ),
//         }}
//       />
//       <br />
//       <TextField
//         label="Email"
//         helperText={helperText.email}
//         InputProps={{
//           endAdornment: (
//             <Tooltip title="Click for more info">
//               <IconButton
//                 aria-label="helper"
//                 onClick={() => handleHelperIconClick('email')}
//               >
//                 <InfoIcon />
//               </IconButton>
//             </Tooltip>
//           ),
//         }}
//       />
//     </form>
//   );
// };

// export default FormWithHelpers;






// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import Popper from '@mui/material/Popper';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import InfoIcon from '@mui/icons-material/Info';

// const FormWithPopper = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [helperText, setHelperText] = useState('');

//   const handleHelperIconClick = (event, text) => {
//     setAnchorEl(event.currentTarget);
//     setHelperText(text);
//   };

//   const handlePopperClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <form>
//       <TextField
//         label="First Name"
//         InputProps={{
//           endAdornment: (
//             <IconButton
//               aria-label="helper"
//               onClick={(event) =>
//                 handleHelperIconClick(event, 'Additional information for First Name field')
//               }
//             >
//               <InfoIcon />
//             </IconButton>
//           ),
//         }}
//       />
//       <br />
//       <TextField
//         label="Last Name"
//         InputProps={{
//           endAdornment: (
//             <IconButton
//               aria-label="helper"
//               onClick={(event) =>
//                 handleHelperIconClick(event, 'Additional information for Last Name field')
//               }
//             >
//               <InfoIcon />
//             </IconButton>
//           ),
//         }}
//       />
//       <br />
//       <TextField
//         label="Emaill"
//         InputProps={{
//           endAdornment: (
//             <IconButton
//               aria-label="helper"
//               onClick={(event) =>
//                 handleHelperIconClick(event, 'Additional information for Email field')
//               }
//             >
//               <InfoIcon />
//             </IconButton>
//           ),
//         }}
//       />
//       <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
//         <ClickAwayListener onClickAway={handlePopperClose}>
//           <Paper>
//             <Typography sx={{ p: 2 }}>{helperText}</Typography>
//           </Paper>
//         </ClickAwayListener>
//       </Popper>
//     </form>
//   );
// };

// export default FormWithPopper;



// import React, { useState } from 'react';
// import { TextField, IconButton, Paper, Typography, Popper } from '@mui/material';
// import { HelpOutline } from '@mui/icons-material';
// const FormWithHelperIcons = () => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleHelperIconClick = (event) => {
//     console.log("a ",event);
//     setAnchorEl(anchorEl ? null : event.currentTarget);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'helper-popper' : undefined;

//   return (
//     <div>
//       <TextField
//         label="Field 1"
//         variant="outlined"
//         helperText={
//           <IconButton size="small" onClick={handleHelperIconClick}>
//             <HelpOutline />
//           </IconButton>
//         }
//       />
//       <TextField
//         label="Field 2"
//         variant="outlined"
//         helperText={
//           <IconButton size="small" onClick={handleHelperIconClick}>
//             <HelpOutline />
//           </IconButton>
//         }
//       />

//       <Popper id={id} open={open} anchorEl={anchorEl}>
//         <Paper elevation={3} style={{ padding: '10px' }}>
//           <Typography>This is additional information about the field.</Typography>
//         </Paper>
//       </Popper>
//     </div>
//   );
// };

// export default FormWithHelperIcons;


// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Button } from '@mui/material';

// const steps = ['Step 1', 'Step 2', 'Step 3']; // Define your steps here

// const MultiStepForm = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   return (
//     <div>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div>
//             <p>All steps completed</p>
//           </div>
//         ) : (
//           <div>
//             {/* Render the form content for the current step */}
//             {activeStep === 0 && <Step1Form />}
//             {activeStep === 1 && <Step2Form />}
//             {activeStep === 2 && <Step3Form />}

//             {/* Navigation buttons */}
//             <Button disabled={activeStep === 0} onClick={handleBack}>
//               Back
//             </Button>
//             <Button variant="contained" color="primary" onClick={handleNext}>
//               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;
