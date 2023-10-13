// eslint-disable-next-line no-undef
const api_root = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

(() => {
  const original_fetch = window.fetch;
  window.fetch = (url, opts, ...args) => {
    return original_fetch(
      url,
      {
        mode: "cors",
        credentials: "include",
        ...opts,
      },
      ...args
    );
  };
})();

export class AuthError extends Error {}

// const json_api = async (route, method = "GET", body = null) => {
//   const resp = await fetch(`${api_root}${route}`, {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   const json = await resp.json();
//   return json;
// };

// -------USER FETCHES-------
export async function getProfile() {
  const resp = await fetch(`${api_root}/profile`);
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

export async function getUsersMatchingFilters(filters) {
  const resp = await fetch(`${api_root}/users/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
  // this if statement makes sure un-logged in users
  // get the AuthError so they can be redirected
  // add this to every fetch request
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

export async function getAllUsers() {
  const resp = await fetch(`${api_root}/users`);
  // this if statement makes sure un-logged in users
  // get the AuthError so they can be redirected
  // add this to every fetch request
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

export async function getUserById(user_id) {
  const resp = await fetch(`${api_root}/users/${user_id}`);
  const json = await resp.json();
  return json;
}

export async function createUser(userData) {
  const resp = await fetch(`${api_root}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!resp.ok) {
    throw new Error(`HTTP failed status ${resp.status}`);
  }
  const json = await resp.json();
  return json;
}

export async function updateUser(user_id, updatedUserData) {
  try {
    const response = await fetch(`${api_root}/edit_user/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });
    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(user_id) {
  const resp = await fetch(`${api_root}/users/${user_id}`, {
    method: "DELETE",
  });
  const json = await resp.json();
  return json;
}

export async function getUserMessages(user_id) {
  try {
    const response = await fetch(`${api_root}/${user_id}/messages`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function logInUser(user) {
  const resp = await fetch(`${api_root}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const json = await resp.json();
  return json;
}

export async function logOutUser() {
  const resp = await fetch(`${api_root}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const json = await resp.json();
  return json;
}

////Mark as favorited AKA "Like someone"
export async function createFavorite(userId) {
  const resp = await fetch(`${api_root}/users/${userId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

//Mark as un-favorited AKA "Unlike someone"
export async function deleteFavorite(userId) {
  const resp = await fetch(`${api_root}/users/${userId}/unlike`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

//Check if a favorite instance exists for a liker and liked
export async function checkIfFavoriteExists(user_id) {
  const resp = await fetch(`${api_root}/users/${user_id}/confirm_favorite`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json.exists; // Return the boolean value directly
}

// Gets all Favorite buddies for signed-in user (AKA req.user)
export async function getAllMyFavorites() {
  try {
    const response = await fetch(`${api_root}/profile/all_favorites`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// -------EVENT FETCHES-------

export async function getAllEvents() {
  const resp = await fetch(`${api_root}/events`);
  const json = await resp.json();
  return json;
}

// EVENT FILTERING
export async function getEventsMatchingFilters(filters) {
  const resp = await fetch(`${api_root}/events/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
  // this if statement makes sure un-logged in users
  // get the AuthError so they can be redirected
  // add this to every fetch request
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

export async function getRsvpsForEvent(event_id) {
  const resp = await fetch(`${api_root}/events/${event_id}/rsvps`);
  const json = await resp.json();
  return json;
}

export async function getEventById(user_id) {
  const resp = await fetch(`${api_root}/events/${user_id}`);
  const json = await resp.json();
  return json;
}

export async function createEvent(eventData) {
  try {
    const resp = await fetch(`${api_root}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function updateEvent(event_id, updatedEventData) {
  try {
    const response = await fetch(`${api_root}/edit_event/${event_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEventData),
    });
    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteEvent(event_id) {
  const resp = await fetch(`${api_root}/events/${event_id}`, {
    method: "DELETE",
  });
  const json = await resp.json();
  return json;
}

export async function getRsvpByEventId(event_id) {
  const resp = await fetch(`${api_root}/rsvps/events/${event_id}`);
  const json = await resp.json();
  return json;
}

//CREATE AN RSVP
export async function createRsvp(event_id) {
  const resp = await fetch(`${api_root}/events/${event_id}/attending`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

//DELETE AN RSVP
export async function deleteRsvp(event_id) {
  const resp = await fetch(`${api_root}/events/${event_id}/unattending`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

export async function updateRsvp(rsvp_id, updatedRsvpData) {
  try {
    const response = await fetch(`${api_root}/edit_event/${rsvp_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRsvpData),
    });
    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getRsvpByUserId(user_id) {
  const resp = await fetch(`${api_root}/rsvps/${user_id}`);
  const json = await resp.json();
  return json;
}

// -------MESSAGE FETCHES-------

export async function getMessageById(message_id) {
  const resp = await fetch(`${api_root}/messages/${message_id}`);
  const json = await resp.json();
  return json;
}

export async function createMessage(
  sender,
  receiver,
  message_content,
  thread_id,
  created_at
) {
  try {
    const resp = await fetch(`${api_root}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender,
        receiver,
        message_content,
        thread_id,
        created_at,
      }),
    });
    const json = await resp.json();
    console.log("message sent:", json);
    return json;
  } catch (error) {
    console.error("error sending message:", error);
    return error;
  }
}

export async function deleteMessage(message_id) {
  const resp = await fetch(`${api_root}/messages/${message_id}`, {
    method: "DELETE",
  });
  const json = await resp.json();
  return json;
}

export async function getMessagesByThread(thread_id) {
  try {
    const response = await fetch(`${api_root}/thread/${thread_id}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// -------RATING FETCHES-------

export async function deleteRating(rating_id) {
  const resp = await fetch(`${api_root}/ratings/${rating_id}`, {
    method: "DELETE",
  });
  const json = await resp.json();
  return json;
}

export async function updateRating(rating_id, updatedRatingData) {
  try {
    const response = await fetch(`${api_root}/edit_rating/${rating_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRatingData),
    });
    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createRating(ratingData) {
  try {
    const resp = await fetch(`${api_root}/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getAllRatings() {
  const resp = await fetch(`${api_root}/ratings`);
  // this if statement makes sure un-logged in users
  // get the AuthError so they can be redirected
  // add this to every fetch request
  if (resp.status === 401) {
    throw new AuthError("User not logged in");
  }
  const json = await resp.json();
  return json;
}

export async function getRatingsForUser(user_id) {
  try {
    const response = await fetch(`${api_root}/users/${user_id}/ratings`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getRatingByUserId(user_id) {
  const resp = await fetch(`${api_root}/ratings/users/${user_id}`);
  const json = await resp.json();
  return json;
}

// export async function getRatingsForUser(user_id) {
//   const resp = await fetch(`${api_root}/users/${user_id}/ratings`);
//   const json = await resp.json();
//   return json;
// }

// -------Registration Form FETCHES-------

// const educationURL =
//   "https://parseapi.back4app.com/classes/University?limit=0&keys=name";

// export async function getEducation() {
//   const educationOption = {
//     method: "GET",
//     headers: {
//       "X-Parse-Application-Id": "Ipq7xXxHYGxtAtrDgCvG0hrzriHKdOsnnapEgcbe",
//       "X-Parse-Master-Key": "HNodr26mkits5ibQx2rIi0GR9pVCwOSEAkqJjgVp",
//     },
//   };

//   try {
//     const response = await fetch(educationURL, educationOption);
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }
