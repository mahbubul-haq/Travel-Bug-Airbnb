import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Maps from './Maps';
import SourceInput from './UserInput/SourceInput';
import DestinationInput from './UserInput/DestinationInput';
import DateInput from './UserInput/DateInput';
import ViewGuideline from './ViewGuideline';

const TransportGuidelines = () => {
  const [componentNo, setComponentNo] = useState(1);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  const nextComponent = () => {
    setComponentNo(componentNo + 1);
  }

  const prevComponent = () => {
    setComponentNo(componentNo - 1);
  }

  const renderPage = () => {
    switch (componentNo) {
      case 1:
        return (
          <>
            <h2>Step {componentNo}</h2>
            <SourceInput nextComponent={
              () => {
                nextComponent();
              }
            } prevComponent={
              () => {
                prevComponent();
              }
            } setSource={
              (val) => {
                console.log(val);
                setSource(val);
              }
            }
            />
          </>
        );

      case 2:
        return (
          <>
            <h2>Step {componentNo}</h2>
            <DestinationInput nextComponent={
              () => {
                nextComponent();
              }
            }
              prevComponent={
                () => {
                  prevComponent();
                }
              }
              setDestination={
                (val) => {
                  console.log(val);
                  setDestination(val);
                }
              }
            />
          </>
        );
      case 3:
        return (
          <>
            <h2>Step {componentNo}</h2>
            <DateInput nextComponent={
              () => {
                nextComponent();
              }
            }
              prevComponent={
                () => {
                  prevComponent();
                }
              }
            />
          </>
        );
      case 4:
        return (
          <>
            <h2>Guideline for you</h2>
            {console.log("main")}
            {console.log(source)}
            <ViewGuideline source={()=>source} destination={()=>destination} />
          </>
        );
    };
  }

  return (
    <div className='container'>
      {renderPage()}
    </div>
  )
}

export default TransportGuidelines;