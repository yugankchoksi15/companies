import React, { useEffect, useState } from "react";
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
import data from "../data";

function AddModal({
  opened,
  setOpened,
  handleAddCompany,
  industries,
  sectors,
  status,
}) {
  const [inputWords, setInputWords] = useState([]);
  const [addedValues, setAddedValues] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [languagesTags, setLanguagesTags] = useState([]);
  const [labalTags, setLabalTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [skillTags, setSkillTags] = useState([]);

  const form = useForm({
    initialValues: {
      name: "",
      reference: "",
      employees: null,
      description: "",
      client: false,
      domain: "",
      logoUrl: "",
      industries: [],
      sectors: [],
      imageUrl: "",
      // Add fields to manage tags for each TagsInput
      tags1: [],
      tags2: [], // Add more fields as needed
      languages: [],
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      reference: (value) =>
        value.length < 2 ? "Reference must have at least 2 letters" : null,
      employees: (value) =>
        value && value < 1 ? "Employees must be a positive number" : null,
      description: (value) =>
        value.length < 2 ? "Description must have at least 2 letters" : null,
    },
  });

  const handleNextStep = () => {
    if (activeStep < 4) {
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

  const handleLabelTagsChange = (newTags) => {
    setLabalTags(newTags);
  };

  const handleLabelTagClose = (tagToRemove) => {
    setLabalTags(labalTags.filter((label) => label !== tagToRemove));
  };

  const handleLanguagesTagsChange = (newTags) => {
    setLanguagesTags(newTags);
  };

  const handleLanguagesTagClose = (tagToRemove) => {
    setLanguagesTags(
      languagesTags.filter((languages) => languages !== tagToRemove)
    );
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleTagsClose = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  const handleSkillTagsChange = (newTags) => {
    setSkillTags(newTags);
  };

  const handleSkillTagClose = (tagToRemove) => {
    setSkillTags(skillTags.filter((label) => label !== tagToRemove));
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
                const fieldError = form.errors[field.apikey];
                // Check if the current field is at index 4, 5, or 6
                const isGroupedField =
                  index === 4 || index === 5 || index === 6;

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
                        {/* Render grouped fields in the same row if applicable */}
                        {isGroupedField ? (
                          <div
                            style={{ display: "flex", gap: "16px", flex: 1 }}
                          >
                            {index === 4 && (
                              <div
                                style={{
                                  flex: "0 0 20%",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Switch
                                  label={field.label}
                                  style={{ width: "100%" }} // Ensure it takes full width of its container
                                  {...form.getInputProps(field.apikey, {
                                    type: "checkbox",
                                  })}
                                />
                                {fieldError && (
                                  <div
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {fieldError}
                                  </div>
                                )}
                              </div>
                            )}

                            {index === 5 && (
                              <div style={{ flex: "1" }}>
                                <TextInput
                                  label={field.label}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                  {...form.getInputProps(field.apikey)}
                                />
                              </div>
                            )}

                            {index === 6 && (
                              <div style={{ flex: "1" }}>
                                <TextInput
                                  label={field.label}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                  {...form.getInputProps(field.apikey)}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          // Render the other fields if not grouped
                          <>
                            {isBooleanField ? (
                              <div
                                style={{
                                  flex: "0 0 20%",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Switch
                                  label={field.label}
                                  style={{ width: "100%" }} // Ensure it takes full width of its container
                                  {...form.getInputProps(field.apikey, {
                                    type: "checkbox",
                                  })}
                                />
                              </div>
                            ) : isMultiSelect ? (
                              <div style={{ flex: "1" }}>
                                <MultiSelect
                                  label={field.label}
                                  data={
                                    Array.isArray(dataMapping[field.apikey])
                                      ? dataMapping[field.apikey]
                                      : []
                                  } // Ensure it’s an array
                                  placeholder={`Select ${field.label.toLowerCase()}`}
                                  {...form.getInputProps(field.apikey)}
                                  style={{ flex: 1 }} // Ensure it takes up space in flex
                                />
                              </div>
                            ) : isSelectField ? (
                              <div style={{ flex: "1" }}>
                                <Select
                                  label={field.label}
                                  data={
                                    Array.isArray(dataMapping[field.apikey])
                                      ? dataMapping[field.apikey]
                                      : []
                                  } // Ensure it’s an array
                                  placeholder={`Select ${field.label.toLowerCase()}`}
                                  {...form.getInputProps(field.apikey)}
                                  style={{ flex: 1 }} // Ensure it takes up space in flex
                                />
                              </div>
                            ) : isAddKey ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flex: "0 0 50%",
                                }}
                              >
                                {/* <TagsInput
                                style={{ flex: 3 }}
                                label={field.label}
                                placeholder={`check Enter ${field.label.toLowerCase()}`}
                                value={tags}
                                onChange={handleTagsChange}
                                onRemove={handleTagClose}
                                splitChars={[",", " ", "|"]}
                                /> */}
                              </div>
                            ) : (
                              <div style={{ flex: "0 0 50%" }}>
                                {" "}
                                {/* Adjusted this div */}
                                <TextInput
                                  label={field.label}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                  {...form.getInputProps(field.apikey)}
                                />
                              </div>
                            )}
                          </>
                        )}

                        {/* Render the second input if it exists */}
                        {index + 1 < data.length && index + 1 < 36 && (
                          <div style={{ flex: 1 }}>
                            {data[index + 1].type === "Switch" ? (
                              <div style={{ flex: "0 0 20%" }}>
                                {" "}
                                {/* Set width to 20% */}
                                <Switch
                                  label={data[index + 1].label}
                                  {...form.getInputProps(
                                    data[index + 1].apikey,
                                    {
                                      type: "checkbox",
                                    }
                                  )}
                                />
                              </div>
                            ) : data[index + 1].type === "MultiSelect" ? (
                              <div style={{ flex: "1" }}>
                                <MultiSelect
                                  label={data[index + 1].label}
                                  data={
                                    Array.isArray(
                                      dataMapping[data[index + 1].apikey]
                                    )
                                      ? dataMapping[data[index + 1].apikey]
                                      : []
                                  } // Ensure it’s an array
                                  placeholder={`Select ${data[
                                    index + 1
                                  ].label.toLowerCase()}`}
                                  {...form.getInputProps(
                                    data[index + 1].apikey
                                  )}
                                  style={{ flex: 1 }} // Ensure it takes up space in flex
                                />
                              </div>
                            ) : data[index + 1].type === "Select" ? (
                              <div style={{ flex: "1" }}>
                                <Select
                                  label={data[index + 1].label}
                                  data={
                                    Array.isArray(
                                      dataMapping[data[index + 1].apikey]
                                    )
                                      ? dataMapping[data[index + 1].apikey]
                                      : []
                                  } // Ensure it’s an array
                                  placeholder={`Select ${data[
                                    index + 1
                                  ].label.toLowerCase()}`}
                                  {...form.getInputProps(
                                    data[index + 1].apikey
                                  )}
                                  style={{ flex: 1 }} // Ensure it takes up space in flex
                                />
                              </div>
                            ) : (
                              <div style={{ flex: "1" }}>
                                <TextInput
                                  label={data[index + 1].label}
                                  placeholder={`Enter ${data[
                                    index + 1
                                  ].label.toLowerCase()}`}
                                  {...form.getInputProps(
                                    data[index + 1].apikey
                                  )}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Return null for other active steps
            })}
          </Stepper.Step>

          <Stepper.Step label="Contact Information">
            {data.map((field, index) => {

              // Check for the right step and index range
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
                        ) : isAddKey ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flex: "0 0 50%",
                            }}
                          >
                            {/* <TagsInput
                                style={{ flex: 3 }}
                                label={field.label}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                value={tags}
                                onChange={handleTagsChange}
                                onRemove={handleTagClose}
                                splitChars={[",", " ", "|"]}
                                /> */}
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
                        {index + 1 < data.length && index + 1 < 17 && (
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
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Skip rendering for steps not in Contact Information
            })}
          </Stepper.Step>

          <Stepper.Step label="Job Information">
            {data.map((field, index) => {

              // Check if the active step is correct and the index is within the range
              if (activeStep === 2 && index >= 17 && index < 22) {
                const isBooleanField = field.type === "Switch";
                const isSelectField = field.type === "Select";
                const isMultiSelect = field.type === "MultiSelect";
                const isAddKey = field.addKey;

                return (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      {/* Render the appropriate input based on the field type */}
                      {isBooleanField ? (
                        <Switch
                          label={field.label}
                          checked={field.value} // Ensure switch reflects the boolean value
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
                      ) : isAddKey ? (
                        // Render TextInput with Add button if addKey is true
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flex: "1",
                          }}
                        >
                          {index === 17 ? (
                            <TagsInput
                              style={{ flex: 3 }}
                              label={field.label}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              value={labalTags}
                              onChange={handleLabelTagsChange}
                              onRemove={handleLabelTagClose}
                              splitChars={[",", " ", "|"]}
                            />
                          ) : null}
                          {index === 18 ? (
                            <TagsInput
                              style={{ flex: 3 }}
                              label={field.label}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              value={languagesTags}
                              onChange={handleLanguagesTagsChange}
                              onRemove={handleLanguagesTagClose}
                              splitChars={[",", " ", "|"]}
                            />
                          ) : null}
                          {index === 20 ? (
                            <TagsInput
                              style={{ flex: 3 }}
                              label={field.label}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              value={tags}
                              onChange={handleTagsChange}
                              onRemove={handleTagsClose}
                              splitChars={[",", " ", "|"]}
                            />
                          ) : null}
                        </div>
                      ) : (
                        <TextInput
                          label={field.label}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          {...form.getInputProps(field.apikey)}
                          style={{ flex: 1 }} // Set width to 50%
                        />
                      )}
                    </div>
                  </div>
                );
              }
              return null; // Skip rendering for steps not in the specified range
            })}
          </Stepper.Step>
          <Stepper.Step label="Head Office Information">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {data.slice(22, 37).map((field, index) => {
                  const isAddKey = field.addKey; // Move this declaration inside the map function

                  return (
                    <div
                      key={field.apikey}
                      style={{
                        flex: "1 1 30%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Render the appropriate input based on the field type */}
                      {field.type === "Switch" ? (
                        <Switch
                          label={field.label}
                          {...form.getInputProps(field.apikey, {
                            type: "checkbox",
                          })}
                        />
                      ) : field.type === "MultiSelect" ? (
                        <MultiSelect
                          label={field.label}
                          data={dataMapping[field.apikey] || []}
                          placeholder={`Select ${field.label.toLowerCase()}`}
                          {...form.getInputProps(field.apikey)}
                        />
                      ) : field.type === "Select" ? (
                        <Select
                          label={field.label}
                          data={dataMapping[field.apikey] || []}
                          placeholder={`Select ${field.label.toLowerCase()}`}
                          {...form.getInputProps(field.apikey)}
                        />
                      ) : field.apikey === "latitude" ||
                        field.apikey === "longitude" ||
                        field.apikey === "countryCode" ||
                        field.apikey === "cityOrRegionAndPostCode" ||
                        field.apikey === "postCode" ? (
                        <NumberInput
                          label={field.label}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          {...form.getInputProps(field.apikey)}
                          style={{ flex: "1" }}
                          step={0.01}
                        />
                      ) : isAddKey ? (
                        <TagsInput
                          style={{ flex: 3 }}
                          label={field.label}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          value={skillTags}
                          onChange={handleSkillTagsChange}
                          onRemove={handleSkillTagClose}
                          splitChars={[",", " ", "|"]}
                        />
                      ) : (
                        <TextInput
                          label={field.label}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          value={inputWords[field.apikey] || ""}
                          onChange={(e) => {
                            const newValue = e.target.value; 
                            setInputWords((prevInputWords) => ({
                              ...prevInputWords,
                              [field.apikey]: newValue, // Update the inputWords state
                            }));
                          }}
                          {...form.getInputProps(field.apikey)}
                          style={{ flex: "1" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Stepper.Step>

          <Stepper.Step label="Additional Information">
  {data.map((field, index) => {
    // Ensure we're in the correct step and range for the "Additional Information"
    if (activeStep === 4 && index >= 37 && index < 50) {
      // Ensure index is in range
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
          {index % 2 === 0 && (
            <div
              style={{
                display: "flex",
                flex: "1 1 100%",
                gap: "16px",
              }}
            >
              {/* First input rendering */}
              {index === 39 ? ( // Add rating input for index 39
                <div style={{ flex: "0 0 50%" }}>
                  <Rating
                    label="Rate your experience"
                    {...form.getInputProps("rating")} // Ensure you have this key in your form state
                  />
                </div>
              ) : isBooleanField ? (
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
                  style={{ flex: "0 0 50%" }}
                />
              ) : isSelectField ? (
                <Select
                  label={field.label}
                  data={dataMapping[field.apikey] || []}
                  placeholder={`Select ${field.label.toLowerCase()}`}
                  {...form.getInputProps(field.apikey)}
                  style={{ flex: "0 0 50%" }}
                />
              ) : field.apikey === "position" ? (
                <NumberInput
                  label={field.label}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  {...form.getInputProps(field.apikey)}
                  style={{ flex: "1" }}
                  step={0.01}
                />
              ) : isAddKey ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: "0 0 50%",
                  }}
                >
                  {/* Uncomment when ready */}
                  {/* <TagsInput
                      style={{ flex: 3 }}
                      label={field.label}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={tags}
                      onChange={handleTagsChange}
                      onRemove={handleTagClose}
                      splitChars={[",", " ", "|"]}
                    /> */}
                </div>
              ) : (
                <TextInput
                  style={{ flex: "0 0 50%" }}
                  label={field.label}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  {...form.getInputProps(field.apikey)}
                />
              )}

              {/* Second input rendering */}
              {index + 1 < data.length && index + 1 < 50 && (
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
                      placeholder={`Select ${data[index + 1].label.toLowerCase()}`}
                      {...form.getInputProps(data[index + 1].apikey)}
                    />
                  ) : data[index + 1].type === "Select" ? (
                    <Select
                      label={data[index + 1].label}
                      data={dataMapping[data[index + 1].apikey] || []}
                      placeholder={`Select ${data[index + 1].label.toLowerCase()}`}
                      {...form.getInputProps(data[index + 1].apikey)}
                    />
                  ) : (
                    <TextInput
                      label={data[index + 1].label}
                      placeholder={`Enter ${data[index + 1].label.toLowerCase()}`}
                      {...form.getInputProps(data[index + 1].apikey)}
                      style={{ flex: "1" }}
                    />
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

          {activeStep < 4 && <Button onClick={handleNextStep}>Next</Button>}

          {activeStep === 4 && (
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
