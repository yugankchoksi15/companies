import React, { useState } from "react";
import { Modal, TextInput, Button, Switch, Stepper,MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import data from "../data";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

function AddModal({ opened, setOpened, handleAddCompany,industries,sectors }) {
  console.log("industries:",industries);

  console.log("sectors:",sectors);
  
  const [inputWords, setInputWords] = useState({});
  const [activeStep, setActiveStep] = useState(0); // Track active step

  // Initialize Mantine's useForm hook to manage form state and validation
  const form = useForm({
    initialValues: data.reduce((acc, field) => {
      console.log("check field:", field);

      acc[field.apikey] = field.value !== null ? field.value : ""; // Set initial values correctly
      return acc;
    }, {}),
    validate: {
      reference: (value) => (value ? null : "Reference is required"),
      name: (value) => (value ? null : "Name is required"),
      imageUrl: (value) =>
        value && !/^https?:\/\//.test(value) ? "Invalid URL" : null,
      email: (value) =>
        value && !/^\S+@\S+$/.test(value) ? "Invalid email" : null,
      website: (value) => (value ? null : "Website is required"),
    },
  });

  const handleAddWord = (apikey) => {
    if (inputWords[apikey]) {
      form.setFieldValue(apikey, [
        ...(form.values[apikey] || []),
        inputWords[apikey],
      ]);
      setInputWords((prev) => ({ ...prev, [apikey]: "" })); // Clear input field
    }
  };

  const handleRemoveWord = (apikey, indexToRemove) => {
    form.setFieldValue(
      apikey,
      form.values[apikey].filter((_, index) => index !== indexToRemove)
    );
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };
  const dataMapping = {
    industries: industries.map(industry => ({
      value: industry.id,
      label: industry.name,
    })),
    sectors: sectors.map(sector => ({
      value: sector.id,
      label: sector.name,
    })),
  };
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add Company"
      size="100%"
      centered
      styles={{
        modal: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleAddCompany(values);
          setOpened(false); // Close the modal after submission
        })}
      >
        <Stepper active={activeStep} onStepClick={setActiveStep}>
          <Stepper.Step label="Basic Information">
            {data.slice(0, 2).map((field, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <TextInput
                  label={field.label}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  {...form.getInputProps(field.apikey)} // Use 'apikey' here
                />
              </div>
            ))}
          </Stepper.Step>

          <Stepper.Step label="Additional Information">
            {data.slice(2, 4).map((field, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <TextInput
                  label={field.label}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  {...form.getInputProps(field.apikey)} // Use 'apikey' here
                />
              </div>
            ))}
          </Stepper.Step>

          <Stepper.Step label="Head Office Details">
            {data.slice(4).map((field, index) => {
              if (field.type === "Switch") {
                return (
                  <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <Switch
                      label={field.label}
                      {...form.getInputProps(field.apikey, { type: "checkbox" })}
                    />
                  </div>
                );
              }

              const isArrayField = Array.isArray(form.values[field.apikey]);

              return (
                <div key={index} style={{ marginBottom: "16px" }}>
                  {isArrayField ? (
                    <>
                      <MultiSelect
                        label={field.label}
                        data={dataMapping[field.apikey] || []}
                        placeholder={`Select ${field.label.toLowerCase()}`}
                        {...form.getInputProps(field.apikey)}
                      />
                    </>
                  ) : (
                    <TextInput
                      label={field.label}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...form.getInputProps(field.apikey)}
                    />
                  )}
                </div>
              );
            })}
          </Stepper.Step>
          <Stepper.Completed>
            <div>
              Review your data before submitting.
              <Button type="submit" mt="md">
                Submit
              </Button>
            </div>
          </Stepper.Completed>
        </Stepper>

        <div style={{ marginTop: "20px" }}>
          <Button
            variant="default"
            onClick={handlePreviousStep}
            disabled={activeStep === 0}
            style={{ marginRight: "10px" }}
          >
            Back
          </Button>
          {activeStep < 3 && <Button onClick={handleNextStep}>Next</Button>}
        </div>
      </form>
    </Modal>
  );
}

export default AddModal;