import { useState, useEffect } from "react"
import { Axios } from "redux/Actions"
import qs from "qs"
//the function to call the push server: https://github.com/Spyna/push-notification-demo/blob/master/front-end-react/src/utils/Axios().js
import { getSHA256 } from "../../utils"
import {
  isPushNotificationSupported,
  askUserPermission,
  sendNotification,
  createNotificationSubscription,
  getUserSubscription,
} from "./config"
//import all the function created to manage the push notifications

const pushNotificationSupported = isPushNotificationSupported()
//first thing to do: check if the push notifications are supported by the browser

const usePushNotifications = () => {
  const [userConsent, setSuserConsent] = useState(Notification.permission)
  //to manage the user consent: Notification.permission is a JavaScript native function that return the current state of the permission
  //We initialize the userConsent with that value
  const [userSubscription, setUserSubscription] = useState(null)
  //to manage the use push notification subscription
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState()
  //to manage the push server subscription
  const [error, setError] = useState(null)
  //to manage errors
  const [loading, setLoading] = useState(true)
  //to manage async actions

  //if the push notifications are supported, registers the service worker
  //this effect runs only the first render

  const getExixtingSubscription = async () => {
    const existingSubscription = await getUserSubscription()
    const existingUserSubscription = await getSHA256(existingSubscription)
    setUserSubscription(existingUserSubscription)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)

    getExixtingSubscription()
  }, [])
  //Retrieve if there is any push notification subscription for the registered service worker
  // this use effect runs only in the first render

  /**
   * define a click handler that asks the user permission,
   * it uses the setSuserConsent state, to set the consent of the user
   * If the user denies the consent, an error is created with the setError hook
   */
  const onClickAskUserPermission = () => {
    setLoading(true)
    setError(false)
    askUserPermission().then((consent) => {
      setSuserConsent(consent)
      if (consent !== "granted") {
        setError({
          name: "Consent denied",
          message: "You denied the consent to receive notifications",
          code: 0,
        })
      }
      setLoading(false)
    })
  }
  //

  /**
   * define a click handler that creates a push notification subscription.
   * Once the subscription is created, it uses the setUserSubscription hook
   */
  const onClickSusbribeToPushNotification = () => {
    setLoading(true)
    setError(false)
    createNotificationSubscription()
      .then(async (subscrition) => {
        const userSubscription = await getSHA256(subscrition)
        setUserSubscription(userSubscription)
        setLoading(false)
      })
      .catch((err) => {
        console.error(
          "Couldn't create the notification subscription",
          err,
          "name:",
          err.name,
          "message:",
          err.message,
          "code:",
          err.code
        )
        setError(err)
        setLoading(false)
      })
  }

  /**
   * define a click handler that sends the push susbcribtion to the push server.
   * Once the subscription ics created on the server, it saves the id using the hook setPushServerSubscriptionId
   */
  const onClickSendSubscriptionToPushServer = () => {
    setLoading(true)
    setError(false)
    const payload = { id: userSubscription }
    return Axios()
      .post("/subscription/", qs.stringify(payload))
      .then(({ data: { id } }) => {
        setPushServerSubscriptionId(id)
        setLoading(false)
      })
      .catch((e) => {
        const {
          response: { status },
        } = e
        if (status === 400 && pushServerSubscriptionId) {
          // Already exists
          onClickSendNotification()
        }
        setLoading(false)
        setError(e)
      })
  }

  /**
   * define a click handler that requests the push server to send a notification, passing the id of the saved subscription
   */
  const onClickSendNotification = async () => {
    setLoading(true)
    setError(false)
    await Axios()
      .get(`/subscription/${pushServerSubscriptionId}/`)
      .then(({ data }) => {
        sendNotification()
      })
      .catch((err) => {
        setLoading(false)
        setError(err)
      })
    setLoading(false)
  }

  /**
   * returns all the stuff needed by a Component
   */
  return {
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error,
    loading,
  }
}

export default usePushNotifications
