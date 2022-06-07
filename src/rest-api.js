const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class RestApi {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get events() {
    return this.#load({url: 'points'}).then(RestApi.parseResponse);
  }

  get offers() {
    return this.#load({url: 'offers'}).then(RestApi.parseResponse);
  }

  get cities() {
    return this.#load({url: 'destinations'}).then(RestApi.parseResponse);
  }

  updateEvent = async (event) => {
    const response = await this.#load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await RestApi.parseResponse(response);

    return parsedResponse;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      RestApi.checkStatus(response);
      return response;
    } catch (err) {
      RestApi.catchError(err);
    }
  }

  static parseResponse = (response) => response.json();

  #adaptToServer = (event) => {
    const adaptedTask = {
      'base_price': Number(event.basePrice),
      'date_from': event.date.dataBeginEvent,
      'date_to': event.date.dataEndEvent,
      'destination': {
        'description': event.city.currentCity.description,
        'name': event.city.currentCity.name,
        'pictures': event.city.currentCity.pictures,
      },
      'id': event.id,
      'is_favorite': event.favorite,
      'offers': event.type.currentType.selectedOffers,
      'type': event.type.currentType.title
    };
    return adaptedTask;
  }

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
