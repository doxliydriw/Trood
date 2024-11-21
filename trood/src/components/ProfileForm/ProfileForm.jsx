import { useState } from "react";
import {
  AvatarButton,
  FormTextInput,
  ProfileFormLayout,
} from "./ProfileFormStyled";
import DummyAvatar from "../../images/photo.svg";
import { formFields } from "../../components/ProfileForm/ProfileFormValidation";

const ProfileForm = () => {
  const initialValues = {};
  Object.keys(formFields).forEach((key) => {
    initialValues[key] = "";
  });
  // const [avatarBlob, setavatarBlob] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  // handleAvatarChange catches the file picked by user
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        console.error("File is too large. Please select a file under 2MB.");
        return;
      }
      // Check the file type (e.g., allow only images)
      if (!file.type.startsWith("image/")) {
        console.error("Only image files are allowed.");
        return;
      }
      // setavatarBlob(file);
      // Set preview URL for the selected image
      setAvatarPreview(URL.createObjectURL(file));
      // Reset the input value to allow reselecting the same file
      event.target.value = "";
    } else {
      console.error("No file selected");
    }
  };

  return (
    <ProfileFormLayout>
      <form style={{ display: "flex", gap: "28px", flexDirection: "column" }}>
        <input
          id='file-upload'
          type='file'
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
        <AvatarButton htmlFor='file-upload'>
          <img
            src={avatarPreview ? avatarPreview : DummyAvatar}
            alt='User Avatar'
          />
        </AvatarButton>
        {Object.entries(formFields).map(([key, value]) => (
          <label
            key={key}
            htmlFor={value.general}
          >
            <FormTextInput
              id={value.general}
              props={value}
              name={value.general}
              placeholder={value.label}
            />
          </label>
        ))}
      </form>
    </ProfileFormLayout>
  );
};

export default ProfileForm;
