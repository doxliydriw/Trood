import { useFormik } from "formik";
import { useEffect, useState } from "react";
import DummyAvatar from "../../images/photo.svg";
import DeleteTrashCan from "../../images/delete.svg";

import {
  AditionalChoiceBox,
  Avatar,
  AvatarButton,
  AvatarContainer,
  BasicButton,
  ButtonAdd,
  ChoiceBlock,
  FormText,
  FormTextInput,
  InterestBubble,
  ProfileFormBox,
  PrivacyRadioGroup,
  ProfileFormLayout,
  RadioBox,
  RadioInput,
  RadioInputLabel,
  LinkBox,
  LinkAddress,
  InterestInput,
} from "./ProfileFormStyled";

import { formFields } from "../../components/ProfileForm/ProfileFormValidation";
import { schema } from "../../components/ProfileForm/ProfileFormValidation";
import { getUserFromStorage, saveUserTostorage } from "../../api/mokrequest";

const ProfileForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  // Make /cancel/ /save/ buttons visible when form changes.
  const [editMode, setEditMode] = useState(false);
  /* Control openning of input to add a new interest to users list
  of interests */
  const [addInterestsVisible, setAddInterestsVisible] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [newInterestList, setNewInterestList] = useState([]);

  /* Check if user data is available in lockalstorage
  and pass it to form values
*/
  useEffect(() => {
    const storedUserData = getUserFromStorage();
    const defaults = {};
    Object.keys(formFields).forEach((key) => {
      defaults[key] = storedUserData?.[key] || "";
    });
    if (storedUserData) {
      setInitialValues(storedUserData);
      if (storedUserData.userInterests) {
        setNewInterestList(storedUserData.userInterests);
      }
      setAvatarPreview(storedUserData.avatar ? storedUserData.avatar : null);
    } else {
      setInitialValues({ ...defaults, avatar: null });
    }
  }, []);

  // Avatar file change handler
  const handleAvatarChange = async (event) => {
    setEditMode(true);
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        console.error("File is too large. Please select a file under 2MB.");
        return;
      }
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        console.error("Only .jpg, .jpeg, and .png files are allowed.");
        return;
      }
      try {
        const base64Avatar = await blobToBase64(file);
        formik.setFieldValue("avatar", base64Avatar);
        setAvatarPreview(URL.createObjectURL(file));
        event.target.value = "";
      } catch (error) {
        console.error("Error converting Blob to Base64:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  // Avatar blob convert to a Base64 string before saving to localStorage:
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  };

  // Formik setup
  const formik = useFormik({
    initialValues: initialValues || {},
    validationSchema: schema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      let updatedValues = values;
      if (newInterestList) {
        updatedValues = {
          ...values,
          userInterests: newInterestList,
        };
      }
      console.log("Formik Values on Submit:", updatedValues);
      saveUserTostorage(updatedValues);
      console.log("Submitted:", updatedValues);
      setEditMode(false);
    },
  });

  const handleChangeWithEditMode = (e) => {
    setEditMode(true);
    formik.handleChange(e);
  };

  //Handle interest add
  const handleInterestAdd = async () => {
    if (!addInterestsVisible) {
      setAddInterestsVisible(!addInterestsVisible);
      return;
    } else {
      if (newInterest.trim() === "") {
        setAddInterestsVisible(!addInterestsVisible);
        return;
      }
      try {
        console.log(newInterest);
        await schema.fields.userInterests.validate(newInterest);
        setNewInterestList((prevList) => {
          const updatedList = [...prevList, newInterest];
          console.log("Updated Interest List:", updatedList);
          return updatedList;
        });
        console.log(newInterestList);
        setNewInterest("");
        setAddInterestsVisible(!addInterestsVisible);
        setEditMode(true);
      } catch (err) {
        console.error("Validation Error:", err.message);
      }
    }
  };

  //Reset form data to the state when page was rendered.
  const cancelEdit = (initialValues) => {
    formik.setValues(initialValues);
    formik.setErrors({});
    formik.setTouched({});
    setAvatarPreview(initialValues.avatar);
    setEditMode(false);
  };

  // Wait till initialValues are loaded
  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileFormLayout>
      <ProfileFormBox
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "28px", flexDirection: "column" }}
      >
        {/* Avatar */}
        <AvatarContainer>
          <input
            id='file-upload'
            type='file'
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <AvatarButton htmlFor='file-upload'>
            {avatarPreview ? (
              <Avatar
                src={avatarPreview}
                alt='User Avatar'
              />
            ) : (
              <img
                src={DummyAvatar}
                alt='Default Avatar'
              />
            )}
          </AvatarButton>
        </AvatarContainer>
        {/* Dynamic Input Fields */}
        {Object.entries(formFields)
          .filter(
            ([key]) =>
              !["userInterests", "userPotentialInterests", "userLink"].includes(
                key
              )
          )
          .map(([key, value]) => (
            <label
              key={key}
              htmlFor={key}
            >
              <FormTextInput
                id={key}
                name={key}
                type={value.type}
                placeholder={value.label}
                onChange={handleChangeWithEditMode}
                onBlur={formik.handleBlur}
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
        <PrivacyRadioGroup
          role='group'
          aria-labelledby='privacy-group'
        >
          <FormText style={{ gridColumn: "1 / span 2", gridRow: "1" }}>
            Show your profile in Launchpad?
          </FormText>
          <RadioBox style={{ gridColumn: "1", gridRow: "2" }}>
            <RadioInput
              type='radio'
              name='privacy'
              value='Private'
              onChange={handleChangeWithEditMode}
              onBlur={formik.handleBlur}
              checked={formik.values.privacy === "Private"}
            />
            <RadioInputLabel />
            <FormText $topstyles='font-size: 20px'>Private</FormText>
          </RadioBox>
          <RadioBox style={{ gridColumn: "2", gridRow: "2" }}>
            <RadioInput
              type='radio'
              name='privacy'
              value='Public'
              onChange={handleChangeWithEditMode}
              onBlur={formik.handleBlur}
              checked={formik.values.privacy === "Public"}
            />
            <RadioInputLabel />
            <FormText $topstyles='font-size: 20px'>Public</FormText>
          </RadioBox>
          {formik.errors.privacy && formik.touched.privacy && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.privacy}
            </div>
          )}
        </PrivacyRadioGroup>
        {/* Additional  choices */}
        <AditionalChoiceBox>
          <FormText>The scopes of your interest:</FormText>
          {newInterestList &&
            newInterestList.map((interest, index) => (
              <InterestBubble
                type='button'
                key={index}
              >
                {interest}
              </InterestBubble>
            ))}
          {addInterestsVisible && (
            <InterestInput
              id='InterestInput'
              onChange={(e) => setNewInterest(e.target.value)}
            />
          )}
          <ButtonAdd
            type='button'
            onClick={handleInterestAdd}
          />
        </AditionalChoiceBox>
        <AditionalChoiceBox>
          <FormText>Potential interests:</FormText>
          {formik.values.userPotentialInterests &&
            formik.values.userPotentialInterests.map((interest, index) => (
              <InterestBubble
                type='button'
                key={index}
              >
                {interest}
              </InterestBubble>
            ))}
          <ButtonAdd
            type='button'
            $topstyles='anchor-name: --potential_interests'
          />
        </AditionalChoiceBox>
        <AditionalChoiceBox>
          <FormText>Your links:</FormText>
          <LinkBox>
            <FormText
              style={{
                borderBottom: "1px solid #000000",
                fontSize: "24px",
              }}
            >
              LinkedIn
            </FormText>
            <LinkAddress>https://www.linkedin.com/feed/</LinkAddress>
            <img src={DeleteTrashCan} />
          </LinkBox>
          <ButtonAdd type='button' />
        </AditionalChoiceBox>
        {/* Submit Button */}
        {editMode && (
          <ChoiceBlock>
            <BasicButton
              onClick={() => cancelEdit(initialValues)}
              type='button'
              $topstyles='background-color: lightgrey'
            >
              Cancel
            </BasicButton>
            <BasicButton
              type='submit'
              onClick={formik.handleSubmit}
            >
              Submit
            </BasicButton>
          </ChoiceBlock>
        )}
      </ProfileFormBox>
    </ProfileFormLayout>
  );
};

export default ProfileForm;
