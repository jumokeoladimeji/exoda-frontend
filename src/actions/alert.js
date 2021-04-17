import { alertsConstant } from '../constants/alert';

export function alertErrorMessage(errorMessage) {
  return {
    type: alertsConstant.ALERT_ERROR_MESSAGE,
    errorMessage
  }
}
