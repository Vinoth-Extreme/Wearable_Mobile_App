import GoogleFit, { 
    Scopes,
    
} from 'react-native-google-fit';

export const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,
      Scopes.FITNESS_HEART_RATE_READ,
      Scopes.FITNESS_HEART_RATE_WRITE,
    ],
  };

export const disconnetGFit = () => {
  GoogleFit.disconnect()
}

export const checkIsGFitAuthorized = () => {
    GoogleFit.checkIsAuthorized()
    return GoogleFit.isAuthorized;
}

export const authorizeGFit = async () => {
    if(GoogleFit.isAuthorized === false) {
        const authResult = await GoogleFit.authorize(options)
        return authResult;
    } else {
        return "Authorized already";
    }
}

export const getHeartRateSamples = async (
    startDate,
    endDate,
    bucketInterval = 15,
    bucketUnit = "MINUTE"
) => {
    if(GoogleFit.isAuthorized === true) {
        const heartRateSmaples = await GoogleFit.getHeartRateSamples({
            startDate,
            endDate,
            bucketInterval,
            bucketUnit
        })

        return heartRateSmaples;
    } else {
        return "You are not authorized.";
    }
}