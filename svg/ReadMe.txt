InstrumentTest.html contains some functions for manipulating the instrument panel. 

The SVG inside this document is copied and pasted from InstrumentPanel_Final.svg. A function will be needed to get this code directly programatically for future use.

id:
instrumentPanel                       This targets the whole instrument panel

  instrumentDashboard                 This targets dashboard background

  verticalSpeedIndicator              This targets the whole vertical speed indicator
    verticalSpeedIndicatorDashboard   
    verticalSpeedIndicatorBg            
    verticalSpeedIndicatorHand        Targets the pointer hand  
    verticalSpeedIndicatorFg            

  headingIndicator                    This targets the whole heading indicator  
    headingIndicatorDashboard
    headingIndicatorBg
    headingIndicatorRotator           Targets the rotating degrees
    headingIndicatorFg

  turnCoordinator                     This targets the whole turn coordinator
    turnCoordinatorDashboard
    turnCoordinatorBg
    turnCoordinatorYaw                Targets the plane
    turnCoordinatorRoll               Targets the ball
    turnCoordinatorFg

  altimeter                           This targets the whole altimeter
    altimeterDashboard  
    altimeterRightHand
    altimeterLeftHand
    altimeterMid
    altimeterCircle
      altimeterHatch                  Note: This does not move in the animations
      altimeterCircleHand             Targets pointer that represents 10thousands of feet
    altimeterShortHand                Targets pointer that represents thousands of feet
    altimeterLongHand                 Targets pointer that represents hundreds of feet
    altimeterFg

  airspeedIndicator
    airspeedIndicatorDashboard
    airspeedIndicatorBg
    airspeedIndicatorHand             This targets the pointer that represents the airspeed 
    airspeedIndicatorFg

  attitudeIndicator                   This targets the attitude indicator
    attitudeIndicatorDashboard
    attitudeIndicatorBg
    attitudeIndicatorRotator1
    attitudeIndicatorRotator2
    attitudeIndicatorFg





