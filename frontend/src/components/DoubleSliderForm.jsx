import React from "react";
import * as Components from './DoubleSliderFormstyle';

function DoubleSliderForm() {
    const [signIn, toggle] = React.useState(true);
     return(
         <Components.Container>
             <Components.SignUpContainer signin={signIn}>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Username' />
                     <Components.Input type='email' placeholder='Email' />
                     {/* Dropdown Options */}
                     <Components.Select defaultValue="choose">
                        <option value="choose" disabled selected>Choose your college</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                     </Components.Select>
                     <Components.Select defaultValue="choose">
                        <option value="choose" disabled selected>Select Year</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                     </Components.Select>
                     <Components.Select defaultValue="choose">
                        <option value="choose" disabled selected>Select Course / Branch</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                     </Components.Select>
                        <Components.Input type='password' placeholder='Password' />
                        <Components.Button>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

             <Components.SignInContainer signin={signIn}>
                  <Components.Form>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Select defaultValue="choose">
                        <option value="choose" disabled selected>Type of User</option>
                        <option value="usa">Normal</option>
                        <option value="uk">College-Head</option>
                        <option value="canada">Committe-Head</option>
                        <option value="canada">Main Admin</option>
                     </Components.Select>
                      <Components.Input type='email' placeholder='Email' />
                      <Components.Input type='password' placeholder='Password' />
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button>Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signin={signIn}>
                 <Components.Overlay signin={signIn}>

                 <Components.LeftOverlayPanel signin={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signin={signIn}>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
     )
}

export default DoubleSliderForm;