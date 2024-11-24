import styled from 'styled-components';
import AddSmall from "../../images/add_small.svg";


export const ProfileFormLayout = styled.section`
box-sizing; border-box;
max-width: 792px;
grid-row: 2;
justify-self: end;
background: linear-gradient(180deg, #E9F2F3 0%, #A6C5E3 100%);
border-radius: 24px;
`
export const ProfileFormBox = styled.form`
margin: 106px 49px 41px 49px;
display: flex;
gap: 28px;
flex-direction: column;
`

export const AvatarContainer = styled.div`
width: 120px;
height: 120px;
background-color: #D9D9D9;
border-radius: 50%;   
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
align-self: center;
`
export const Avatar = styled.img`
width: 120px;
height: 120px;
border-radius: 50%;
background-color: #D9D9D9;
object-fit: cover;
`

export const AvatarButton = styled.label`
width: 100%;
height: 100%;
border-radius: 50%;   
border: none;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
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
&:focus {
  outline: none;
}
`

export const FormText = styled.span`
font-family: Roboto, sans-serif;
font-size: 20px;
line-height: 32px;
text-align: left;
color: #49535C;
`

export const PrivacyRadioGroup = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-template-rows: auto auto;
gap: 16px 32px;
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
export const AditionalChoiceBox = styled.div`
display: flex;
flex-wrap: wrap;
gap: 16px;
justify-content: flex-start;
align-items: center;
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
${({ $topstyles }) => $topstyles};
`

export const InterestBubble = styled.button`
border: 2px solid #00000061;
color: #49535C;
border-radius: 100px;
padding: 5px 16px;
font-family: Roboto, sans-serif;
font-size: 24px;
font-weight: 400;
line-height: 32.49px;
background-color: transparent;
cursor: pointer;
`

export const InterestInput = styled.input`
border: none;
width: 670px;
border-bottom: 1.41px solid #00000061;
background-color: transparent;
font-family: Roboto, sans-serif;
font-size: 22.6px;
font-weight: 400;
line-height: 32.49px;
text-align: left;

&:focus {
  outline: none;
}
`

export const LinkBox = styled.div`
width: 100%;
display: grid;
grid-template-columns: 1fr 1fr auto;
grid-template-rows: auto;
gap: 16px 32px;
`

export const LinkAddress = styled.a`
border-bottom: 1px solid #49535C;
text-decoration: none;
cursor: pointer;
font-family: Roboto, sans-serif;
font-size: 24px;
font-weight: 400;
line-height: 32.49px;
text-align: left;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

export const ChoiceBlock = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;
`

export const BasicButton = styled.button`
font-family: Inter, sans-serif;
color: #49535C;
font-size: 24px;
font-weight: 500;
line-height: 24px;
padding: 8px 0;
border: 1px solid #3888E7;
border-radius: 6px;
cursor: pointer;
${({ $topstyles }) => $topstyles};
`
