// Get permission to use browser's geolocation API
export const getPosition = async (): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  } catch (error) {
    console.log(error)
  }
}
