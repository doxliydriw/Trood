import styled from 'styled-components';
import AddSmall from "../../images/add_small.svg";


export const ProfileFormLayout = styled.section`
    max-width: 792px;
    grid-row: 2;
    justify-self: end;
    padding: 106px 49px 41px 49px;
    background: linear-gradient(180deg, #E9F2F3 0%, #A6C5E3 100%);
    border-radius: 24px;
`

export const AvatarButton = styled.button`
width: 120px;
height: 120px;
background-color: #D9D9D9;
border-radius: 50%;   
border: none;
cursor: pointer;
`

export const FormTextInput = styled.input`
box-sizing: border-box;
width: 695px;
height: 80px;
border: 1.41px solid #00000061;
border-radius: 11.3px;
background-color: transparent;
font-family: Roboto, sans-serif;
font-size: 22.6px;
font-weight: 400;
line-height: 32.49px;
text-align: left;
padding: 0 19.78px;

&::placeholder {
    color: #00000099;
    opacity: 60%;
  }
`

export const FormText = styled.span`
font-family: Roboto, sans-serif;
font-size: 20px;
line-height: 32px;
text-align: left;
`

export const PrivacyRadioGroup = styled.div`
display: flex;
`
export const RadioBox = styled.div`
position: relative;
display: flex;
align-items: center;
box-sizing: border-box;
margin-bottom
`

export const RadioInputLabel = styled.label`
position: absolute;
left: 4px;
width: 24px;
height: 24px;
border-radius: 50%;
background: transparent;
border: 2px solid #49535C;

 &::after {
    content: '';
    display: none;
    width: 12px;
    height: 12px;
    background: #49535C;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
export const RadioInput = styled.input`
  opacity: 0;
  z-index: 1;
  width: 24px;
  height: 24px;
  border: 2px solid #49535C;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  margin-right: 12px;

   &:checked + ${RadioInputLabel}::after {
    display: block;
  }
`

export const ButtonAdd = styled.button`
width: 32px;
height: 32px;
background-image: url(${AddSmall});
background-color: transparent; 
background-size: cover;
background-repeat: no-repeat;
background-position: center;
border: none;
cursor: pointer;

&:hover {
 opacity: 0.8;
}
`