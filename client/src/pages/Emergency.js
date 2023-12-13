import React, { useContext, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { Conetxt } from '../context/Context';

function Emergency() {
  const { sendEmergencyAlert, alertError } = useContext(Conetxt);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState();
  const [useMyLocation, setUseMyLocation] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [alertSent, setAlertSent] = useState(null)
  const handleRegister = async () => {
    // Validate all fields are filled
    if (!name || !email || !number || (!useMyLocation && !location)) {
      alert('Please fill in all required fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Basic number validation (you can customize this based on your requirements)
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(number)) {
      alert('Please enter a valid phone number.');
      return;
    }

    try {
      let userLocation = null;

      if (useMyLocation && navigator.geolocation) {
        // Use the user's current location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        setLocation(userLocation);
        console.log('Using user location:', userLocation);
      } else if (!useMyLocation) {
        // Use Nominatim for geocoding without an API key
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.length > 0) {
            setLatitude(parseFloat(data[0].lat));
            setLongitude(parseFloat(data[0].lon));
            userLocation = {
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon)
            };

            setLocation(userLocation);
            console.log('User entered location coordinates:', userLocation);
          } else {
            console.error('Location not found.');
            return;
          }
        } else {
          console.error('Geocoding failed');
          return;
        }
      }

      // After authentication and location determination, send data to the server or perform further actions
      const alertData = {
        name,
        email,
        number,
        useMyLocation,
        location: userLocation,
      };

      // Call the sendEmergencyAlert function with the alertData, latitude, and longitude
      setAlertSent(sendEmergencyAlert(alertData))

      // Optionally, you can reset the form fields after successful submission
      setName('');
      setEmail('');
      setNumber('');
      setLocation('');
      setUseMyLocation(false);
      setLatitude(null);
      setLongitude(null);
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert('An error occurred during registration.');
    }
  };

  if (alertSent && !alertError) {
    return <>
    <div >
      Alert Sent

    </div>
    </>
  }
  else if (alertError) {
    
    return <> Something went wrong try again later</>
  }
  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput
                  label='Your Name'
                  id='form1'
                  type='text'
                  className='w-100'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput
                  label='Your Email'
                  id='form2'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput
                  label='Your Number'
                  id='form3'
                  type='text'
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              {useMyLocation ? null : (
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput
                    label='Your Location'
                    id='form4'
                    type='text'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              )}

              <div className='mb-4'>
                <MDBCheckbox
                  name='useMyLocation'
                  value=''
                  id='useMyLocationCheckbox'
                  label='My Location'
                  checked={useMyLocation}
                  onChange={() => setUseMyLocation(!useMyLocation)}
                />
              </div>

              <MDBBtn style={{ maxHeight: '8%', maxWidth: "15%", height: '8%' }} className='mb-4' size='lg' onClick={handleRegister}>
                Submit
              </MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Emergency;
