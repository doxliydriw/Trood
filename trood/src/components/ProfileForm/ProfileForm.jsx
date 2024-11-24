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
  /* Control openning of input to add a new Potential interest to users list
  of interests */
  const [addPotentialInterestsVisible, setaddPotentialInterestsVisible] =
    useState(false);
  const [newPotentialInterest, setNewPotentialInterest] = useState("");
  const [newPotentialInterestList, setNewPotentialInterestList] = useState([]);
  /* Control openning of input to add a new Profile Link to users list
   */
  const [addLinkVisible, setAddLinkVisible] = useState(false);
  const [newLink, setNewLink] = useState({});
  const [newLinkList, setNewLinkList] = useState([]);

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
      if (storedUserData.userPotentialInterests) {
        setNewPotentialInterestList(storedUserData.userPotentialInterests);
      }
      if (storedUserData.userLink) {
        setNewLinkList(storedUserData.userLink);
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
      const updatedValues = {
        ...values,
        userInterests: newInterestList,
        userPotentialInterests: newPotentialInterestList,
        userLink: newLinkList,
      };
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
      setaddPotentialInterestsVisible(false);
      setAddLinkVisible(false);
      return;
    } else {
      if (newInterest.trim() === "") {
        setAddInterestsVisible(!addInterestsVisible);
        return;
      }
      try {
        const updatedList = [...newInterestList, newInterest];
        await schema.fields.userInterests.validate(updatedList);
        setNewInterestList((prevList) => {
          const updatedList = [...prevList, newInterest];
          console.log("Updated Interest List:", updatedList);
          return updatedList;
        });

        setNewInterest("");
        setAddInterestsVisible(!addInterestsVisible);
        setEditMode(true);
      } catch (err) {
        console.error("Validation Error:", err.message);
      }
    }
  };

  //Handle Potential interest add
  const handlePotentialInterestAdd = async () => {
    if (!addPotentialInterestsVisible) {
      setaddPotentialInterestsVisible(!addPotentialInterestsVisible);
      setAddInterestsVisible(false);
      setAddLinkVisible(false);
      return;
    } else {
      if (newPotentialInterest.trim() === "") {
        setaddPotentialInterestsVisible(!addPotentialInterestsVisible);
        return;
      }
      try {
        const updatedList = [...newPotentialInterestList, newPotentialInterest];
        await schema.fields.userPotentialInterests.validate(updatedList);
        setNewPotentialInterestList((prevList) => {
          const updatedList = [...prevList, newPotentialInterest];
          console.log("Updated Potential Interest List:", updatedList);
          return updatedList;
        });

        setNewPotentialInterest("");
        setaddPotentialInterestsVisible(!addPotentialInterestsVisible);
        setEditMode(true);
      } catch (err) {
        console.error("Validation Error:", err.message);
      }
    }
  };

  // Handle Profile Link add
  const handleAddLink = async () => {
    if (!addLinkVisible) {
      setAddLinkVisible(!addLinkVisible);
      setAddInterestsVisible(false);
      setaddPotentialInterestsVisible(false);
      return;
    } else {
      if (newLink.address === "") {
        setAddLinkVisible(!addLinkVisible);
        return;
      }
      try {
        console.log(newLink);
        const updatedList = [...newLinkList, newLink];
        await schema.fields.userLink.validate(updatedList);
        setNewLinkList((prevList) => {
          const updatedList = [...prevList, newLink];
          console.log("Updated Link List:", updatedList);
          return updatedList;
        });
        setNewLink({});
        setAddLinkVisible(!addLinkVisible);
        setEditMode(true);
      } catch (err) {
        console.error("Validation Error:", err.message);
      }
    }
  };

  useEffect(() => {
    console.log("Formik values updated:", formik.values);
  }, [formik.values]);

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
          {newPotentialInterestList &&
            newPotentialInterestList.map((interest, index) => (
              <InterestBubble
                type='button'
                key={index}
              >
                {interest}
              </InterestBubble>
            ))}
          {addPotentialInterestsVisible && (
            <InterestInput
              id='PotentialInterestInput'
              onChange={(e) => setNewPotentialInterest(e.target.value)}
            />
          )}
          <ButtonAdd
            type='button'
            onClick={handlePotentialInterestAdd}
          />
        </AditionalChoiceBox>
        <AditionalChoiceBox>
          <FormText>Your links:</FormText>
          {newLinkList &&
            newLinkList.map((link, index) => (
              <LinkBox key={index}>
                <FormText
                  key={index}
                  style={{
                    borderBottom: "1px solid #000000",
                    fontSize: "24px",
                  }}
                >
                  {link.name}
                </FormText>
                <LinkAddress>{link.address}</LinkAddress>
                <img src={DeleteTrashCan} />
              </LinkBox>
            ))}
          {addLinkVisible && (
            <LinkBox>
              <InterestInput
                id='linkName'
                style={{ width: "100%" }}
                onChange={(e) =>
                  setNewLink((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <InterestInput
                id='linkAddress'
                style={{ width: "100%" }}
                onChange={(e) =>
                  setNewLink((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </LinkBox>
          )}
          <ButtonAdd
            type='button'
            onClick={handleAddLink}
          />
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
            <BasicButton type='submit'>Submit</BasicButton>
          </ChoiceBlock>
        )}
      </ProfileFormBox>
    </ProfileFormLayout>
  );
};

export default ProfileForm;
