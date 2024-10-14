import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Switch,
  Stepper,
  MultiSelect,
  NumberInput,
  TagsInput,
  Rating,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import data from "../data"; // Import the data configuration

function AddModal({
  opened,
  setOpened,
  handleAddCompany,
  industries,
  sectors,
  status,
}) {
  const [activeStep, setActiveStep] = useState(0);

  // Initialize form with dynamic initial values based on data structure
  const form = useForm({
    initialValues: data.reduce((acc, field) => {
      acc[field.apikey] = field.value; // Initialize based on field values
      return acc;
    }, {}),
    validate: (values) => {
      const errors = {};
      // Loop through data to validate required fields
      data.forEach((field) => {
        if (field.required && !values[field.apikey]) {
          errors[field.apikey] = `${field.label} is required`;
        }
      });
      return errors; // Return errors object
    },
  });

  const dataMapping = {
    industries: industries.map((industry) => ({
      value: industry.id,
      label: industry.name,
    })),
    sectors: sectors.map((sector) => ({
      value: sector.id,
      label: sector.name,
    })),
    status: status.map((s) => ({ value: s.id, label: s.name })),
  };
  const handleNextStep = () => {
    // Only validate fields in the first step
    if (activeStep === 0) {
      const requiredFields = ["name", "reference", "employees", "description"];

      const invalidFields = requiredFields.filter((field) => {
        const value = form.values[field];
        return !value; // Check if the field is empty
      });

      // If any required field is invalid, stop moving to the next step
      if (invalidFields.length > 0) {
        alert(
          "Please fill in all required fields: Name, Reference, Employees, and Description."
        ); // Show an alert to inform the user
        return; // Stop if there are invalid fields
      }
    } else if (activeStep === 1) {
      const requiredFields = ["phone", "email", "website"];
      const invalidFields = requiredFields.filter((field) => {
        const value = form.values[field];
        return !value; // Check if the field is empty
      });

      // If any required field is invalid, stop moving to the next step
      if (invalidFields.length > 0) {
        alert("Please fill in all required fields: phone, Email, Website."); // Show an alert to inform the user
        return; // Stop if there are invalid fields
      }
    } else if (activeStep === 2) {
      const requiredFields = ["languages", "skills"];
      const invalidFields = requiredFields.filter((field) => {
        const value = form.values[field];
        return !value || (Array.isArray(value) && value.length === 0); // Check if it's empty or an empty array
      });
  
      // If any required field is invalid, stop moving to the next step
      if (invalidFields.length > 0) {
        alert("Please fill in all required fields: Languages, Skills."); // Show an alert to inform the user
        return; // Stop if there are invalid fields
      }
    } else if (activeStep === 3) {
      const requiredFields = ["headOfficeName", "addressLine", "cityName"];
      const invalidFields = requiredFields.filter((field) => {
        const value = form.values[field];
        return !value; // Check if the field is empty
      });

      // If any required field is invalid, stop moving to the next step
      if (invalidFields.length > 0) {
        alert(
          "Please fill in all required fields: Head Office Name, Address Line, City Name."
        ); // Show an alert to inform the user
        return; // Stop if there are invalid fields
      }
    }
    // Move to the next step
    setActiveStep((prev) => prev + 1);
  };

  const handleStepClick = (step) => {
    if (step > activeStep) {
      // Step forward, so validation is required
      let invalidFields = [];
      
      if (activeStep === 0) {
        const requiredFields = ["name", "reference", "employees", "description"];
        invalidFields = requiredFields.filter((field) => !form.values[field]);
  
        if (invalidFields.length > 0) {
          alert("Please fill in all required fields: Name, Reference, Employees, and Description.");
          return; // Stop if there are invalid fields
        }
      } else if (activeStep === 1) {
        const requiredFields = ["phone", "email", "website"];
        invalidFields = requiredFields.filter((field) => !form.values[field]);
  
        if (invalidFields.length > 0) {
          alert("Please fill in all required fields: Phone, Email, and Website.");
          return;
        }
      } else if (activeStep === 2) {
        const requiredFields = ["languages", "skills"];
        invalidFields = requiredFields.filter(
          (field) => !form.values[field] || (Array.isArray(form.values[field]) && form.values[field].length === 0)
        );
  
        if (invalidFields.length > 0) {
          alert("Please fill in all required fields: Languages and Skills.");
          return;
        }
      } else if (activeStep === 3) {
        const requiredFields = ["headOfficeName", "addressLine", "cityName"];
        invalidFields = requiredFields.filter((field) => !form.values[field]);
  
        if (invalidFields.length > 0) {
          alert("Please fill in all required fields: Head Office Name, Address Line, and City Name.");
          return;
        }
      }
  
      // Validation passed, move to the next step
      setActiveStep(step);
    } else {
      // Step backward, allow without validation
      setActiveStep(step);
    }
  };
  
  const handlePreviousStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const renderField = (field) => {
    const { label, type, apikey } = field;
    const fieldProps = form.getInputProps(apikey); // Ensure input props correspond to unique apikey

    switch (type) {
      case "Switch":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <label style={{ marginRight: "15px" }}>{label}:</label>
            <Switch {...fieldProps} />
          </div>
        );
      case "MultiSelect":
        return (
          <MultiSelect
            label={label}
            data={dataMapping[apikey] || []} // Ensure data is not null
            placeholder={`Select ${label.toLowerCase()}`}
            {...fieldProps}
          />
        );
      case "Select":
        return (
          <Select
            label={label}
            data={dataMapping[apikey] || []} // Ensure data is not null
            placeholder={`Select ${label.toLowerCase()}`}
            {...fieldProps}
          />
        );
      case "NumberInput":
        return (
          <NumberInput
            label={label}
            placeholder={`Enter ${label.toLowerCase()}`}
            {...fieldProps}
          />
        );
      case "TagsInput":
        return (
          <TagsInput
            label={label}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={form.values[apikey] || []} // Ensure value is an array
            onChange={(newTags) => form.setFieldValue(apikey, newTags)}
            onRemove={(tag) => {
              const updatedTags = form.values[apikey].filter((t) => t !== tag);
              form.setFieldValue(apikey, updatedTags);
            }}
          />
        );
      case "Rating":
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>{label}:</label>
            <Rating
              value={form.values.rating}
              onChange={(value) => form.setFieldValue("rating", value)}
              fractions={2}
            />
          </div>
        );
      default:
        return (
          <TextInput
            label={label}
            placeholder={`Enter ${label.toLowerCase()}`}
            {...fieldProps} // Correctly manages values for each field
          />
        );
    }
  };

  const renderStepContent = (startIndex, endIndex) => {
    const stepFields = data.slice(startIndex, endIndex);

    // Check if stepFields has valid data
    if (!stepFields.length) {
      console.warn("No fields available for the current step");
      return null;
    }

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          overflowY: "auto",
          maxHeight: "calc(80vh - 150px)",
        }}
      >
        {stepFields.map((field, index) => (
          <div key={index} style={{ flex: "1 1 calc(50% - 16px)" }}>
            {renderField(field)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add Company"
      size="100%" // Set modal size to 80%
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => {

          handleAddCompany(values,form,setActiveStep);
          setOpened(false);
        })}
      >
        <Stepper active={activeStep} onStepClick={handleStepClick}>
          <Stepper.Step label="Basic Information">
            {activeStep === 0 && renderStepContent(0, 10)}
          </Stepper.Step>
          <Stepper.Step label="Contact Information">
            {activeStep === 1 && renderStepContent(10, 17)}
          </Stepper.Step>
          <Stepper.Step label="Job Information">
            {activeStep === 2 && renderStepContent(17, 23)}
          </Stepper.Step>
          <Stepper.Step label="Head Office Information">
            {activeStep === 3 && renderStepContent(23, 37)}
          </Stepper.Step>
          <Stepper.Step label="Additional Information">
            {activeStep === 4 && renderStepContent(37, 50)}
          </Stepper.Step>
        </Stepper>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handlePreviousStep}
            disabled={activeStep === 0}
            variant="default"
          >
            Previous
          </Button>
          {activeStep < 4 && <Button onClick={handleNextStep}>Next</Button>}
  
          {activeStep === 4 && (
            <Button type="submit" color="teal" disabled={!form.values.ownerName || !form.values.status}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default AddModal;
