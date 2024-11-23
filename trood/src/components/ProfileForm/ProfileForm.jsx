import { useFormik } from "formik";
import { useEffect, useState } from "react";
import DummyAvatar from "../../images/photo.svg";

import {
  AvatarButton,
  ButtonAdd,
  FormText,
  FormTextInput,
  PrivacyRadioGroup,
  ProfileFormLayout,
  RadioBox,
  RadioInput,
  RadioInputLabel,
} from "./ProfileFormStyled";

import { formFields } from "../../components/ProfileForm/ProfileFormValidation";
import { schema } from "../../components/ProfileForm/ProfileFormValidation";
import { getUserFromStorage, saveUserTostorage } from "../../api/mokrequest";

const ProfileForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  /* Check if user data is available in lockalstorage
  and pass it to form values
*/
  useEffect(() => {
    const storedUserData = getUserFromStorage();
    const defaults = {};
    Object.keys(formFields).forEach((key) => {
      defaults[key] = storedUserData?.[key] || "";
    });
    console.log("inside useEffect", storedUserData);
    if (storedUserData) {
      setInitialValues(storedUserData);
    } else {
      setInitialValues(defaults);
    }
  }, []);

  // Avatar file change handler
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        console.error("File is too large. Please select a file under 2MB.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        console.error("Only image files are allowed.");
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));
      event.target.value = "";
    } else {
      console.error("No file selected");
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: initialValues || {},
    validationSchema: schema,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      saveUserTostorage(values);
      console.log("Submitted:", values);
    },
  });

  // Wait till initialValues are loaded
  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileFormLayout>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "28px", flexDirection: "column" }}
      >
        {/* Avatar */}
        <input
          id='file-upload'
          type='file'
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
        <AvatarButton
          htmlFor='file-upload'
          style={{ alignSelf: "center" }}
        >
          <img
            src={avatarPreview ? avatarPreview : DummyAvatar}
            alt='User Avatar'
          />
        </AvatarButton>
        {/* Dynamic Input Fields */}
        {Object.entries(formFields).map(([key, value]) => (
          <label
            key={key}
            htmlFor={key}
          >
            <FormTextInput
              id={key}
              name={key}
              type={value.type}
              placeholder={value.label}
              onChange={formik.handleChange}
              value={formik.values[key] || ""}
            />
            {formik.errors[key] && formik.touched[key] && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors[key]}
              </div>
            )}
          </label>
        ))}
        {/* Radio Buttons */}
        <FormText>Show your profile in Launchpad?</FormText>
        <PrivacyRadioGroup
          role='group'
          aria-labelledby='privacy-group'
        >
          <RadioBox>
            <RadioInput
              type='radio'
              name='privacy'
              value='Private'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.privacy === "Private"}
            />
            <RadioInputLabel />
            <FormText $topstyles='font-size: 20px'>Private</FormText>
          </RadioBox>
          <RadioBox>
            <RadioInput
              type='radio'
              name='privacy'
              value='Public'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.privacy === "Public"}
            />
            <RadioInputLabel />
            <FormText $topstyles='font-size: 20px'>Public</FormText>
          </RadioBox>
        </PrivacyRadioGroup>
        {/* Additional  choices */}
        <FormText>
          The scopes of your interest:
          <ButtonAdd />
        </FormText>
        <FormText>
          Potential interests:
          <ButtonAdd />
        </FormText>
        <FormText>
          Your links:
          <ButtonAdd />
        </FormText>
        {/* Submit Button */}
        <button type='submit'>Submit</button>
      </form>
    </ProfileFormLayout>
  );
};

export default ProfileForm;
