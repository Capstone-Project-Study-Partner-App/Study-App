const api_root = "http://localhost:8080/api";

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
  try {
    const resp = await fetch(`${api_root}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
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

// -------EVENT FETCHES-------

export async function getAllEvents() {
  const resp = await fetch(`${api_root}/events`);
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

// -------EVENT FETCHES-------

export async function getRsvpByEventId(event_id) {
  const resp = await fetch(`${api_root}/rsvps/events/${event_id}`);
  const json = await resp.json();
  return json;
}

export async function createRsvp(user_id, event_id, rsvp_status) {
  try {
    const resp = await fetch(`${api_root}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        event_id,
        rsvp_status,
      }),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
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

export async function getExistingThread(sender, receiver) {
  try {
    const response = await fetch(`${api_root}/thread/${sender}/${receiver}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}


const educationURL = 'https://parseapi.back4app.com/classes/University?limit=0&keys=name';

export async function getEducation (){
  const educationOption = {
    method: 'GET',
    headers: {
      'X-Parse-Application-Id': 'Ipq7xXxHYGxtAtrDgCvG0hrzriHKdOsnnapEgcbe',
      'X-Parse-Master-Key': 'HNodr26mkits5ibQx2rIi0GR9pVCwOSEAkqJjgVp'
    }
  };
  
  try {
    const response = await fetch(educationURL, educationOption);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}




