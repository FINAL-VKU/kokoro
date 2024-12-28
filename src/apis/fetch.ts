import { stringify } from "qs"
import { SearchRequest, SearchResponse, hasText } from "@yoctoerp/ui"

export function logError(error: any) {
  throw error
}

/**
 * Error: {name, code, message}
 * @param response
 */
export async function validateResponse(response: any) {
  if (!response.ok) {
    let errors = []
    switch (response.status) {
      case 400:
        errors = await response.json()
        break
      case 401:
        errors = [
          {
            name: "path",
            code: response.status,
            message: "Your account is invalid.",
          },
        ]
        break
      case 406:
      case 417:
        errors = [
          {
            name: "path",
            code: response.status,
            message: "Need more information",
          },
        ]
        break
      case 403:
        errors = [
          {
            name: "path",
            code: "ACCESS_DENIED",
            message: "You have no right to access.",
          },
        ]
        break
      default: {
        let message = await response.text()
        if (!hasText(message)) {
          message = response.statusText
        }
        errors = [
          {
            name: "path",
            code: "INTERNAL_ERROR",
            message: message,
          },
        ]
        break
      }
    }
    if (errors.length) {
      throw errors
    } else {
      throw Error(response.statusText)
    }
  }
  return response
}

export function readResponseAsJSON(response: any) {
  return response.json()
}

function getAuthHeader(contentType = "application/json") {
  return {
    "Content-Type": contentType,
    "Accept": "application/json",
  }
}

export function fetchWithAuth(pathToResource: any) {
  return fetch(pathToResource, { headers: getAuthHeader() }).then(validateResponse)
}

export function fetchJSON<R = any>(pathToResource: any): Promise<R> {
  return fetch(pathToResource, { headers: getAuthHeader() })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError)
}

export function postJSON<R = any>(pathToResource: any, body: any): Promise<R> {
  return fetch(pathToResource, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(body),
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError)
}

export function postJSONWithoutAuth<R = any>(
  pathToResource: any,
  body: any,
  headers = {}
): Promise<R> {
  return fetch(pathToResource, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError)
}

export function fetchJSONWithoutAuth<R = any>(pathToResource: any): Promise<R> {
  return fetch(pathToResource, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError)
}

export function deleteRequest(pathToResource: any) {
  return fetch(pathToResource, {
    method: "DELETE",
    headers: getAuthHeader(),
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError)
}

export type SearchFunction<S = any, R = any> = (
  params: SearchRequest<S>
) => Promise<SearchResponse<R>>

export function createSearchApi<S = any, R = any>(url: string | Function): SearchFunction<S, R> {
  /**
   * Search query include page,size,filter
   * @param params: {
   *   page: number,
   *   size: number,
   *   sorts: [],
   *   filter:{
   *     search: '',
   *     id: number,
   *     ...
   *   }
   * }
   */
  return (params: SearchRequest<S>) => {
    const { page, size, sorts, filter } = params || {
      page: 1,
      size: 10,
      sorts: [],
      filter: {},
    }
    const mapSorts: any = []
    if (sorts) {
      for (const [key, val] of Object.entries(sorts)) {
        if (val && val.length && key && key.length) {
          mapSorts.push([`${key}:${val}`])
        }
      }
    }

    const body = {
      page,
      size,
      sorts: mapSorts,
      ...filter,
    }
    return fetchJSON(
      `${typeof url === "function" ? url() : url}?${stringify(body, {
        arrayFormat: "repeat",
      })}`
    )
  }
}

type ID = number | string | undefined


export function createCRUDApi<S = any, F = any, R = any>(url: string) {
  const create = (form: F) => postJSON(`${url}`, form)
  const search = createSearchApi<S, R>(url)
  const read = (id: ID) => fetchJSON<R>(`${url}/${id}`)
  const update = (id: ID, form: F) => postJSON<R>(`${url}/${id}`, form)
  const remove = (id: ID) => deleteRequest(`${url}/${id}`)
  return {
    search,
    create,
    read,
    update,
    remove,
  }
}
