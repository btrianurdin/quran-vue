const convertTimeDuration = (duration = 0) => {
  if (typeof duration !== 'number') {
    throw new Error('Duration must be a number')
  }

  const _duration = Math.round(duration)

  const hours = Math.floor(_duration / 3600)
  const minutes = Math.floor((_duration % 3600) / 60)
  const seconds = _duration % 60

  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  } else {
    return `${formattedMinutes}:${formattedSeconds}`
  }
}

export default convertTimeDuration
