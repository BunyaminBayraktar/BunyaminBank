function addNewItemWithValue(localStorageKey, value)
{
  if(localStorage[localStorageKey] === undefined)
  {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }
  else
  {
    throw {
      code: "duplicateValue",
      exception: "Verilen key değeri zaten localStorage'ta bulunuyor."
    }
  }
}

function getLocalStorageItem(localStorageKey)
{
  if(localStorage[localStorageKey] !== undefined)
  {
    return JSON.parse(localStorage.getItem(localStorageKey));
  }
  else
  {
    return undefined;
  }
}

function updateLocalStorageItem(localStorageKey, newValue)
{
  if(localStorage[localStorageKey] !== undefined)
  {
    localStorage[localStorageKey] = JSON.stringify(newValue);
  }
  else
  {
    throw {
      code: "inexistentValue",
      exception: "Verilen key değeri localStorage'da bulunamadı."
    }
  }
}

function deleteLocalStorageItem(localStorageKey)
{
  console.log("here 4", localStorageKey, localStorage[localStorageKey] !== undefined);

  if(localStorage[localStorageKey] !== undefined)
  {
    console.log("came to here!");
    localStorage.removeItem(localStorageKey);
  }
  else
  {
    throw {
      code: "inexistentValue",
      exception: "Verilen key değeri localStorage'da bulunamadı."
    }
  }
}

export {
  addNewItemWithValue,
  getLocalStorageItem,
  updateLocalStorageItem,
  deleteLocalStorageItem
}