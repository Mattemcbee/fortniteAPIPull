import React from 'react';
import emailjs from 'emailjs-com';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import Swal from 'sweetalert2';


const SERVICE_ID = 'service_gj2x9i8'
const TEMPLATE_ID = 'template_r7xjz2g'
const USER_ID = 'K1UrWt6oQw2mLfS8m'

const CourtEmail = () => {
    const handleOnSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
            .then((result) => {
                console.log(result.text);
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent Successfully'
                })
            }, (error) => {
                console.log(error.text);
                Swal.fire({
                    icon: 'error',
                    title: 'Ooops, something went wrong',
                    text: error.text,
                })
            });
        e.target.reset()
    };

    return (
        <>
            <Form className='courtText' onSubmit={handleOnSubmit}>
            <h1 className='CrimeList mediumTitle mb-0'>Prosecutable Crimes</h1>
                <ul>
                    <li className='EmailHeader mediumTitle mb-0'>Intentional Kill Stealing</li>
                    <li className='EmailHeader mediumTitle mb-0'>Loot Theft</li>
                </ul>
                <h1 className='CrimeList mediumTitle mb-10'>In order to press charges, please try to save screen recording to be used as evidence</h1>

                <Form.Field
                    id='form-input-control-email'
                    control={Input}
                    label='SUBMIT COURT CASE'
                    name='user_email'
                    placeholder='Plantiff/Victim...'
                    required
                    icon='mail'
                    iconPosition='left'
                    style={{ width: '100%', marginTop: '10px', marginBottom: '0' }}
                    className='contactCardFont'
                />

                {/* <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    label='Name'
                    name='user_name'
                    placeholder='Name…'
                    required
                    icon='user circle'
                    iconPosition='left'
                /> */}
                <Form.Field
                    id='form-textarea-control-opinion'
                    control={Input}
                    style={{ width: '100%', marginTop: '0', marginBottom: '10px' }}

                    label=''
                    name='Message'
                    placeholder='Defendant/Criminal...'
                    required
                />

                <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    style={{ width: '100%', marginTop: '0', marginBottom: '10px' }}

                    label=''
                    name='user_message'
                    placeholder='Explain Accusations...'
                    required
                />
                <Button type='submit' width='10%' className='contactCardFont emailButtom'
                // class='SearchButton'
                >Submit</Button>
            </Form>
        </>
    );
}



export default CourtEmail;