import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Switch,
  Stepper,
  MultiSelect,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import data from "../data";

function AddModal({
  opened,
  setOpened,
  handleAddCompany,
  industries,
  sectors,
  status,
}) {
  const [inputWords, setInputWords] = useState({});
  const [activeStep, setActiveStep] = useState(0); // Track active step

  // Initialize Mantine's useForm hook to manage form state and validation
  const form = useForm({
    initialValues: data.reduce((acc, field) => {
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

  const handleNextStep = () => {
    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const dataMapping = {
    industries: industries.map((industry) => ({
      value: industry.id,
      label: industry.name,
    })),
    sectors: sectors.map((sector) => ({
      value: sector.id,
      label: sector.name,
    })),
    status: status.map((status) => ({
      value: status.id,
      label: status.name,
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
          {/* Step 1: Basic Information */}
          <Stepper.Step label="Basic Information">
            {data.map((field, index) => {

              if (activeStep === 0 && index < 10) {
                const isBooleanField = field.type === "Switch";
                const isSelectField = field.type === "Select";
                const isMultiSelect = field.type === "MultiSelect";
                const isAddKey = field.addKey; 
                
                return (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    {/* Create a flex container for two inputs */}
                    {index % 2 === 0 && (
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        {/* Render the first input based on type */}
                        {isBooleanField ? (
                          <Switch
                            label={field.label}
                            style={{ flex: 1 }}
                            {...form.getInputProps(field.apikey, {
                              type: "checkbox",
                            })}
                          />
                        ) : isMultiSelect ? (
                          <MultiSelect
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: 1 }} // Ensure it takes up space in flex
                          />
                        ) : isSelectField ? (
                          <Select
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: 1 }} // Ensure it takes up space in flex
                          />
                        ) : isAddKey ? ( // Check for addKey to show TextInput with Add button
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flex: "0 0 50%",
                            }}
                          >
                            <TextInput
                              style={{ flex: 3 }} // TextInput takes up 3/4 of the space
                              label={field.label}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              value={inputWords[field.apikey] || ""}
                              onChange={(event) =>
                                setInputWords({
                                  ...inputWords,
                                  [field.apikey]: event.currentTarget.value,
                                })
                              }
                            />
                            <Button
                              style={{ flex: "0 0 8%", marginLeft: "8px",marginTop:"22px" }} // Button takes up 1/4 of the space
                              onClick={() => handleAddWord(field.apikey)}
                            >
                              Add
                            </Button>
                          </div>
                        ) : (
                          <TextInput
                            style={{ flex: "0 0 50%" }} // Set width to 50%
                            label={field.label}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                          />
                        )}


                        {/* Render the second input if it exists */}
                        {index + 1 < data.length && index + 1 < 36 && (
                          <div style={{ flex: 1 }}>
                            {data[index + 1].type === "Switch" ? (
                              <Switch
                                label={data[index + 1].label}
                                {...form.getInputProps(data[index + 1].apikey, {
                                  type: "checkbox",
                                })}
                              />
                            ) : data[index + 1].type === "MultiSelect" ? (
                              <MultiSelect
                                label={data[index + 1].label}
                                data={dataMapping[data[index + 1].apikey] || []}
                                placeholder={`Select ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(data[index + 1].apikey)}
                              />
                            ) : data[index + 1].type === "Select" ? (
                              <Select
                                label={data[index + 1].label}
                                data={dataMapping[data[index + 1].apikey] || []}
                                placeholder={`Select ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(data[index + 1].apikey)}
                              />
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flex: 1,
                                }}
                              >
                                <TextInput
                                  label={data[index + 1].label}
                                  placeholder={`Enter ${data[
                                    index + 1
                                  ].label.toLowerCase()}`}
                                  {...form.getInputProps(
                                    data[index + 1].apikey
                                  )}
                                  style={{ flex: 1 }} // Set width to 50%
                                />
                                {data[index + 1].addKey && (
                                  <Button
                                    onClick={() => {
                                      // Handle add action for the second input here
                                    }}
                                    style={{ marginLeft: "8px",marginTop:"22px" }} // Space between input and button
                                  >
                                    Add
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Skip rendering for steps not in Basic Information
            })}
          </Stepper.Step>

          <Stepper.Step label="Contact Information">
            {data.map((field, index) => {

              if (activeStep === 1 && index >= 10 && index < 17) {
                const isBooleanField = field.type === "Switch";
                const isSelectField = field.type === "Select";
                const isMultiSelect = field.type === "MultiSelect";
                const isAddKey = field.addKey; 
                
                return (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    {/* Create a flex container for two inputs */}
                    {index % 2 === 0 && (
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        {/* Render the first input based on type */}
                        {isBooleanField ? (
                          <Switch
                            label={field.label}
                            style={{ flex: 1 }}
                            {...form.getInputProps(field.apikey, {
                              type: "checkbox",
                            })}
                          />
                        ) : isMultiSelect ? (
                          <MultiSelect
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: 1 }} // Ensure it takes up space in flex
                          />
                        ) : isSelectField ? (
                          <Select
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: 1 }} // Ensure it takes up space in flex
                          />
                        ) : isAddKey ? ( // Check for addKey to show TextInput with Add button
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flex: "0 0 50%",
                            }}
                          >
                            <TextInput
                              style={{ flex: 3 }} // TextInput takes up 3/4 of the space
                              label={field.label}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              value={inputWords[field.apikey] || ""}
                              onChange={(event) =>
                                setInputWords({
                                  ...inputWords,
                                  [field.apikey]: event.currentTarget.value,
                                })
                              }
                            />
                            <Button
                              style={{ flex: "0 0 8%", marginLeft: "8px",marginTop:"22px" }} // Button takes up 1/4 of the space
                              onClick={() => handleAddWord(field.apikey)}
                            >
                              Add
                            </Button>
                          </div>
                        ) : (
                          <TextInput
                            style={{ flex: "0 0 50%" }} // Set width to 50%
                            label={field.label}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                          />
                        )}


                        {/* Render the second input if it exists */}
                        {index + 1 < data.length && index + 1 < 36 && (
                          <div style={{ flex: 1 }}>
                            {data[index + 1].type === "Switch" ? (
                              <Switch
                                label={data[index + 1].label}
                                {...form.getInputProps(data[index + 1].apikey, {
                                  type: "checkbox",
                                })}
                              />
                            ) : data[index + 1].type === "MultiSelect" ? (
                              <MultiSelect
                                label={data[index + 1].label}
                                data={dataMapping[data[index + 1].apikey] || []}
                                placeholder={`Select ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(data[index + 1].apikey)}
                              />
                            ) : data[index + 1].type === "Select" ? (
                              <Select
                                label={data[index + 1].label}
                                data={dataMapping[data[index + 1].apikey] || []}
                                placeholder={`Select ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(data[index + 1].apikey)}
                              />
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flex: 1,
                                }}
                              >
                                <TextInput
                                  label={data[index + 1].label}
                                  placeholder={`Enter ${data[
                                    index + 1
                                  ].label.toLowerCase()}`}
                                  {...form.getInputProps(
                                    data[index + 1].apikey
                                  )}
                                  style={{ flex: 1 }} // Set width to 50%
                                />
                                {data[index + 1].addKey && (
                                  <Button
                                    onClick={() => {
                                      // Handle add action for the second input here
                                    }}
                                    style={{ marginLeft: "8px",marginTop:"22px" }} // Space between input and button
                                  >
                                    Add
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Skip rendering for steps not in Basic Information
            })}
          </Stepper.Step>

          <Stepper.Step label="Job Information">
            {data.map((field, index) => {

              if (activeStep === 2 && index >= 17 && index < 22) {
                const isBooleanField = field.type === "Switch";
                const isSelectField = field.type === "Select";
                const isMultiSelect = field.type === "MultiSelect";
                const isAddKey = field.addKey; 
                
                return (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    {/* Create a flex container for two inputs */}
                    {index % 2 === 0 && (
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        {/* Render the first input based on type */}
                        {isBooleanField ? (
                          <Switch
                            label={field.label}
                            style={{ flex: 1 }}
                            {...form.getInputProps(field.apikey, {
                              type: "checkbox",
                            })}
                          />
                        ) : isMultiSelect ? (
                          <MultiSelect
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: 1 }} // Ensure it takes up space in flex
                          />
                        ) : isSelectField ? (
                          <Select
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: 1 }} // Ensure it takes up space in flex
                          />
                        ) : isAddKey ? ( // Check for addKey to show TextInput with Add button
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flex: "0 0 50%",
                            }}
                          >
                            <TextInput
                              style={{ flex: 3 }} // TextInput takes up 3/4 of the space
                              label={field.label}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              value={inputWords[field.apikey] || ""}
                              onChange={(event) =>
                                setInputWords({
                                  ...inputWords,
                                  [field.apikey]: event.currentTarget.value,
                                })
                              }
                            />
                            <Button
                              style={{ flex: "0 0 8%", marginLeft: "8px",marginTop:"22px" }} // Button takes up 1/4 of the space
                              onClick={() => handleAddWord(field.apikey)}
                            >
                              Add
                            </Button>
                          </div>
                        ) : (
                          <TextInput
                            style={{ flex: "0 0 50%" }} // Set width to 50%
                            label={field.label}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                          />
                        )}


                        {/* Render the second input if it exists */}
                        {index + 1 < data.length && index + 1 < 36 && (
                          <div style={{ flex: 1 }}>
                            {data[index + 1].type === "Switch" ? (
                              <Switch
                                label={data[index + 1].label}
                                {...form.getInputProps(data[index + 1].apikey, {
                                  type: "checkbox",
                                })}
                              />
                            ) : data[index + 1].type === "MultiSelect" ? (
                              <MultiSelect
                                label={data[index + 1].label}
                                data={dataMapping[data[index + 1].apikey] || []}
                                placeholder={`Select ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(data[index + 1].apikey)}
                              />
                            ) : data[index + 1].type === "Select" ? (
                              <Select
                                label={data[index + 1].label}
                                data={dataMapping[data[index + 1].apikey] || []}
                                placeholder={`Select ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(data[index + 1].apikey)}
                              />
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flex: 1,
                                }}
                              >
                                <TextInput
                                  label={data[index + 1].label}
                                  placeholder={`Enter ${data[
                                    index + 1
                                  ].label.toLowerCase()}`}
                                  {...form.getInputProps(
                                    data[index + 1].apikey
                                  )}
                                  style={{ flex: 1 }} // Set width to 50%
                                />
                                {data[index + 1].addKey && (
                                  <Button
                                    onClick={() => {
                                      // Handle add action for the second input here
                                    }}
                                    style={{ marginLeft: "8px",marginTop:"22px" }} // Space between input and button
                                  >
                                    Add
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Skip rendering for steps not in Basic Information
            })}
          </Stepper.Step>

          {/* Step 2: Head Office Information */}
          <Stepper.Step label="Head Office Information">
            {data.map((field, index) => {
              if (activeStep === 3 && index >= 22 && index < 37) {
                const isBooleanField = field.type === "Switch";
                const isSelectField = field.type === "Select";
                const isMultiSelect = field.type === "MultiSelect";
                const isAddKey = field.addKey; 

                return (
                  <div
                    key={index}
                    style={{
                      marginBottom: "16px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    {/* Create a flex container for two inputs */}
                    {index % 2 === 0 && (
                      <div
                        style={{
                          display: "flex",
                          flex: "1 1 100%",
                          gap: "16px",
                        }}
                      >
                        {/* Render the first input based on type */}
                        {isBooleanField ? (
                          <Switch
                            label={field.label}
                            style={{ flex: "0 0 50%" }} // 50% width for Switch
                            {...form.getInputProps(field.apikey, {
                              type: "checkbox",
                            })}
                          />
                        ) : isMultiSelect ? (
                          <MultiSelect
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: "0 0 50%" }} // 50% width for MultiSelect
                          />
                        ) : isSelectField ? (
                          <Select
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: "0 0 50%" }} // 50% width for Select
                          />
                        ) : isAddKey ? ( // Check for addKey to show TextInput with Add button
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flex: "0 0 50%",
                            }}
                          >
                            <TextInput
                              style={{ flex: 3 }} // TextInput takes up 3/4 of the space
                              label={field.label}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              value={inputWords[field.apikey] || ""}
                              onChange={(event) =>
                                setInputWords({
                                  ...inputWords,
                                  [field.apikey]: event.currentTarget.value,
                                })
                              }
                            />
                            <Button
                              style={{ flex: 1, marginLeft: "8px",marginTop:"22px" }} // Button takes up 1/4 of the space
                              onClick={() => handleAddWord(field.apikey)}
                            >
                              Add
                            </Button>
                          </div>
                        ) : (
                          <TextInput
                            style={{ flex: "0 0 50%" }} // Set width to 50%
                            label={field.label}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                          />
                        )}

                        {/* Render the second input if it exists */}
                        {index + 1 < data.length && index + 1 < 56 && (
                          <div style={{ flex: "0 0 50%" }}>
                            {data[index + 1].type === "Switch" ? (
                              <Switch
                                label={data[index + 1].label}
                                {...form.getInputProps(data[index + 1].apikey, {
                                  type: "checkbox",
                                })}
                              />
                            ) : data[index + 1].type === "MultiSelect" ? (
                              <MultiSelect
                                label={data[index + 1].label}
                                data={dataMapping[data[index + 1].apikey] || []}
                                placeholder={`Select ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(data[index + 1].apikey)}
                              />
                            ) : data[index + 1].type === "Select" ? (
                              <Select
                              label={data[index + 1].label}
                              data={dataMapping[data[index + 1].apikey] || []}
                              placeholder={`Select ${data[
                                index + 1
                              ].label.toLowerCase()}`}
                              {...form.getInputProps(data[index + 1].apikey)}
                            />
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                              }}
                            >
                              <TextInput
                                label={data[index + 1].label}
                                placeholder={`Enter ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(
                                  data[index + 1].apikey
                                )}
                                style={{ flex: 1 }} // Set width to 50%
                              />
                              {data[index + 1].addKey && (
                                <Button
                                  onClick={() => {
                                    // Handle add action for the second input here
                                  }}
                                  style={{ marginLeft: "8px",marginTop:"22px" }} // Space between input and button
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Skip rendering for steps not in Head Office Information
            })}
          </Stepper.Step>

          <Stepper.Step label="Additional Information">
            {data.map((field, index) => {
              if (activeStep === 4 && index >= 37 && index < 50) {
                const isBooleanField = field.type === "Switch";
                const isSelectField = field.type === "Select";
                const isMultiSelect = field.type === "MultiSelect";
                const isTextInputArray =
                  field.type === "TextInput" && Array.isArray(field.value);
                const isAddKey = field.addKey; // Use field.addKey instead of field.type === true

                return (
                  <div
                    key={index}
                    style={{
                      marginBottom: "16px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    {/* Create a flex container for two inputs */}
                    {index % 2 === 0 && (
                      <div
                        style={{
                          display: "flex",
                          flex: "1 1 100%",
                          gap: "16px",
                        }}
                      >
                        {/* Render the first input based on type */}
                        {isBooleanField ? (
                          <Switch
                            label={field.label}
                            style={{ flex: "0 0 50%" }} // 50% width for Switch
                            {...form.getInputProps(field.apikey, {
                              type: "checkbox",
                            })}
                          />
                        ) : isMultiSelect ? (
                          <MultiSelect
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: "0 0 50%" }} // 50% width for MultiSelect
                          />
                        ) : isSelectField ? (
                          <Select
                            label={field.label}
                            data={dataMapping[field.apikey] || []}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                            style={{ flex: "0 0 50%" }} // 50% width for Select
                          />
                        ) : isAddKey ? ( // Check for addKey to show TextInput with Add button
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flex: "0 0 50%",
                            }}
                          >
                            <TextInput
                              style={{ flex: 3 }} // TextInput takes up 3/4 of the space
                              label={field.label}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              value={inputWords[field.apikey] || ""}
                              onChange={(event) =>
                                setInputWords({
                                  ...inputWords,
                                  [field.apikey]: event.currentTarget.value,
                                })
                              }
                            />
                            <Button
                              style={{ flex: 1, marginLeft: "8px",marginTop:"22px" }} // Button takes up 1/4 of the space
                              onClick={() => handleAddWord(field.apikey)}
                            >
                              Add
                            </Button>
                          </div>
                        ) : (
                          <TextInput
                            style={{ flex: "0 0 50%" }} // Set width to 50%
                            label={field.label}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            {...form.getInputProps(field.apikey)}
                          />
                        )}
                        {/* Render the second input if it exists */}
                        {index + 1 < data.length && index + 1 < 36 && (
                          <div style={{ flex: "0 0 50%" }}>
                            {data[index + 1].type === "Switch" ? (
                              <Switch
                                label={data[index + 1].label}
                                {...form.getInputProps(data[index + 1].apikey, {
                                  type: "checkbox",
                                })}
                              />
                            ) : data[index + 1].type === "MultiSelect" ? (
                              <MultiSelect
                                label={data[index + 1].label}
                                data={dataMapping[data[index + 1].apikey] || []}
                                placeholder={`Select ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(data[index + 1].apikey)}
                              />
                            ) : data[index + 1].type === "Select" ? (
                              <Select
                              label={data[index + 1].label}
                              data={dataMapping[data[index + 1].apikey] || []}
                              placeholder={`Select ${data[
                                index + 1
                              ].label.toLowerCase()}`}
                              {...form.getInputProps(data[index + 1].apikey)}
                            />
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                              }}
                            >
                              <TextInput
                                label={data[index + 1].label}
                                placeholder={`Enter ${data[
                                  index + 1
                                ].label.toLowerCase()}`}
                                {...form.getInputProps(
                                  data[index + 1].apikey
                                )}
                                style={{ flex: 1 }} // Set width to 50%
                              />
                              {data[index + 1].addKey && (
                                <Button
                                  onClick={() => {
                                    // Handle add action for the second input here
                                  }}
                                  style={{ marginLeft: "8px" }} // Space between input and button
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Skip rendering for steps not in Additional Information
            })}
          </Stepper.Step>
        </Stepper>

        {/* Step navigation buttons */}
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

          {activeStep < 2 && <Button onClick={handleNextStep}>Next</Button>}

          {activeStep === 2 && (
            <Button type="submit" color="teal">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default AddModal;
